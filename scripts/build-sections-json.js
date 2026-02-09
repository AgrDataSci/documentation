// scripts/build-sections-json.js
"use strict";

const fs = require("fs");
const path = require("path");

const projectRoot = path.join(__dirname, "..");

function existsDir(p) {
  try {
    return fs.statSync(p).isDirectory();
  } catch {
    return false;
  }
}

function safeRead(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

function listDirNames(dir) {
  try {
    return fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name);
  } catch {
    return [];
  }
}

function listFilesRecursive(dir) {
  const out = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...listFilesRecursive(full));
    else out.push(full);
  }
  return out;
}

function docIdFromPath(filePath, docsRoot) {
  // docsRoot/intro/introduction.mdx -> intro/introduction
  const rel = path.relative(docsRoot, filePath).replace(/\\/g, "/");
  return rel.replace(/\.(md|mdx)$/i, "");
}

function parseFrontMatter(text) {
  // minimal front matter parser for sidebar_position only
  if (!text || !text.startsWith("---")) return {};
  const end = text.indexOf("\n---", 3);
  if (end === -1) return {};
  const block = text.slice(3, end).trim();
  const fm = {};
  for (const line of block.split("\n")) {
    const m = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.+)\s*$/);
    if (!m) continue;
    const k = m[1];
    let v = m[2].trim().replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1");
    fm[k] = v;
  }
  return fm;
}

function readCategoryLabel(dir) {
  // If you have _category_.json with a label, use it
  const jsonPath = path.join(dir, "_category_.json");
  const jsonText = safeRead(jsonPath);
  if (jsonText) {
    try {
      const obj = JSON.parse(jsonText);
      if (obj && typeof obj.label === "string" && obj.label.trim()) return obj.label.trim();
    } catch {}
  }
  // Otherwise, fall back to folder name
  return null;
}

function titleizeFolder(name) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function collectDocsInDir(sectionDir, docsRoot) {
  const files = listFilesRecursive(sectionDir).filter((f) => /\.(md|mdx)$/i.test(f));

  const items = files.map((f) => {
    const txt = safeRead(f) || "";
    const fm = parseFrontMatter(txt);
    const posRaw = fm.sidebar_position;
    const pos =
      posRaw && /^[0-9]+$/.test(String(posRaw)) ? parseInt(String(posRaw), 10) : 999999;
    return { id: docIdFromPath(f, docsRoot), pos, path: f };
  });

  items.sort((a, b) => (a.pos - b.pos) || a.id.localeCompare(b.id));
  return items.map((x) => x.id);
}

function detectDocsRoot() {
  // Try common directories (including your repo name “documentation”)
  const candidates = ["docs", "documentation", "doc", "content", "site/docs"];
  for (const c of candidates) {
    const p = path.join(projectRoot, c);
    if (existsDir(p)) return p;
  }
  return null;
}

const docsRoot = detectDocsRoot();

console.log(`[print] projectRoot = ${projectRoot}`);
console.log(`[print] detected docsRoot = ${docsRoot || "(not found)"}`);

if (!docsRoot) {
  console.warn(
    "[print] No docs directory found. Create one (docs/...) or update this script candidates."
  );
}

// Build sections as: each top-level folder under docsRoot
const sections = {};
if (docsRoot) {
  const topDirs = listDirNames(docsRoot);
  console.log(`[print] top-level dirs under docsRoot: ${topDirs.join(", ") || "(none)"}`);

  for (const d of topDirs) {
    const sectionDir = path.join(docsRoot, d);
    const label = readCategoryLabel(sectionDir) || titleizeFolder(d);
    const docs = collectDocsInDir(sectionDir, docsRoot);
    if (docs.length) sections[label] = docs;
  }

  // Also include any root-level docs files (optional)
  const rootFiles = fs
    .readdirSync(docsRoot, { withFileTypes: true })
    .filter((e) => e.isFile() && /\.(md|mdx)$/i.test(e.name))
    .map((e) => path.join(docsRoot, e.name));

  if (rootFiles.length) {
    const label = "General";
    const docs = rootFiles
      .map((f) => {
        const txt = safeRead(f) || "";
        const fm = parseFrontMatter(txt);
        const posRaw = fm.sidebar_position;
        const pos =
          posRaw && /^[0-9]+$/.test(String(posRaw)) ? parseInt(String(posRaw), 10) : 999999;
        return { id: docIdFromPath(f, docsRoot), pos };
      })
      .sort((a, b) => (a.pos - b.pos) || a.id.localeCompare(b.id))
      .map((x) => x.id);

    sections[label] = docs;
  }
}

const outDir = path.join(projectRoot, "static", "print");
fs.mkdirSync(outDir, { recursive: true });

const outPath = path.join(outDir, "sections.json");
fs.writeFileSync(outPath, JSON.stringify(sections, null, 2), "utf8");

console.log(`[print] wrote ${outPath}`);
console.log(`[print] sections count = ${Object.keys(sections).length}`);
