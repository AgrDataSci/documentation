# ============================================================
# Extract ALL text (no images) from:
# https://agrdatasci.github.io/documentation/
# Output: documentation_text.txt
# Works with older rvest versions (no html_remove, no trim arg)
# ============================================================

BASE_URL <- "https://agrdatasci.github.io/documentation/"
OUT_FILE <- "documentation_text.txt"
SLEEP_SEC <- 0.15

# ---- Packages ----
pkgs <- c("xml2", "rvest", "httr2", "stringr", "readr")
to_install <- pkgs[!pkgs %in% rownames(installed.packages())]
if (length(to_install)) install.packages(to_install)

library(xml2)
library(rvest)
library(httr2)
library(stringr)
library(readr)

# ---- Compatibility text extractor ----
get_text <- function(node) {
  # Prefer html_text2 if available, else fallback to html_text
  if ("html_text2" %in% getNamespaceExports("rvest")) {
    return(rvest::html_text2(node))
  } else {
    return(rvest::html_text(node))
  }
}

# ---- Remove nodes helper (works even if html_remove() doesn't exist) ----
remove_nodes <- function(doc, css) {
  nodes <- rvest::html_elements(doc, css)
  if (length(nodes) > 0) xml2::xml_remove(nodes)
  invisible(doc)
}

# ---- HTTP helper ----
safe_get <- function(url, timeout_sec = 30) {
  request(url) |>
    req_user_agent("R text extractor (Docusaurus)") |>
    req_timeout(timeout_sec) |>
    req_perform()
}

# ---- Sitemap parsing (namespace-safe) ----
guess_sitemap <- function(base_url) {
  base_url <- sub("/+$", "", base_url)
  candidates <- c(
    paste0(base_url, "/sitemap.xml"),
    paste0(base_url, "/sitemap-index.xml")
  )
  for (u in candidates) {
    ok <- tryCatch({
      r <- request(u) |> req_timeout(10) |> req_perform()
      s <- resp_status(r)
      s >= 200 && s < 400
    }, error = function(e) FALSE)
    if (ok) return(u)
  }
  NA_character_
}

read_sitemap_urls <- function(sitemap_url) {
  x <- read_xml(sitemap_url)
  root_name <- xml_name(xml_root(x))
  
  if (grepl("sitemapindex", root_name, fixed = TRUE)) {
    sitemap_locs <- xml_find_all(x, ".//*[local-name()='sitemap']/*[local-name()='loc']") |> xml_text()
    urls <- character()
    for (sm in sitemap_locs) urls <- c(urls, read_sitemap_urls(sm))
    return(urls)
  }
  
  xml_find_all(x, ".//*[local-name()='url']/*[local-name()='loc']") |> xml_text()
}

# ---- HTML -> text (no images) ----
extract_main_text <- function(html) {
  doc <- read_html(html)
  
  # remove scripts/styles/media
  remove_nodes(doc, "script, style, noscript, img, svg, canvas, video, audio")
  
  # choose best Docusaurus content node
  selectors <- c(
    "main article",
    "main .theme-doc-markdown",
    "main",
    "body"
  )
  
  target <- NA
  for (sel in selectors) {
    node <- html_element(doc, sel)
    if (!is.na(node)) { target <- node; break }
  }
  if (is.na(target)) target <- doc
  
  txt <- get_text(target)
  
  # normalize whitespace (do our own trimming)
  txt <- str_replace_all(txt, "\r", "\n")
  txt <- str_replace_all(txt, "[ \t]+", " ")
  txt <- str_replace_all(txt, "\n{3,}", "\n\n")
  txt <- str_trim(txt)
  
  txt
}

fetch_page_text <- function(url) {
  resp <- safe_get(url, timeout_sec = 30)
  html <- resp_body_string(resp)
  extract_main_text(html)
}

write_output <- function(urls, texts, out_file) {
  keep <- nchar(str_trim(texts)) > 0
  urls <- urls[keep]
  texts <- texts[keep]
  
  blocks <- paste0("=== ", urls, " ===\n", texts, "\n")
  write_lines(blocks, out_file)
  
  message("Wrote output file to: ", normalizePath(out_file, winslash = "/", mustWork = FALSE))
  message("Non-empty pages written: ", length(urls))
}

# ---- RUN ----
sm <- guess_sitemap(BASE_URL)
stopifnot(!is.na(sm))

message("Sitemap found: ", sm)
urls <- unique(read_sitemap_urls(sm))
message("URLs in sitemap: ", length(urls))

# Optional: skip utility pages
urls <- urls[!grepl("/search$|/print-section$|/markdown-page$", urls)]

texts <- character(length(urls))
for (i in seq_along(urls)) {
  message("[", i, "/", length(urls), "] ", urls[i])
  texts[i] <- tryCatch(fetch_page_text(urls[i]), error = function(e) {
    message("  !! failed: ", e$message)
    ""
  })
  Sys.sleep(SLEEP_SEC)
}

write_output(urls, texts, OUT_FILE)

# quick peek
cat(readLines(OUT_FILE, n = 40), sep = "\n")

file.rename("documentation_text.txt", "C:/Rachel/1000farms/ebook/site_text.txt")
