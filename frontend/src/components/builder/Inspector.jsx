export default function Inspector({ selectedElement, onUpdate, onDelete }) {
  if (!selectedElement) {
    return (
      <aside className="w-72 border-l border-slate-200 bg-white p-4">
        <h3 className="text-sm font-bold text-slate-700">Inspector</h3>
        <p className="mt-2 text-xs text-slate-500">Select an element on canvas to edit content and styles.</p>
      </aside>
    );
  }

  const styles = selectedElement.styles || {};
  const props = selectedElement.props || {};

  return (
    <aside className="w-72 border-l border-slate-200 bg-white p-4">
      <h3 className="text-sm font-bold text-slate-700">Inspector</h3>
      <p className="text-xs uppercase tracking-wider text-slate-400">{selectedElement.type}</p>

      <div className="mt-4 space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Content</p>
        {selectedElement.type !== "image" ? (
          <textarea
            className="w-full rounded-lg border border-slate-200 p-2 text-sm"
            onChange={(event) => onUpdate({ content: event.target.value })}
            rows={3}
            value={selectedElement.content || ""}
          />
        ) : null}
        {selectedElement.type === "image" ? (
          <input
            className="w-full rounded-lg border border-slate-200 p-2 text-sm"
            onChange={(event) => onUpdate({ props: { ...props, src: event.target.value } })}
            placeholder="Image URL"
            type="text"
            value={props.src || ""}
          />
        ) : null}
        {(selectedElement.type === "button" || selectedElement.type === "image") ? (
          <input
            className="w-full rounded-lg border border-slate-200 p-2 text-sm"
            onChange={(event) => onUpdate({ props: { ...props, href: event.target.value } })}
            placeholder="Link URL"
            type="text"
            value={props.href || ""}
          />
        ) : null}
      </div>

      <div className="mt-6 space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Style</p>

        <label className="block text-xs text-slate-500">Font Size</label>
        <input
          className="w-full"
          max="96"
          min="10"
          onChange={(event) => onUpdate({ styles: { ...styles, fontSize: `${event.target.value}px` } })}
          type="range"
          value={parseInt(styles.fontSize || "16", 10)}
        />

        <label className="block text-xs text-slate-500">Text Color</label>
        <input
          className="w-full rounded-lg border border-slate-200 p-2 text-sm"
          onChange={(event) => onUpdate({ styles: { ...styles, color: event.target.value } })}
          type="color"
          value={styles.color || "#1e293b"}
        />

        <label className="block text-xs text-slate-500">Background Color</label>
        <input
          className="w-full rounded-lg border border-slate-200 p-2 text-sm"
          onChange={(event) => onUpdate({ styles: { ...styles, backgroundColor: event.target.value } })}
          type="color"
          value={styles.backgroundColor || "#ffffff"}
        />

        <label className="block text-xs text-slate-500">Padding</label>
        <input
          className="w-full rounded-lg border border-slate-200 p-2 text-sm"
          onChange={(event) => onUpdate({ styles: { ...styles, padding: event.target.value } })}
          placeholder="16px"
          type="text"
          value={styles.padding || ""}
        />

        <label className="block text-xs text-slate-500">Margin</label>
        <input
          className="w-full rounded-lg border border-slate-200 p-2 text-sm"
          onChange={(event) => onUpdate({ styles: { ...styles, margin: event.target.value } })}
          placeholder="0 0 12px 0"
          type="text"
          value={styles.margin || ""}
        />

        <label className="block text-xs text-slate-500">Border Radius</label>
        <div className="grid grid-cols-3 gap-2">
          <button
            className="rounded bg-slate-100 px-2 py-1 text-xs"
            onClick={() => onUpdate({ styles: { ...styles, borderRadius: "0px" } })}
            type="button"
          >
            None
          </button>
          <button
            className="rounded bg-slate-100 px-2 py-1 text-xs"
            onClick={() => onUpdate({ styles: { ...styles, borderRadius: "8px" } })}
            type="button"
          >
            Small
          </button>
          <button
            className="rounded bg-slate-100 px-2 py-1 text-xs"
            onClick={() => onUpdate({ styles: { ...styles, borderRadius: "9999px" } })}
            type="button"
          >
            Round
          </button>
        </div>
      </div>

      <button
        className="mt-8 w-full rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600"
        onClick={onDelete}
        type="button"
      >
        Remove Element
      </button>
    </aside>
  );
}
