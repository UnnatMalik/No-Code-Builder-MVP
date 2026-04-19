import React from 'react';

const FloatingToolbar = () => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 glass-panel px-6 py-3 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-white/50 flex items-center gap-6 z-40 md:flex hidden">
      <div className="flex items-center gap-2 pr-6 border-r border-slate-200">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-xs font-bold uppercase tracking-widest text-slate-600">Live Editor</span>
      </div>
      <div className="flex gap-4">
        <button className="p-2 hover:bg-primary-container/20 rounded-lg text-primary transition-colors">
          <span className="material-symbols-outlined">edit</span>
        </button>
        <button className="p-2 hover:bg-primary-container/20 rounded-lg text-primary transition-colors">
          <span className="material-symbols-outlined">layers</span>
        </button>
        <button className="p-2 hover:bg-primary-container/20 rounded-lg text-primary transition-colors">
          <span className="material-symbols-outlined">palette</span>
        </button>
        <button className="p-2 hover:bg-primary-container/20 rounded-lg text-primary transition-colors">
          <span className="material-symbols-outlined">devices</span>
        </button>
      </div>
    </div>
  );
};

export default FloatingToolbar;
