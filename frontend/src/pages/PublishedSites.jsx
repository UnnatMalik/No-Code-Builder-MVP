import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getProjects } from '../lib/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const PublishedSites = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    async function loadPublished() {
      setLoading(true);
      try {
        const data = await getProjects();
        const list = Array.isArray(data) ? data : [];
        setProjects(list.filter((p) => p.is_published));
      } finally {
        setLoading(false);
      }
    }
    loadPublished();
  }, []);

  const published = useMemo(
    () => [...projects].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
    [projects],
  );

  const getUrl = (project) => {
    if (!project.published_path) return null;
    return project.published_path.startsWith('http')
      ? project.published_path
      : `${API_BASE_URL}/media/${project.published_path}`;
  };

  const handleCopy = (id, url) => {
    navigator.clipboard.writeText(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 absolute top-0 left-0 z-50 antialiased">
      <Sidebar activePage="published" />

      <main className="flex-1 flex flex-col md:pl-64 overflow-hidden h-full">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">Published Sites</h1>
            <p className="text-xs text-slate-400 mt-0.5">All your live sites in one place</p>
          </div>
          <span className="text-xs font-semibold bg-violet-100 text-violet-700 px-3 py-1 rounded-full">
            {published.length} site{published.length !== 1 ? 's' : ''}
          </span>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-5xl">

            {/* Loading */}
            {loading && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 animate-pulse">
                    <div className="h-4 bg-slate-100 rounded w-2/3 mb-2" />
                    <div className="h-3 bg-slate-100 rounded w-1/3 mb-4" />
                    <div className="h-8 bg-slate-100 rounded" />
                  </div>
                ))}
              </div>
            )}

            {/* Empty */}
            {!loading && published.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-violet-50">
                  <svg className="h-8 w-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0v-4m0-5v.01" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-slate-700">No sites published yet</h2>
                <p className="mt-1 text-sm text-slate-400 max-w-xs">
                  Go to the Dashboard, build something, and hit Publish to see it here.
                </p>
              </div>
            )}

            {/* Grid */}
            {!loading && published.length > 0 && (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {published.map((project) => {
                  const url = getUrl(project);
                  return (
                    <article
                      key={project.id}
                      className="group flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                    >
                      {/* Preview bar */}
                      <div className="h-2 w-full bg-gradient-to-r from-violet-500 to-indigo-500" />

                      <div className="flex flex-col flex-1 p-5">
                        {/* Title */}
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div>
                            <h2 className="font-bold text-slate-900 leading-tight">{project.name}</h2>
                            <p className="text-xs text-slate-400 mt-0.5">
                              Published {formatDate(project.created_at)}
                            </p>
                          </div>
                          <span className="shrink-0 text-xs font-semibold bg-green-50 text-green-600 border border-green-200 px-2 py-0.5 rounded-full">
                            Live
                          </span>
                        </div>

                        {/* URL */}
                        {url ? (
                          <div className="mt-auto">
                            <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                              <span className="flex-1 truncate text-xs text-violet-600 font-medium">{url}</span>
                            </div>
                            <div className="flex gap-2 mt-3">
                              <a
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-violet-600 px-3 py-2 text-xs font-semibold text-white hover:bg-violet-700 transition-colors"
                              >
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                Open
                              </a>
                              <button
                                onClick={() => handleCopy(project.id, url)}
                                className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                                type="button"
                              >
                                {copied === project.id ? (
                                  <>
                                    <svg className="h-3.5 w-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Copied!
                                  </>
                                ) : (
                                  <>
                                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    Copy Link
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="mt-auto text-xs text-slate-400">URL not available</p>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PublishedSites;
