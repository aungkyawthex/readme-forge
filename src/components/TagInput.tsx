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
      <label htmlFor={inputId} className="text-sm font-medium">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="flex items-center gap-1 rounded-full border px-3 py-1 text-sm"
          >
            {t}
            <button
              type="button"
              aria-label={`Remove ${t}`}
              className="rounded px-1 hover:bg-gray-100"
              onClick={() => onChange(tags.filter((x) => x !== t))}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        id={inputId}
        className="w-full rounded-md border px-3 py-2"
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
