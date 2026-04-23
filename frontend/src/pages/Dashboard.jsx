import { DndContext } from "@dnd-kit/core";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Canvas from "../components/builder/Canvas";
import Inspector from "../components/builder/Inspector";
import LivePreview from "../components/builder/LivePreview";
import BuilderSidebar from "../components/builder/Sidebar";
import Topbar from "../components/builder/Topbar";
import AppSidebar from "../components/Sidebar";
import { BuilderProvider, canParentAccept, useBuilder } from "../context/BuilderContext";
import {
  createProject,
  getProjectLayout,
  getProjects,
  publishProject,
  updateProjectLayout,
} from "../lib/api";

function camelToKebab(name) {
  return name.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

function kebabToCamel(name) {
  return name.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

function normalizeLayoutFromBackend(layoutObj) {
  const source = layoutObj?.children ? layoutObj.children : Array.isArray(layoutObj) ? layoutObj : [];

  function mapNode(node) {
    const styles = {};
    for (const [key, value] of Object.entries(node.styles || {})) {
      styles[kebabToCamel(key)] = value;
    }
    return {
      id: node.id || crypto.randomUUID(),
      type: node.type,
      content: node.content || "",
      props: {
        ...(node.props || {}),
        src: node.src || node.props?.src || "",
        href: node.href || node.props?.href || "",
      },
      styles,
      children: (node.children || []).map(mapNode),
    };
  }

  return source.map(mapNode);
}

function serializeLayoutForBackend(layout) {
  function mapNode(node) {
    const styles = {};
    for (const [key, value] of Object.entries(node.styles || {})) {
      styles[camelToKebab(key)] = value;
    }
    return {
      id: node.id,
      type: node.type,
      content: node.content,
      props: node.props || {},
      styles,
      children: (node.children || []).map(mapNode),
    };
  }

  return {
    type: "container",
    styles: {
      padding: "16px",
    },
    children: layout.map(mapNode),
  };
}

function BuilderWorkspace() {
  const [searchParams] = useSearchParams();
  const {
    layout,
    selectedElement,
    selectedElementId,
    setLayout,
    setSelectedElement,
    addElement,
    updateElement,
    deleteElement,
    moveElement,
    findElementById,
  } = useBuilder();

  const [projectId, setProjectId] = useState(null);
  const [projectName, setProjectName] = useState("Loading...");
  const [statusText, setStatusText] = useState("Syncing...");
  const [isHydrating, setIsHydrating] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState(null);
  const [isLivePreviewVisible, setIsLivePreviewVisible] = useState(true);
  const lastSavedLayout = useRef("");

  const flatLayoutHash = useMemo(() => JSON.stringify(layout), [layout]);

  useEffect(() => {
    let isMounted = true;
    const requestedProjectId = searchParams.get("projectId");

    async function bootstrap() {
      try {
        const projectList = await getProjects();
        let project = null;

        if (Array.isArray(projectList) && projectList.length) {
          if (requestedProjectId) {
            project = projectList.find((item) => String(item.id) === String(requestedProjectId)) || null;
          }
          if (!project) {
            project = projectList[0];
          }
        }

        if (!project) {
          project = await createProject({ name: "Untitled Canvas Project" });
        }

        if (!isMounted) {
          return;
        }

        setProjectId(project.id);
        setProjectName(project.name || "Untitled Canvas Project");

        const response = await getProjectLayout(project.id);
        if (!isMounted) {
          return;
        }

        const incomingLayout = normalizeLayoutFromBackend(response?.layout || {});
        setLayout(incomingLayout);
        lastSavedLayout.current = JSON.stringify(incomingLayout);
        setStatusText("Loaded");
      } catch {
        if (isMounted) {
          setStatusText("Load failed");
        }
      } finally {
        if (isMounted) {
          setIsHydrating(false);
        }
      }
    }

    bootstrap();

    return () => {
      isMounted = false;
    };
  }, [searchParams, setLayout]);

  useEffect(() => {
    if (!projectId || isHydrating) {
      return;
    }

    const timer = setTimeout(async () => {
      if (lastSavedLayout.current === flatLayoutHash) {
        return;
      }
      try {
        setStatusText("Saving...");
        const payload = serializeLayoutForBackend(layout);
        await updateProjectLayout(projectId, payload);
        lastSavedLayout.current = flatLayoutHash;
        setStatusText("Saved");
      } catch {
        setStatusText("Save failed");
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [flatLayoutHash, isHydrating, layout, projectId]);

  const handlePublish = async () => {
    if (!projectId) return;
    setIsPublishing(true);
    try {
      const result = await publishProject(projectId);
      if (result?.public_url) {
        const url = result.public_url.startsWith("http")
          ? result.public_url
          : `${import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000"}${result.public_url}`;
        setPublishedUrl(url);
      }
      setStatusText("Published");
    } catch {
      setStatusText("Publish failed");
    } finally {
      setIsPublishing(false);
    }
  };

  const resolveDropParent = (overId) => {
    if (!overId || overId === "root-drop") {
      return null;
    }
    if (overId.startsWith("drop-")) {
      return overId.replace("drop-", "");
    }
    if (overId.startsWith("element-")) {
      return overId.replace("element-", "");
    }
    return null;
  };

  const handleDragEnd = ({ active, over }) => {
    if (!active || !over) {
      return;
    }

    const overId = String(over.id);
    const dropParentId = resolveDropParent(overId);
    const activeData = active.data.current;

    if (!activeData) {
      return;
    }

    if (activeData.kind === "new") {
      const parent = dropParentId ? findElementById(dropParentId) : null;
      if (!canParentAccept(parent?.type, activeData.type)) {
        setStatusText("Invalid drop target");
        return;
      }
      addElement(activeData.type, dropParentId);
      return;
    }

    if (activeData.kind === "existing") {
      const draggedElement = findElementById(activeData.id);
      const parent = dropParentId ? findElementById(dropParentId) : null;
      if (!draggedElement || !canParentAccept(parent?.type, draggedElement.type)) {
        setStatusText("Invalid move");
        return;
      }
      moveElement(activeData.id, dropParentId);
    }
  };

  const handleDeleteSelected = () => {
    if (!selectedElementId) {
      return;
    }
    deleteElement(selectedElementId);
  };

  return (
    <div className="absolute inset-0 z-50 flex h-screen bg-slate-100">
      <AppSidebar activePage="dashboard" />

      <div className="flex min-h-0 flex-1 flex-col md:pl-64">
        <Topbar
          isPublishing={isPublishing}
          isLivePreviewVisible={isLivePreviewVisible}
          onPublish={handlePublish}
          onToggleLivePreview={() => setIsLivePreviewVisible((prev) => !prev)}
          projectName={projectName}
          statusText={statusText}
        />

        <DndContext onDragEnd={handleDragEnd}>
          <div className="flex min-h-0 flex-1">
            <BuilderSidebar />
            <Canvas
              layout={layout}
              onDelete={deleteElement}
              onSelect={setSelectedElement}
              selectedElementId={selectedElementId}
            />
            <Inspector
              onDelete={handleDeleteSelected}
              onUpdate={(updates) => selectedElementId && updateElement(selectedElementId, updates)}
              selectedElement={selectedElement}
            />
            {isLivePreviewVisible ? <LivePreview layout={layout} /> : null}
          </div>
        </DndContext>
      </div>

      {publishedUrl && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
            <h2 className="mb-1 text-lg font-bold text-slate-800">🎉 Site Published!</h2>
            <p className="mb-4 text-sm text-slate-500">Your site is live at:</p>
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              <span className="flex-1 truncate text-sm text-violet-700">{publishedUrl}</span>
              <button
                className="shrink-0 rounded-md bg-violet-600 px-3 py-1 text-xs font-semibold text-white hover:bg-violet-700"
                onClick={() => navigator.clipboard.writeText(publishedUrl)}
                type="button"
              >
                Copy
              </button>
            </div>
            <div className="mt-4 flex gap-2">
              <a
                className="flex-1 rounded-md bg-violet-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-violet-700"
                href={publishedUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Open Site
              </a>
              <button
                className="flex-1 rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                onClick={() => setPublishedUrl(null)}
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  return (
    <BuilderProvider>
      <BuilderWorkspace />
    </BuilderProvider>
  );
}
