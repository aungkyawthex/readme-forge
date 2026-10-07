type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  error?: string;
};

export function Field({ label, value, onChange, placeholder, multiline, error }: FieldProps) {
  return (
    <label className="editor-field block space-y-1.5">
      <span className="editor-label">{label}</span>
      {multiline ? (
        <textarea
          className={`editor-input ${error ? "editor-input-error" : ""}`}
          rows={3}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
        />
      ) : (
        <input
          className={`editor-input ${error ? "editor-input-error" : ""}`}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
        />
      )}
      {error && <span className="block text-xs text-red-600">{error}</span>}
    </label>
  );
}
