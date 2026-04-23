import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getProjects } from '../lib/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const PublishedSites = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPublished() {
      setLoading(true);
      try {
        const data = await getProjects();
        const list = Array.isArray(data) ? data : [];
        setProjects(list.filter((project) => project.is_published));
      } finally {
        setLoading(false);
      }
    }

    loadPublished();
  }, []);

  const published = useMemo(
    () => projects.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
    [projects],
  );

  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface text-on-surface absolute top-0 left-0 z-50 antialiased">
      <Sidebar activePage="published" />

      <main className="flex-1 flex flex-col md:pl-64 overflow-hidden h-full">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Published Sites</h1>
            <p className="text-xs text-slate-500">Live URLs generated from backend publish endpoint.</p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          <div className="mx-auto max-w-6xl space-y-4">
            {loading ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">Loading published projects...</div>
            ) : null}

            {!loading && published.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
                <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 block">public</span>
                <h2 className="text-xl font-bold text-slate-700">No Sites Published Yet</h2>
                <p className="text-slate-500 mt-2">Publish a project from My Projects or Dashboard to list it here.</p>
              </div>
            ) : null}

            {!loading && published.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {published.map((project) => {
                  const url = project.published_path ? `${API_BASE_URL}/media/${project.published_path}` : null;
                  return (
                    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" key={project.id}>
                      <div className="mb-3">
                        <h2 className="text-lg font-bold text-slate-900">{project.name}</h2>
                        <p className="text-xs text-slate-500">Published project #{project.id}</p>
                      </div>

                      {url ? (
                        <a
                          className="block truncate rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-indigo-700"
                          href={url}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {url}
                        </a>
                      ) : (
                        <p className="text-sm text-slate-500">Published path not available.</p>
                      )}
                    </article>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PublishedSites;
