export default function Topbar({
  projectName,
  onPublish,
  statusText,
  isPublishing,
  isLivePreviewVisible,
  onToggleLivePreview,
}) {
  return (
    <header className="flex h-12 items-center justify-between border-b border-slate-200 bg-white px-4">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-extrabold text-violet-700">CreatorCanvas</h1>
        <span className="text-sm text-slate-500">Project: {projectName}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-500">{statusText}</span>
        <button
          className={`rounded-md border px-3 py-1.5 text-sm font-medium ${
            isLivePreviewVisible
              ? "border-violet-300 bg-violet-50 text-violet-700"
              : "border-slate-200 text-slate-700"
          }`}
          onClick={onToggleLivePreview}
          type="button"
        >
          {isLivePreviewVisible ? "Hide Live Preview" : "Show Live Preview"}
        </button>
        <button
          className="rounded-md bg-violet-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-60"
          disabled={isPublishing}
          onClick={onPublish}
          type="button"
        >
          {isPublishing ? "Publishing..." : "Publish"}
        </button>
      </div>
    </header>
  );
}
