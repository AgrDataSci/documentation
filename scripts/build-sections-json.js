// scripts/build-sections-json.js
"use strict";

const fs = require("fs");
const path = require("path");

const projectRoot = path.join(__dirname, "..");
const docsRoot = path.join(projectRoot, "docs");

function existsDir(p) {
  try { return fs.statSync(p).isDirectory(); } catch { return false; }
}

function safeRead(p) {
  try { return fs.readFileSync(p, "utf8"); } catch { return null; }
}

function listFilesRecursive(dir, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) listFilesRecursive(full, out);
    else out.push(full);
  }
  return out;
}

function docIdFromPath(filePath) {
  // docs/01-intro/introduction.mdx -> 01-intro/introduction
  const rel = path.relative(docsRoot, filePath).replace(/\\/g, "/");
  return rel.replace(/\.(md|mdx)$/i, "");
}

function parseFrontMatter(text) {
  // minimal parser for simple "key: value" lines in the first front matter block
  if (!text || !text.startsWith("---")) return {};
  const end = text.indexOf("\n---", 3);
  if (end === -1) return {};
  const block = text.slice(3, end).trim();

  const fm = {};
  for (const line of block.split("\n")) {
    const m = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.+)\s*$/);
    if (!m) continue;
    const key = m[1];
    let val = m[2].trim().replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
    fm[key] = val;
  }
  return fm;
}

function labelFromFolder(folder) {
  return folder
    .replace(/^[0-9]+[-_ ]*/, "") // drop numeric prefix
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function cleanFolderSlug(folder) {
  // 01-intro -> intro
  return folder
    .replace(/^[0-9]+[-_ ]*/, "")
    .replace(/[_\s]+/g, "-")
    .toLowerCase()
    .trim();
}

function readCategoryMetaSlug(folderAbsPath) {
  // Reads docs/<folder>/_category_.json and returns its "slug" if present
  const metaPath = path.join(folderAbsPath, "_category_.json");
  const txt = safeRead(metaPath);
  if (!txt) return null;
  try {
    const obj = JSON.parse(txt);
    if (obj && typeof obj.slug === "string" && obj.slug.trim()) {
      return obj.slug.trim().replace(/^\/+/, "").replace(/\/+$/, "");
    }
  } catch {
    // ignore
  }
  return null;
}

function urlFromSlugOrFolder(fmSlug, folderSlug, fileBase) {
  // 1) front matter slug wins
  if (typeof fmSlug === "string" && fmSlug.trim()) {
    return fmSlug.trim().replace(/^\/+/, "").replace(/\/+$/, "");
  }
  // 2) folder/category slug + filename
  if (folderSlug) {
    return `${folderSlug}/${fileBase}`;
  }
  // 3) fallback to folder + filename (already cleaned folderSlug earlier)
  return `${folderSlug || ""}/${fileBase}`.replace(/^\/+/, "");
}

if (!existsDir(docsRoot)) {
  console.error(`[print] docs root not found: ${docsRoot}`);
  process.exit(1);
}

const topDirs = fs
  .readdirSync(docsRoot, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name);

const sections = [];

for (const dir of topDirs) {
  const sectionDir = path.join(docsRoot, dir);
  const files = listFilesRecursive(sectionDir).filter((f) => /\.(md|mdx)$/i.test(f));

  // Determine the folder/category slug (from _category_.json if present, else cleaned folder)
  const folderSlug =
    readCategoryMetaSlug(sectionDir) || cleanFolderSlug(dir);

  const pages = files.map((f) => {
    const id = docIdFromPath(f);
    const fileBase = id.split("/").slice(-1)[0]; // filename without folder
    const txt = safeRead(f) || "";
    const fm = parseFrontMatter(txt);

    const url = urlFromSlugOrFolder(fm.slug, folderSlug, fileBase);

    const posRaw = fm.sidebar_position;
    const pos =
      posRaw && /^[0-9]+$/.test(String(posRaw)) ? parseInt(String(posRaw), 10) : 999999;

    return { id, url, pos };
  });

  pages.sort((a, b) => (a.pos - b.pos) || a.url.localeCompare(b.url));

  if (pages.length) {
    sections.push({
      id: dir,                     // "01-intro"
      label: labelFromFolder(dir), // "Intro"
      pages: pages.map(({ url, id }) => ({ url, id }))
    });
  }
}

const outDir = path.join(projectRoot, "static", "print");
fs.mkdirSync(outDir, { recursive: true });

const outPath = path.join(outDir, "sections.json");
fs.writeFileSync(outPath, JSON.stringify({ sections }, null, 2), "utf8");

console.log(`[print] wrote ${outPath} with ${sections.length} sections`);
