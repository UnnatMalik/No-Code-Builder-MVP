import { memo } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";

const CONTAINER_TYPES = new Set(["container", "row", "column", "card", "navbar", "footer"]);

function buildStyle(element) {
  const style = { ...(element.styles || {}) };
  if (element.type === "row") {
    style.minHeight = style.minHeight || "100px";
  }
  if (element.type === "column") {
    style.flex = style.flex || "1";
    style.minHeight = style.minHeight || "120px";
  }
  if (element.type === "container") {
    style.minHeight = style.minHeight || "160px";
  }
  if (element.type === "card") {
    style.boxShadow = style.boxShadow || "0 6px 20px rgba(15, 23, 42, 0.08)";
  }
  return style;
}

function renderLeaf(element) {
  switch (element.type) {
    case "text":
      return <p>{element.content || "Text"}</p>;
    case "heading":
      return <h1>{element.content || "Heading"}</h1>;
    case "button":
      return <button type="button">{element.content || "Button"}</button>;
    case "image":
      return <img alt={element.content || "image"} src={element.props?.src || "https://via.placeholder.com/400x220"} />;
    default:
      return null;
  }
}

function ElementRendererImpl({ element, selectedElementId, onSelect, onDelete, children }) {
  const isContainer = CONTAINER_TYPES.has(element.type);
  const isSelected = selectedElementId === element.id;

  const { attributes, listeners, setNodeRef: setDragRef, transform, isDragging } = useDraggable({
    id: `element-${element.id}`,
    data: { kind: "existing", id: element.id, type: element.type },
  });

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: `drop-${element.id}`,
    data: { parentId: element.id },
    disabled: !isContainer,
  });

  const dragStyle =
    transform && !isContainer
      ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
      : undefined;

  const shared = {
    "data-builder-element": "true",
    ref: (node) => {
      setDragRef(node);
      setDropRef(node);
    },
    onClick: (event) => {
      event.stopPropagation();
      onSelect(element.id);
    },
    style: {
      ...buildStyle(element),
      ...dragStyle,
      outline: isSelected ? "2px solid #6d28d9" : "1px dashed #dbeafe",
      outlineOffset: "2px",
      opacity: isDragging ? 0.6 : 1,
      backgroundColor: element.styles?.backgroundColor || (isContainer ? "#ffffff" : undefined),
      position: "relative",
    },
    className: `rounded-md ${isOver && isContainer ? "ring-2 ring-indigo-300" : ""}`,
    ...listeners,
    ...attributes,
  };

  if (!isContainer) {
    return (
      <div {...shared}>
        {renderLeaf(element)}
        {isSelected ? (
          <button
            className="absolute -bottom-3 right-2 rounded bg-white p-1 text-xs text-red-600 shadow"
            onClick={(event) => {
              event.stopPropagation();
              onDelete(element.id);
            }}
            type="button"
          >
            <span className="material-symbols-outlined text-sm">delete</span>
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <section {...shared}>
      <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">{element.type}</div>
      <div className={element.type === "row" ? "flex flex-wrap gap-3" : "space-y-3"}>{children}</div>
      {(!element.children || element.children.length === 0) ? (
        <div className="rounded border border-dashed border-slate-200 bg-slate-50 p-3 text-xs text-slate-400">
          Drop components here
        </div>
      ) : null}
    </section>
  );
}

const ElementRenderer = memo(ElementRendererImpl);

export default ElementRenderer;
