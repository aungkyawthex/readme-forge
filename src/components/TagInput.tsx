import { useId, useState } from "react";

type TagInputProps = {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
};

export function TagInput({ label, tags, onChange, placeholder }: TagInputProps) {
  const [draft, setDraft] = useState("");
  const inputId = useId();

  const add = () => {
    const value = draft.trim().toLowerCase();
    if (value && !tags.includes(value)) onChange([...tags, value]);
    setDraft("");
  };

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="editor-label">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="editor-tag"
          >
            {t}
            <button
              type="button"
              aria-label={`Remove ${t}`}
              className="editor-tag-remove"
              onClick={() => onChange(tags.filter((x) => x !== t))}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        id={inputId}
        className="editor-input"
        value={draft}
        placeholder={placeholder}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            add();
          }
        }}
      />
    </div>
  );
}
