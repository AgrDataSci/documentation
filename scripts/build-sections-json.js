/* scripts/build-sections-json.js */
const fs = require("fs");
const path = require("path");

// Update if your sidebar export shape is different
const sidebars = require("../sidebars.js");

function extractDocIds(items, out = []) {
  for (const it of items) {
    if (!it) continue;
    if (typeof it === "string") {
      out.push(it);
    } else if (it.type === "doc" && it.id) {
      out.push(it.id);
    } else if (it.type === "category" && Array.isArray(it.items)) {
      extractDocIds(it.items, out);
    } else if (Array.isArray(it.items)) {
      extractDocIds(it.items, out);
    }
  }
  return out;
}

// Choose the sidebar you use (often "default" or "docs")
const sidebarKey = Object.keys(sidebars)[0];
const rootItems = sidebars[sidebarKey];

const sections = {}; // { "Section Title": ["docId1","docId2", ...], ... }

function walk(items, currentSection = null) {
  for (const it of items) {
    if (it?.type === "category") {
      const title = it.label || it.title || "Section";
      const ids = extractDocIds(it.items, []);
      sections[title] = ids;
      walk(it.items, title);
    }
  }
}

walk(rootItems);

const outDir = path.join(__dirname, "..", "static", "print");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, "sections.json"),
  JSON.stringify(sections, null, 2),
  "utf8"
);

console.log("Wrote static/print/sections.json");
