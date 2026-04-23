import { createContext, useContext, useMemo, useState } from "react";

const BuilderContext = createContext(null);

const DEFAULT_CONTENT = {
  text: "Edit this text",
  heading: "Your Heading",
  button: "Click Me",
};

const DEFAULT_PROPS = {
  image: { src: "https://via.placeholder.com/420x240", href: "" },
  button: { href: "" },
};

const DEFAULT_STYLES = {
  heading: { fontSize: "48px", color: "#1e293b", margin: "0 0 16px 0" },
  text: { fontSize: "18px", color: "#64748b", margin: "0 0 12px 0" },
  button: {
    backgroundColor: "#6d28d9",
    color: "#ffffff",
    padding: "12px 24px",
    borderRadius: "10px",
    margin: "12px 0 0 0",
  },
  image: { borderRadius: "12px", margin: "0" },
  container: { padding: "24px", margin: "0", borderRadius: "12px" },
  row: { padding: "0", margin: "0" },
  column: { padding: "8px", margin: "0" },
  card: { backgroundColor: "#ffffff", padding: "16px", borderRadius: "12px", margin: "0" },
};

const CONTAINER_TYPES = new Set(["container", "row", "column", "card", "navbar", "footer"]);

function makeId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function createElement(type) {
  return {
    id: makeId(),
    type,
    content: DEFAULT_CONTENT[type] || "",
    props: { ...(DEFAULT_PROPS[type] || {}) },
    styles: { ...(DEFAULT_STYLES[type] || {}) },
    children: [],
  };
}

function mapTree(elements, mapper) {
  return elements.map((el) => {
    const mapped = mapper(el);
    const children = el.children?.length ? mapTree(el.children, mapper) : [];
    return { ...mapped, children };
  });
}

function findElement(elements, id) {
  for (const el of elements) {
    if (el.id === id) {
      return el;
    }
    if (el.children?.length) {
      const found = findElement(el.children, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

function removeElement(elements, id) {
  let removed = null;
  const next = elements
    .map((el) => {
      if (el.id === id) {
        removed = el;
        return null;
      }
      if (!el.children?.length) {
        return el;
      }
      const result = removeElement(el.children, id);
      if (result.removed) {
        removed = result.removed;
      }
      return { ...el, children: result.elements };
    })
    .filter(Boolean);
  return { elements: next, removed };
}

function insertIntoParent(elements, parentId, node) {
  if (!parentId) {
    return [...elements, node];
  }
  return elements.map((el) => {
    if (el.id === parentId) {
      return { ...el, children: [...(el.children || []), node] };
    }
    if (!el.children?.length) {
      return el;
    }
    return { ...el, children: insertIntoParent(el.children, parentId, node) };
  });
}

function collectDescendantIds(element, bucket = new Set()) {
  for (const child of element.children || []) {
    bucket.add(child.id);
    collectDescendantIds(child, bucket);
  }
  return bucket;
}

export function canParentAccept(parentType, childType) {
  if (!parentType) {
    return true;
  }
  if (parentType === "row") {
    return true;
  }
  if (parentType === "column") {
    return true;
  }
  return CONTAINER_TYPES.has(parentType);
}

export function BuilderProvider({ children }) {
  const [layout, setLayout] = useState([]);
  const [selectedElementId, setSelectedElement] = useState(null);

  const addElement = (type, parentId = null) => {
    const element = createElement(type);
    setLayout((prev) => insertIntoParent(prev, parentId, element));
    setSelectedElement(element.id);
    return element;
  };

  const updateElement = (id, updates) => {
    setLayout((prev) =>
      mapTree(prev, (el) => {
        if (el.id !== id) {
          return el;
        }
        return {
          ...el,
          ...updates,
          props: updates.props ? { ...(el.props || {}), ...updates.props } : el.props,
          styles: updates.styles ? { ...(el.styles || {}), ...updates.styles } : el.styles,
        };
      }),
    );
  };

  const deleteElement = (id) => {
    setLayout((prev) => removeElement(prev, id).elements);
    setSelectedElement((prev) => (prev === id ? null : prev));
  };

  const moveElement = (dragId, dropParentId = null) => {
    setLayout((prev) => {
      const dragged = findElement(prev, dragId);
      if (!dragged) {
        return prev;
      }
      if (dropParentId === dragId) {
        return prev;
      }
      if (dropParentId) {
        const descendants = collectDescendantIds(dragged);
        if (descendants.has(dropParentId)) {
          return prev;
        }
      }
      const removed = removeElement(prev, dragId);
      if (!removed.removed) {
        return prev;
      }
      return insertIntoParent(removed.elements, dropParentId, removed.removed);
    });
  };

  const selectedElement = useMemo(
    () => (selectedElementId ? findElement(layout, selectedElementId) : null),
    [layout, selectedElementId],
  );

  const value = useMemo(
    () => ({
      layout,
      selectedElementId,
      selectedElement,
      setLayout,
      addElement,
      updateElement,
      deleteElement,
      setSelectedElement,
      moveElement,
      findElementById: (id) => findElement(layout, id),
    }),
    [layout, selectedElementId, selectedElement],
  );

  return <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>;
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("useBuilder must be used inside BuilderProvider");
  }
  return context;
}
