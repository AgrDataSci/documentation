# ============================================================
# Extract ALL TEXT (no images) from a Docusaurus site in R
# Target site:
BASE_URL <- "https://agrdatasci.github.io/documentation/"
OUT_FILE <- "site_text.txt"
MAX_PAGES_FALLBACK <- 1200   # used only if no sitemap is found
# ============================================================

# 1) Install/load packages
pkgs <- c("xml2", "rvest", "httr2", "purrr", "dplyr", "stringr", "readr", "urltools")
to_install <- pkgs[!pkgs %in% rownames(installed.packages())]
if (length(to_install)) install.packages(to_install)

library(xml2)
library(rvest)
library(httr2)
library(purrr)
library(dplyr)
library(stringr)
library(readr)
library(urltools)

# --------------------------
# Helpers
# --------------------------

safe_get <- function(url, timeout_sec = 30) {
  request(url) |>
    req_user_agent("R text extractor (Docusaurus)") |>
    req_timeout(timeout_sec) |>
    req_perform()
}

guess_sitemap <- function(base_url) {
  base_url <- sub("/+$", "", base_url)
  candidates <- c(
    paste0(base_url, "/sitemap.xml"),
    paste0(base_url, "/sitemap-index.xml")
  )
  
  ok <- map_lgl(candidates, function(u) {
    tryCatch({
      r <- request(u) |> req_timeout(10) |> req_perform()
      status <- resp_status(r)
      status >= 200 && status < 400
    }, error = function(e) FALSE)
  })
  
  if (!any(ok)) return(NA_character_)
  candidates[which(ok)[1]]
}

read_sitemap_urls <- function(sitemap_url) {
  x <- read_xml(sitemap_url)
  root <- xml_name(xml_root(x))
  
  if (root == "sitemapindex") {
    sitemap_locs <- xml_find_all(x, ".//sitemap/loc") |> xml_text()
    urls <- map(sitemap_locs, read_sitemap_urls) |> unlist(use.names = FALSE)
    return(urls)
  }
  
  # regular sitemap
  xml_find_all(x, ".//url/loc") |> xml_text()
}

clean_text_from_html <- function(html) {
  page <- read_html(html)
  
  # Remove media + noisy layout bits
  page |> html_elements("script, style, noscript, img, svg, canvas, video, audio") |> html_remove()
  
  # Remove typical Docusaurus chrome (selectors vary; these catch most themes)
  page |> html_elements(paste(
    "nav, footer, header, aside,",
    ".navbar, .menu, .theme-doc-sidebar-container, .table-of-contents,",
    ".pagination-nav, .breadcrumbs, .footer,",
    ".theme-edit-this-page, .theme-last-updated,",
    ".tocCollapsible, .tocCollapsibleContent"
  )) |> html_remove()
  
  txt <- page |> html_text2(trim = TRUE)
  
  # Normalize whitespace (keep paragraphs)
  txt <- str_replace_all(txt, "\r", "\n")
  txt <- str_replace_all(txt, "[ \t]+", " ")
  txt <- str_replace_all(txt, "\n{3,}", "\n\n")
  txt <- str_trim(txt)
  
  txt
}

fetch_page_text <- function(url) {
  resp <- safe_get(url, timeout_sec = 30)
  html <- resp_body_string(resp)
  clean_text_from_html(html)
}

write_output <- function(df, out_file) {
  blocks <- paste0("=== ", df$url, " ===\n", df$text, "\n")
  write_lines(blocks, out_file)
  message("Wrote: ", normalizePath(out_file, winslash = "/", mustWork = FALSE))
}

# --------------------------
# Sitemap method (preferred)
# --------------------------
extract_via_sitemap <- function(base_url, out_file) {
  sm <- guess_sitemap(base_url)
  if (is.na(sm)) return(NULL)
  
  message("Sitemap found: ", sm)
  urls <- read_sitemap_urls(sm) |> unique()
  message("URLs in sitemap: ", length(urls))
  
  texts <- map2_chr(urls, seq_along(urls), function(u, i) {
    message("[", i, "/", length(urls), "] ", u)
    tryCatch(fetch_page_text(u), error = function(e) {
      message("  !! failed: ", e$message)
      ""
    })
  })
  
  df <- tibble(url = urls, text = texts) |>
    mutate(text = str_trim(text)) |>
    filter(nchar(text) > 0)
  
  write_output(df, out_file)
  df
}

# --------------------------
# Fallback crawler (if no sitemap)
# --------------------------
get_links <- function(url) {
  resp <- safe_get(url, timeout_sec = 30)
  page <- read_html(resp_body_string(resp))
  
  hrefs <- page |> html_elements("a") |> html_attr("href")
  hrefs <- hrefs[!is.na(hrefs)]
  
  # make absolute, remove fragments
  hrefs <- url_absolute(hrefs, url)
  hrefs <- sub("#.*$", "", hrefs)
  
  # drop obvious assets
  hrefs <- hrefs[!str_detect(hrefs, "\\.(png|jpg|jpeg|gif|webp|svg|pdf|zip|tar|gz|mp4|mp3)(\\?.*)?$")]
  
  unique(hrefs)
}

crawl_and_extract <- function(start_url, out_file, max_pages = 500) {
  start_url <- sub("/+$", "", start_url)
  base_domain <- urltools::domain(start_url)
  
  visited <- character()
  queue <- c(start_url)
  
  out_url <- character()
  out_txt <- character()
  
  while (length(queue) > 0 && length(visited) < max_pages) {
    url <- queue[1]
    queue <- queue[-1]
    
    if (url %in% visited) next
    visited <- c(visited, url)
    
    message("[", length(visited), "/", max_pages, "] ", url)
    
    txt <- tryCatch(fetch_page_text(url), error = function(e) {
      message("  !! failed: ", e$message)
      ""
    })
    
    if (nchar(str_trim(txt)) > 0) {
      out_url <- c(out_url, url)
      out_txt <- c(out_txt, txt)
    }
    
    links <- tryCatch(get_links(url), error = function(e) character())
    
    # keep same domain only
    links <- links[urltools::domain(links) == base_domain]
    links <- links[!links %in% visited]
    
    # keep crawl within the same "site path" if desired:
    # (uncomment next line to restrict to /documentation/)
    # links <- links[str_detect(links, "^https://agrdatasci\\.github\\.io/documentation/")]
    
    queue <- unique(c(queue, links))
  }
  
  df <- tibble(url = out_url, text = out_txt) |>
    mutate(text = str_trim(text)) |>
    filter(nchar(text) > 0)
  
  write_output(df, out_file)
  df
}

# ============================================================
# RUN
# ============================================================

df <- extract_via_sitemap(BASE_URL, OUT_FILE)

if (is.null(df)) {
  message("No sitemap found; using crawler fallback...")
  df <- crawl_and_extract(BASE_URL, OUT_FILE, max_pages = MAX_PAGES_FALLBACK)
}

message("Done. Pages extracted: ", nrow(df))

                                 getwd()
list.files(getwd(), pattern = "site_text\\.txt")

file.rename("site_text.txt", "C:/Rachel/1000farms/ebook/site_text.txt")

                                 