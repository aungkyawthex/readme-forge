import { useState } from "react";
import { parseHeaderAndAbout } from "../lib/importReadme";
import { templates } from "../templates";
import { useProfile } from "../store/useProfile";

export function EditorToolbar() {
  const loadTemplate = useProfile((s) => s.loadTemplate);
  const reset = useProfile((s) => s.reset);
  const updateSection = useProfile((s) => s.updateSection);
  const [importText, setImportText] = useState("");
  const [importOpen, setImportOpen] = useState(false);

  const onLoadTemplate = (id: string) => {
    if (!id) return;
    const ok = window.confirm(
      "Load this template? It will replace your current README data."
    );
    if (ok) loadTemplate(id);
  };

  const onReset = () => {
    const ok = window.confirm("Reset all fields? This cannot be undone.");
    if (ok) reset();
  };

  const onImport = () => {
    const { header, about } = parseHeaderAndAbout(importText);
    updateSection("header", header);
    updateSection("about", about);
    setImportOpen(false);
  };

  return (
    <header className="flex flex-wrap items-center gap-3">
      <h1 className="mr-auto text-lg font-semibold">readme-forge</h1>
      <label className="flex items-center gap-2 text-sm">
        <span>Load template</span>
        <select
          className="rounded border px-2 py-1"
          defaultValue=""
          onChange={(e) => {
            onLoadTemplate(e.target.value);
            e.target.value = "";
          }}
        >
          <option value="" disabled>
            Choose…
          </option>
          {templates.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </label>
      <button type="button" className="rounded border px-3 py-1 text-sm" onClick={onReset}>
        Reset
      </button>
      <button
        type="button"
        className="rounded border px-3 py-1 text-sm"
        onClick={() => setImportOpen((open) => !open)}
      >
        Import README
      </button>
      {importOpen && (
        <div className="w-full space-y-2 rounded border p-3">
          <label className="block space-y-1">
            <span className="text-sm font-medium">Paste Markdown</span>
            <textarea
              className="h-32 w-full rounded-md border px-3 py-2 font-mono text-sm"
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Only Header and About fields are filled from the paste."
            />
          </label>
          <button
            type="button"
            className="rounded bg-black px-3 py-1.5 text-sm text-white"
            onClick={onImport}
          >
            Fill Header & About
          </button>
        </div>
      )}
    </header>
  );
}
