import { useDroppable } from "@dnd-kit/core";
import ElementRenderer from "./ElementRenderer";

function Tree({ elements, selectedElementId, onSelect, onDelete }) {
  return elements.map((element) => (
    <ElementRenderer
      element={element}
      key={element.id}
      onDelete={onDelete}
      onSelect={onSelect}
      selectedElementId={selectedElementId}
    >
      <Tree
        elements={element.children || []}
        onDelete={onDelete}
        onSelect={onSelect}
        selectedElementId={selectedElementId}
      />
    </ElementRenderer>
  ));
}

export default function Canvas({ layout, selectedElementId, onSelect, onDelete }) {
  const { setNodeRef, isOver } = useDroppable({
    id: "root-drop",
    data: { parentId: null },
  });

  const handleCanvasClick = (event) => {
    if (event.target.closest('[data-builder-element="true"]')) {
      return;
    }
    onSelect(null);
  };

  return (
    <section className="flex-1 overflow-auto bg-slate-100 p-6" onClick={handleCanvasClick}>
      <div className="mx-auto min-h-[760px] max-w-5xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div
          className={`min-h-[680px] rounded-xl border border-dashed p-4 ${
            isOver ? "border-indigo-400 bg-indigo-50/60" : "border-slate-200"
          }`}
          ref={setNodeRef}
        >
          {layout.length ? (
            <div className="space-y-3">
              <Tree
                elements={layout}
                onDelete={onDelete}
                onSelect={onSelect}
                selectedElementId={selectedElementId}
              />
            </div>
          ) : (
            <div className="flex h-[620px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50">
              <p className="text-sm font-medium text-slate-500">Drag components from the left library</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
