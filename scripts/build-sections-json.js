// scripts/build-sections-json.js
const fs = require("fs");
const path = require("path");

// sidebars.js can export an object OR a function that returns an object
const sidebarsExport = require("../sidebars.js");
const sidebars = typeof sidebarsExport === "function" ? sidebarsExport() : sidebarsExport;

function asArray(maybe) {
  if (Array.isArray(maybe)) return maybe;
  // Common pattern: { sidebar: [...] }
  if (maybe && typeof maybe === "object") {
    if (Array.isArray(maybe.items)) return maybe.items;
    if (Array.isArray(maybe.sidebar)) return maybe.sidebar;
    if (Array.isArray(maybe.default)) return maybe.default;
  }
  return null;
}

function extractDocIds(items, out = []) {
  const arr = asArray(items);
  if (!arr) return out;

  for (const it of arr) {
    if (!it) continue;

    if (typeof it === "string") {
      out.push(it);
      continue;
    }

    if (it.type === "doc" && it.id) {
      out.push(it.id);
      continue;
    }

    if (it.type === "category" && it.items) {
      extractDocIds(it.items, out);
      continue;
    }

    // Some sidebar items embed items without "type"
    if (it.items) {
      extractDocIds(it.items, out);
    }
  }

  return out;
}

const sections = {}; // { "Section Title": ["docId1","docId2", ...], ... }

function walk(items) {
  const arr = asArray(items);
  if (!arr) return;

  for (const it of arr) {
    if (!it) continue;

    if (it.type === "category") {
      const title = it.label || it.title || "Section";
      const ids = extractDocIds(it.items, []);
      // Only store non-empty sections
      if (ids.length) sections[title] = ids;

      // Recurse into nested categories
      walk(it.items);
    } else if (it.items) {
      walk(it.items);
    }
  }
}

// Walk ALL sidebars (in case you have more than one)
for (c
