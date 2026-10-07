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
        <div key={item.id} className="editor-card space-y-4 p-5">
          <div className="flex items-center justify-between">
            <h3 className="editor-card-title">{itemTitle(index)}</h3>
            <button
              type="button"
              className="editor-remove"
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
        className="editor-button editor-button-primary"
        onClick={() => onChange([...items, createItem()])}
      >
        {addLabel}
      </button>
    </div>
  );
}
