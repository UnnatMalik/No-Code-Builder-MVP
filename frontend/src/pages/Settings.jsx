import React from 'react';
import Sidebar from '../components/Sidebar';

const Settings = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface text-on-surface absolute top-0 left-0 z-50 antialiased">
      <Sidebar activePage="settings" />
      
      <main className="flex-1 flex flex-col md:pl-64 overflow-hidden h-full">
        {/* Top Header */}
        <header className="h-20 bg-white/50 backdrop-blur-md border-b border-slate-200/50 flex items-center justify-between px-8 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Settings</h1>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="p-12 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-2xl">
              <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 block">settings</span>
              <h2 className="text-xl font-bold text-slate-700 mb-6">Account Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Display Name</label>
                  <input type="text" defaultValue="Alex Chen" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Email Address</label>
                  <input type="email" defaultValue="alex@example.com" disabled className="mt-1 block w-full rounded-md border-slate-300 shadow-sm sm:text-sm p-3 border bg-slate-50 text-slate-500" />
                </div>
                <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded font-medium hover:bg-indigo-700">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
