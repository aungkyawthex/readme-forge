import type { ReactNode } from "react";

type RepeatableListProps<T extends { id: string }> = {
  items: T[];
  onChange: (items: T[]) => void;
  createItem: () => T;
  addLabel: string;
  itemTitle: (index: number) => string;
  children: (item: T, patch: (partial: Partial<Omit<T, "id">>) => void) => ReactNode;
};

export function RepeatableList<T extends { id: string }>({
  items,
  onChange,
  createItem,
  addLabel,
  itemTitle,
  children,
}: RepeatableListProps<T>) {
  const patch = (id: string) => (partial: Partial<Omit<T, "id">>) =>
    onChange(items.map((item) => (item.id === id ? { ...item, ...partial } : item)));

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.id} className="space-y-3 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">{itemTitle(index)}</h3>
            <button
              type="button"
              className="text-sm text-red-600 hover:underline"
              onClick={() => onChange(items.filter((x) => x.id !== item.id))}
            >
              Remove
            </button>
          </div>
          {children(item, patch(item.id))}
        </div>
      ))}
      <button
        type="button"
        className="rounded bg-black px-4 py-2 text-white"
        onClick={() => onChange([...items, createItem()])}
      >
        {addLabel}
      </button>
    </div>
  );
}
