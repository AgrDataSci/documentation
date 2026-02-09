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
  const sectionName = query.get("name") || "";

  // ✅ These will become /documentation/print/sections.json etc. on GitHub Pages
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
        throw new Error(`Expected JSON at ${url} but got HTML (likely a 404).`);
      }
    }

    async function run() {
      if (!sectionName) {
        setStatus('Missing section name (?name=...)');
        return;
      }

      setStatus("Loading section map…");
      const sections = await fetchJsonStrict(sectionsJsonUrl);

      const ids = sections[sectionName];
      if (!ids?.length) {
        setStatus(`Unknown/empty section: "${sectionName}"`);
        return;
      }

      setStatus(`Loading ${ids.length} pages…`);

      const blocks = [];
      for (const id of ids) {
        // ✅ Important: doc ids often contain slashes, so DON'T use encodeURIComponent(id)
        const cleanId = String(id).replace(/^\/+/, "");
        const docUrl = siteRoot + cleanId; // e.g. /documentation/intro/introduction

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

    run().catch((e) => !cancelled && setStatus(`Error: ${e.message}`));
    return () => {
      cancelled = true;
    };
  }, [sectionName, sectionsJsonUrl, siteRoot]);

  return (
    <Layout title={`Print: ${sectionName || "Section"}`}>
      <main style={{ padding: "1rem" }}>
        <h1>{sectionName || "Print section"}</h1>
        <p>{status}</p>
        <div dangerouslySetInnerHTML={{ __html: htmlBlocks.join("\n") }} />
      </main>
    </Layout>
  );
}
