import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  type DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { sections } from "../sections";
import { useProfile } from "../store/useProfile";

type SectionSidebarProps = {
  activeId: string;
  onSelect: (id: string) => void;
};

function transformToCss(
  transform: { x: number; y: number; scaleX: number; scaleY: number } | null
): string | undefined {
  if (!transform) return undefined;
  return `translate3d(${transform.x}px, ${transform.y}px, 0) scaleX(${transform.scaleX}) scaleY(${transform.scaleY})`;
}

function SortableSection({
  id,
  label,
  selected,
  enabled,
  onSelect,
  onToggle,
}: {
  id: string;
  label: string;
  selected: boolean;
  enabled: boolean;
  onSelect: () => void;
  onToggle: () => void;
}) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: transformToCss(transform), transition }}
      className={`flex items-center gap-1 rounded ${isDragging ? "z-10 bg-white shadow" : ""} ${
        enabled ? "" : "opacity-50"
      }`}
    >
      <button
        type="button"
        ref={setActivatorNodeRef}
        className="cursor-grab rounded px-1 py-2 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
        aria-label={`Reorder ${label}`}
        {...attributes}
        {...listeners}
      >
        ⋮⋮
      </button>
      <button
        type="button"
        aria-current={selected ? "page" : undefined}
        className={`min-w-0 flex-1 rounded px-2 py-2 text-left text-sm ${
          selected ? "bg-black text-white" : "hover:bg-gray-100"
        }`}
        onClick={onSelect}
      >
        {label}
      </button>
      <label className="flex items-center px-1" title={enabled ? "Disable section" : "Enable section"}>
        <span className="sr-only">{enabled ? `Disable ${label}` : `Enable ${label}`}</span>
        <input
          type="checkbox"
          checked={enabled}
          onChange={onToggle}
        />
      </label>
    </div>
  );
}

export function SectionSidebar({ activeId, onSelect }: SectionSidebarProps) {
  const sectionOrder = useProfile((s) => s.sectionOrder);
  const disabledSections = useProfile((s) => s.disabledSections);
  const setSectionOrder = useProfile((s) => s.setSectionOrder);
  const toggleSection = useProfile((s) => s.toggleSection);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const byId = new Map(sections.map((s) => [s.id, s]));
  const ordered = sectionOrder
    .map((id) => byId.get(id))
    .filter((s): s is (typeof sections)[number] => Boolean(s));

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = sectionOrder.indexOf(String(active.id));
    const newIndex = sectionOrder.indexOf(String(over.id));
    setSectionOrder(arrayMove(sectionOrder, oldIndex, newIndex));
  };

  return (
    <nav className="flex flex-col gap-1 overflow-y-auto" aria-label="README sections">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
          {ordered.map((section) => (
            <SortableSection
              key={section.id}
              id={section.id}
              label={section.label}
              selected={section.id === activeId}
              enabled={!disabledSections.includes(section.id)}
              onSelect={() => onSelect(section.id)}
              onToggle={() => toggleSection(section.id)}
            />
          ))}
        </SortableContext>
      </DndContext>
    </nav>
  );
}
