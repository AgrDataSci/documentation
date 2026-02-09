import React, { useEffect, useMemo, useState } from "react";
import Layout from "@theme/Layout";
import { useLocation } from "@docusaurus/router";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function PrintSection() {
  const query = useQuery();
  const sectionName = query.get("name") || "";
  const [htmlBlocks, setHtmlBlocks] = useState([]);
  const [status, setStatus] = useState("Loading…");

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setStatus("Loading section map…");
      const res = await fetch("/print/sections.json");
      const sections = await res.json();

      const ids = sections[sectionName];
      if (!ids || ids.length === 0) {
        setStatus("Unknown/empty section. Check the name parameter.");
        return;
      }

      setStatus(`Loading ${ids.length} pages…`);

      const blocks = [];
      for (const id of ids) {
        // Docusaurus doc routes are typically /docs/<id>
        const pageRes = await fetch(`/docs/${id}`);
        const text = await pageRes.text();

        // Extract main content (best-effort). Adjust selectors if needed.
        const doc = new DOMParser().parseFromString(text, "text/html");
        const main =
          doc.querySelector("main") ||
          doc.querySelector(".main-wrapper") ||
          doc.body;

        // Keep only the content area if possible:
        const content =
          main.querySelector(".theme-doc-markdown") ||
          main.querySelector("article") ||
          main;

        blocks.push(`<section style="page-break-after: always;">${content.innerHTML}</section>`);
      }

      if (!cancelled) {
        setHtmlBlocks(blocks);
        setStatus("Ready — opening print dialog…");
        // Give the browser a tick to render, then print
        setTimeout(() => window.print(), 300);
      }
    }

    run().catch((e) => !cancelled && setStatus(`Error: ${String(e)}`));
    return () => {
      cancelled = true;
    };
  }, [sectionName]);

  return (
    <Layout title={`Print: ${sectionName}`}>
      <main style={{ padding: "1rem" }}>
        <h1>{sectionName || "Print section"}</h1>
        <p>{status}</p>
        <div dangerouslySetInnerHTML={{ __html: htmlBlocks.join("\n") }} />
      </main>
    </Layout>
  );
}
