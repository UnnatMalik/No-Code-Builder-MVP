function buildStyle(node) {
  const style = { ...(node.styles || {}) };

  if (node.type === "row") {
    style.display = "flex";
    style.gap = style.gap || "12px";
  }

  if (node.type === "column") {
    style.flex = style.flex || "1";
    style.minHeight = style.minHeight || "120px";
  }

  if (node.type === "container") {
    style.minHeight = style.minHeight || "160px";
  }

  if (node.type === "card") {
    style.boxShadow = style.boxShadow || "0 6px 20px rgba(15, 23, 42, 0.08)";
  }

  return style;
}

function renderNode(node) {
  const children = (node.children || []).map(renderNode);
  const style = buildStyle(node);

  switch (node.type) {
    case "heading":
      return (
        <h1 key={node.id} style={style}>
          {node.content || "Heading"}
          {children}
        </h1>
      );
    case "text":
      return (
        <p key={node.id} style={style}>
          {node.content || "Text"}
          {children}
        </p>
      );
    case "button": {
      const href = node.props?.href;
      if (href) {
        return (
          <a href={href} key={node.id} rel="noreferrer" style={style} target="_blank">
            {node.content || "Button"}
            {children}
          </a>
        );
      }
      return (
        <button key={node.id} style={style} type="button">
          {node.content || "Button"}
          {children}
        </button>
      );
    }
    case "image":
      return (
        <img
          alt={node.content || "image"}
          key={node.id}
          src={node.props?.src || "https://via.placeholder.com/400x220"}
          style={style}
        />
      );
    case "row":
    case "column":
    case "container":
      return (
        <div key={node.id} style={style}>
          {children}
        </div>
      );
    case "card":
      return (
        <section key={node.id} style={style}>
          {children}
        </section>
      );
    case "navbar":
      return (
        <nav key={node.id} style={style}>
          {children}
        </nav>
      );
    case "footer":
      return (
        <footer key={node.id} style={style}>
          {children}
        </footer>
      );
    default:
      return null;
  }
}

export default function LivePreview({ layout }) {
  return (
    <aside className="hidden xl:flex h-full w-[360px] border-l border-slate-200 bg-white flex-col">
      <div className="h-12 border-b border-slate-200 px-4 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-700">Live Preview</h2>
        <span className="text-[11px] font-medium text-emerald-600">Auto-updating</span>
      </div>
      <div className="flex-1 overflow-auto bg-slate-100 p-4">
        <div className="mx-auto min-h-[680px] w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          {layout.length ? (
            <div className="space-y-3">{layout.map(renderNode)}</div>
          ) : (
            <div className="flex h-[620px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50">
              <p className="text-sm font-medium text-slate-500">Preview updates as you build</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
