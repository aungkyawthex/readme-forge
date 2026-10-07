type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
};

export function Field({ label, value, onChange, placeholder, multiline }: FieldProps) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium">{label}</span>
      {multiline ? (
        <textarea
          className="w-full rounded-md border px-3 py-2"
          rows={3}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className="w-full rounded-md border px-3 py-2"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}