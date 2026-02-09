import React, { useEffect, useMemo, useState } from "react";
import Layout from "@theme/Layout";
import { useLocation } from "@docusaurus/router";
import useBaseUrl from "@docusaurus/useBaseUrl";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function PrintSection() {
  const query = useQuery();

  // Use a stable section id like "01-intro" instead of a label name
  const sectionId = query.get("id") || "";

  // GitHub Pages-safe URLs (auto-prefixes /documentation/)
  const sectionsJsonUrl = useBaseUrl("/print/sections.json");
  const siteRoot = useBaseUrl("/"); // -> "/documentation/"

  const [htmlBlocks, setHtmlBlocks] = useState([]);
  const [status, setStatus] = useState("Loading…");

  useEffect(() => {
    let cancelled = false;

    async function fetchJsonStrict(url) {
      const res = await fetch(url);
      const text = await res.text();
      try {
        return JSON.parse(text);
      } catch {
        const preview = text.slice(0, 120).replace(/\s+/g, " ");
        throw new Error(`Expected JSON at ${url} but got: ${preview}`);
      }
    }

    async function run() {
      if (!sectionId) {
        setStatus('Missing section id (use ?id=...)');
        return;
      }

      setStatus("Loading section map…");
      const data = await fetchJsonStrict(sectionsJsonUrl);

      const list = Array.isArray(data.sections) ? data.sections : [];
      const section = list.find((s) => s.id === sectionId);

      if (!section) {
        setStatus(`Unknown section id: "${sectionId}"`);
        return;
      }

      // New format: section.pages = [{ url: "intro/introduction", id: "01-intro/introduction" }, ...]
      const pages = Array.isArray(section.pages) ? section.pages : [];
      if (!pages.length) {
        setStatus(`Section "${sectionId}" has no pages.`);
        return;
      }

      setStatus(`Loading ${pages.length} pages…`);

      const blocks = [];
      for (const page of pages) {
        // Use the slug-based URL so it matches your live routes
        const cleanUrl = String(page.url || "").replace(/^\/+/, "");
        if (!cleanUrl) continue;

        const docUrl = siteRoot + cleanUrl; // e.g. /documentation/intro/introduction

        const pageRes = await fetch(docUrl);
        const html = await pageRes.text();

        const parsed = new DOMParser().parseFromString(html, "text/html");
        const content =
          parsed.querySelector(".theme-doc-markdown") ||
          parsed.querySelector("article") ||
          parsed.querySelector("main") ||
          parsed.body;

        blocks.push(
          `<section style="page-break-after: always;">${content.innerHTML}</section>`
        );
      }

      if (!cancelled) {
        setHtmlBlocks(blocks);
        setStatus("Ready — opening print dialog…");
        setTimeout(() => window.print(), 300);
      }
    }

    run().catch((e) => {
      if (!cancelled) setStatus(`Error: ${e.message || String(e)}`);
    });

    return () => {
      cancelled = true;
    };
  }, [sectionId, sectionsJsonUrl, siteRoot]);

  return (
    <Layout title={`Print: ${sectionId || "Section"}`}>
      <main style={{ padding: "1rem" }}>
        <h1>{sectionId || "Print section"}</h1>
        <p>{status}</p>
        <div dangerouslySetInnerHTML={{ __html: htmlBlocks.join("\n") }} />
      </main>
    </Layout>
  );
}
