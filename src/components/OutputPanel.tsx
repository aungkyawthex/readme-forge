import { useEffect, useState } from "react";
import { Preview } from "./Preview";

type Tab = "preview" | "raw";

type OutputPanelProps = {
  markdown: string;
};

function downloadReadme(markdown: string) {
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "README.md";
  a.click();
  URL.revokeObjectURL(url);
}

export function OutputPanel({ markdown }: OutputPanelProps) {
  const [tab, setTab] = useState<Tab>("preview");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
  };

  return (
    <section className="flex min-h-0 flex-col overflow-hidden rounded-lg border">
      <div className="flex items-center justify-between gap-2 border-b px-4 py-2">
        <div className="flex gap-1" role="tablist" aria-label="Output">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "preview"}
            className={`rounded px-3 py-1 text-sm ${
              tab === "preview" ? "bg-black text-white" : "hover:bg-gray-100"
            }`}
            onClick={() => setTab("preview")}
          >
            Preview
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "raw"}
            className={`rounded px-3 py-1 text-sm ${
              tab === "raw" ? "bg-black text-white" : "hover:bg-gray-100"
            }`}
            onClick={() => setTab("raw")}
          >
            Raw Markdown
          </button>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded bg-black px-3 py-1.5 text-sm text-white"
            onClick={copy}
          >
            {copied ? "Copied!" : "Copy Markdown"}
          </button>
          <button
            type="button"
            className="rounded border px-3 py-1.5 text-sm"
            onClick={() => downloadReadme(markdown)}
          >
            Download README.md
          </button>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-6">
        {tab === "preview" ? (
          <Preview markdown={markdown} />
        ) : (
          <textarea
            readOnly
            aria-label="Raw Markdown"
            className="h-full min-h-[24rem] w-full resize-none font-mono text-sm"
            value={markdown}
          />
        )}
      </div>
    </section>
  );
}
