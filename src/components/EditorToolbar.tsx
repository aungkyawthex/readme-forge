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
        className="editor-icon-button"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        <span aria-hidden="true">{theme === "light" ? "☾" : "☀"}</span>
      </button>
      <label className="editor-template-picker">
        <span>Template</span>
        <select
          className="editor-select"
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
      <button type="button" className="editor-button editor-button-quiet" onClick={onReset}>
        Reset
      </button>
      <button
        type="button"
        className="editor-button editor-button-quiet"
        onClick={() => setImportOpen((open) => !open)}
      >
        Import README
      </button>
      {importOpen && (
        <div className="editor-import w-full space-y-3 p-4">
          <label className="block space-y-1">
            <span className="editor-label">Paste Markdown</span>
            <textarea
              className="editor-input h-32 font-mono text-sm"
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Only Header and About fields are filled from the paste."
            />
          </label>
          <button
            type="button"
            className="editor-button editor-button-primary"
            onClick={onImport}
          >
            Fill Header & About
          </button>
        </div>
      )}
    </header>
  );
}
