// scripts/build-sections-json.js
"use strict";

const fs = require("fs");
const path = require("path");

const projectRoot = path.join(__dirname, "..");
const docsRoot = path.join(projectRoot, "docs"); // your structure

function existsDir(p) {
  try { return fs.statSync(p).isDirectory(); } catch { return false; }
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
  // minimal front matter parser for slug + sidebar_position
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
    .replace(/^[0-9]+[-_ ]*/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function urlFromSlugOrId(frontMatterSlug, fallbackId) {
  // If slug is absolute like /intro/introduction, use it (strip leading slash)
  if (frontMatterSlug && typeof frontMatterSlug === "string") {
    const s = frontMatterSlug.trim();
    if (s.startsWith("/")) return s.replace(/^\/+/, "");     // "/intro/x" -> "intro/x"
    // If slug is relative, treat as relative path (no leading slash)
    return s.replace(/^\/+/, "");
  }
  return fallbackId; // fallback to file-based id
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

  const pages = files.map((f) => {
    const id = docIdFromPath(f);
    const txt = fs.readFileSync(f, "utf8");
    const fm = parseFrontMatter(txt);
    const url = urlFromSlugOrId(fm.slug, id);

    const posRaw = fm.sidebar_position;
    const pos =
      posRaw && /^[0-9]+$/.test(String(posRaw)) ? parseInt(String(posRaw), 10) : 999999;

    return { id, url, pos };
  });

  pages.sort((a, b) => (a.pos - b.pos) || a.url.localeCompare(b.url));

  if (pages.length) {
    sections.push({
      id: dir,                       // stable section id: "01-intro"
      label: labelFromFolder(dir),   // "Intro"
      pages: pages.map(({ url, id }) => ({ url, id })) // keep id for debugging
    });
  }
}

const outDir = path.join(projectRoot, "static", "print");
fs.mkdirSync(outDir, { recursive: true });

const outPath = path.join(outDir, "sections.json");
fs.writeFileSync(outPath, JSON.stringify({ sections }, null, 2), "utf8");

console.log(`[print] wrote ${outPath} with ${sections.length} sections`);
