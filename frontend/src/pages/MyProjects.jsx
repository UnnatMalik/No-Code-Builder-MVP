import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { createProject, deleteProject, getProjects, publishProject } from '../lib/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const MyProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreating, setIsCreating] = useState(false);
  const [actionError, setActionError] = useState('');

  const loadProjects = async () => {
    setLoading(true);
    setActionError('');
    try {
      const data = await getProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch {
      setActionError('Unable to load projects. Please refresh.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
          statusFilter === 'all' ||
          (statusFilter === 'published' && project.is_published) ||
          (statusFilter === 'draft' && !project.is_published);
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [projects, searchQuery, statusFilter]);

  const handleCreateProject = async () => {
    setIsCreating(true);
    setActionError('');
    try {
      const created = await createProject({ name: `Project ${projects.length + 1}` });
      navigate(`/dashboard?projectId=${created.id}`);
    } catch {
      setActionError('Unable to create project right now.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleEditProject = (projectId) => {
    navigate(`/dashboard?projectId=${projectId}`);
  };

  const handleDeleteProject = async (projectId) => {
    setActionError('');
    try {
      await deleteProject(projectId);
      setProjects((prev) => prev.filter((project) => project.id !== projectId));
    } catch {
      setActionError('Unable to delete project.');
    }
  };

  const handlePublishProject = async (projectId) => {
    setActionError('');
    try {
      const result = await publishProject(projectId);
      setProjects((prev) =>
        prev.map((project) =>
          project.id === projectId
            ? { ...project, is_published: true, published_path: result?.published_path || project.published_path }
            : project,
        ),
      );
      if (result?.public_url) {
        window.open(`${API_BASE_URL}${result.public_url}`, '_blank');
      }
    } catch {
      setActionError('Unable to publish project.');
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface text-on-surface absolute top-0 left-0 z-50 antialiased">
      <Sidebar activePage="projects" />

      <main className="flex-1 flex flex-col md:pl-64 overflow-hidden h-full">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">My Projects</h1>
            <p className="text-xs text-slate-500">Manage your backend projects and open the visual builder.</p>
          </div>
          <button
            className="rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2 text-sm font-bold text-white disabled:opacity-60"
            disabled={isCreating}
            onClick={handleCreateProject}
            type="button"
          >
            {isCreating ? 'Creating...' : 'Create New Project'}
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          <div className="mx-auto max-w-6xl space-y-4">
            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
              <input
                className="min-w-[260px] flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search projects"
                type="text"
                value={searchQuery}
              />
              <select
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                onChange={(event) => setStatusFilter(event.target.value)}
                value={statusFilter}
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
              <button
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700"
                onClick={loadProjects}
                type="button"
              >
                Refresh
              </button>
            </div>

            {actionError ? <p className="text-sm font-medium text-red-600">{actionError}</p> : null}

            {loading ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">Loading projects...</div>
            ) : null}

            {!loading && filteredProjects.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
                <p className="text-sm text-slate-500">No projects found.</p>
              </div>
            ) : null}

            {!loading && filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredProjects.map((project) => (
                  <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" key={project.id}>
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h2 className="text-lg font-bold text-slate-900">{project.name}</h2>
                        <p className="text-xs text-slate-500">Created {new Date(project.created_at).toLocaleString()}</p>
                      </div>
                      <span
                        className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
                          project.is_published ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {project.is_published ? 'Published' : 'Draft'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white"
                        onClick={() => handleEditProject(project.id)}
                        type="button"
                      >
                        Open Builder
                      </button>
                      <button
                        className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-bold text-white"
                        onClick={() => handlePublishProject(project.id)}
                        type="button"
                      >
                        Publish
                      </button>
                      <button
                        className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700"
                        onClick={() => navigate(`/dashboard?projectId=${project.id}`)}
                        type="button"
                      >
                        Edit Layout
                      </button>
                      <button
                        className="rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-600"
                        onClick={() => handleDeleteProject(project.id)}
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyProjects;
