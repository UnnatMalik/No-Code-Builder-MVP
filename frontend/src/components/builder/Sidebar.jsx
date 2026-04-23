import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";

const BASIC_ITEMS = [
  { type: "heading", label: "Heading", icon: "title" },
  { type: "text", label: "Text", icon: "subject" },
  { type: "button", label: "Button", icon: "smart_button" },
  { type: "image", label: "Image", icon: "image" },
];

const LAYOUT_ITEMS = [
  { type: "container", label: "Container", icon: "crop_5_4" },
  { type: "row", label: "Row", icon: "view_week" },
  { type: "column", label: "Column", icon: "view_column" },
  { type: "card", label: "Card", icon: "web_asset" },
];

const BLOCK_ITEMS = [
  { type: "navbar", label: "Navbar", icon: "tab" },
  { type: "footer", label: "Footer", icon: "horizontal_rule" },
];

function PaletteItem({ type, label, icon, compact = false }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: { kind: "new", type },
  });

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex w-full items-center rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 ${
        compact ? "justify-center px-2 py-2" : "gap-2 px-3 py-2"
      } ${
        isDragging ? "opacity-50" : ""
      }`}
      title={compact ? label : undefined}
      type="button"
    >
      <span className="material-symbols-outlined text-lg text-slate-500">{icon}</span>
      {!compact ? <span>{label}</span> : null}
    </button>
  );
}

function Section({ title, items, compact = false }) {
  return (
    <section className="space-y-3">
      {!compact ? <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">{title}</h3> : null}
      <div className={`grid gap-2 ${compact ? "grid-cols-1" : "grid-cols-2"}`}>
        {items.map((item) => (
          <PaletteItem compact={compact} key={item.type} {...item} />
        ))}
      </div>
    </section>
  );
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`border-r border-slate-200 bg-slate-50 p-3 transition-all duration-200 ${collapsed ? "w-16" : "w-64"}`}>
      <div className="mb-4 flex items-center justify-between">
        {!collapsed ? (
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">Library</p>
            <p className="text-[11px] text-slate-500">Components</p>
          </div>
        ) : (
          <span className="material-symbols-outlined text-indigo-600">dashboard_customize</span>
        )}
        <button
          className="rounded-md border border-slate-200 bg-white p-1.5 text-slate-600 hover:bg-slate-100"
          onClick={() => setCollapsed((prev) => !prev)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          type="button"
        >
          <span className="material-symbols-outlined text-base">{collapsed ? "chevron_right" : "chevron_left"}</span>
        </button>
      </div>
      <div className="space-y-6">
        <Section compact={collapsed} title="Basic" items={BASIC_ITEMS} />
        <Section compact={collapsed} title="Layout" items={LAYOUT_ITEMS} />
        <Section compact={collapsed} title="UI Blocks" items={BLOCK_ITEMS} />
      </div>
    </aside>
  );
}
