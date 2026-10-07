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
  const [githubTheme, setGithubTheme] = useState<"light" | "dark">("light");

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
    <section className="output-panel flex min-h-0 flex-col overflow-hidden rounded-lg border">
      <div className="output-toolbar flex items-center justify-between gap-2 px-4 py-3">
        <div className="output-tabs" role="tablist" aria-label="Output">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "preview"}
            className={`output-tab ${tab === "preview" ? "output-tab-active" : ""}`}
            onClick={() => setTab("preview")}
          >
            Preview
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "raw"}
            className={`output-tab ${tab === "raw" ? "output-tab-active" : ""}`}
            onClick={() => setTab("raw")}
          >
            Markdown
          </button>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <button
            type="button"
            className="editor-button editor-button-primary"
            onClick={copy}
          >
            {copied ? "Copied!" : "Copy Markdown"}
          </button>
          <button
            type="button"
            className="editor-button editor-button-quiet"
            onClick={() => downloadReadme(markdown)}
          >
            Download README.md
          </button>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-6">
        {tab === "preview" && (
          <div className="mb-4 flex items-center justify-end gap-2 text-xs text-[var(--muted)]">
            <span>GitHub canvas</span>
            <button
              type="button"
              className="canvas-toggle"
              aria-pressed={githubTheme === "light"}
              onClick={() => setGithubTheme("light")}
            >
              Light
            </button>
            <button
              type="button"
              className="canvas-toggle"
              aria-pressed={githubTheme === "dark"}
              onClick={() => setGithubTheme("dark")}
            >
              Dark
            </button>
          </div>
        )}
        {tab === "preview" ? (
          <Preview markdown={markdown} githubTheme={githubTheme} />
        ) : (
          <textarea
            readOnly
            aria-label="Markdown"
            className="editor-input h-full min-h-[24rem] w-full resize-none font-mono text-sm"
            value={markdown}
          />
        )}
      </div>
    </section>
  );
}
