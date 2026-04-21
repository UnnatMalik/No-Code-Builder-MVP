import React from 'react';
import Sidebar from '../components/Sidebar';

const PublishedSites = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface text-on-surface absolute top-0 left-0 z-50 antialiased">
      <Sidebar activePage="published" />
      
      <main className="flex-1 flex flex-col md:pl-64 overflow-hidden h-full">
        {/* Top Header */}
        <header className="h-20 bg-white/50 backdrop-blur-md border-b border-slate-200/50 flex items-center justify-between px-8 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Published Sites</h1>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-sm">
              <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 block">public</span>
              <h2 className="text-xl font-bold text-slate-700">No Sites Published Yet</h2>
              <p className="text-slate-500 mt-2">Deploy your first project to see it hosted here globally.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PublishedSites;
