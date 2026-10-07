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
    <label className="block space-y-1">
      <span className="text-sm font-medium">{label}</span>
      {multiline ? (
        <textarea
          className={`w-full rounded-md border px-3 py-2 ${error ? "border-red-500" : ""}`}
          rows={3}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
        />
      ) : (
        <input
          className={`w-full rounded-md border px-3 py-2 ${error ? "border-red-500" : ""}`}
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
