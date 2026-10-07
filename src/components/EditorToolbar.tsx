import { useState } from "react";
import { parseHeaderAndAbout } from "../lib/importReadme";
import { templates } from "../templates";
import { useProfile } from "../store/useProfile";

export function EditorToolbar() {
  const loadTemplate = useProfile((s) => s.loadTemplate);
  const reset = useProfile((s) => s.reset);
  const updateSection = useProfile((s) => s.updateSection);
  const theme = useProfile((s) => s.theme);
  const setTheme = useProfile((s) => s.setTheme);
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
    <header className="toolbar flex flex-wrap items-center gap-3 rounded-xl border px-4 py-3">
      <div className="mr-auto">
        <h1 className="text-lg font-semibold tracking-tight">readme-forge</h1>
        <p className="text-xs text-[var(--muted)]">Shape your GitHub introduction.</p>
      </div>
      <button
        type="button"
        className="rounded border px-3 py-1 text-sm"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? "Dark mode" : "Light mode"}
      </button>
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
