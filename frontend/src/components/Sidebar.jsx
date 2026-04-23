import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
  { id: 'projects', label: 'My Projects', icon: 'folder', path: '/projects' },
  { id: 'templates', label: 'Templates', icon: 'auto_awesome_motion', path: '/templates' },
  { id: 'published', label: 'Published Sites', icon: 'public', path: '/published' },
  { id: 'settings', label: 'Settings', icon: 'settings', path: '/settings' },
];

const Sidebar = ({ activePage }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCreateProject = () => {
    navigate('/projects');
  };

  return (
    <aside className="hidden md:flex flex-col h-full w-64 bg-surface/80 backdrop-blur-[20px] border-r border-slate-200/50 p-4 z-50 fixed left-0 top-0">
      <div className="mb-8 px-2 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>architecture</span>
        </div>
        <span className="text-2xl font-black text-indigo-600">BuildIt</span>
      </div>
      {/* Profile Section */}
      <div className="mb-6 px-2 flex items-center gap-3">
        <img alt="User profile" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4MNKDIWNB6--vnpIhPBsFRAMTxzpM9DxhNWVjY9h0MqQ0tr3BoL4SZBgJZ1cusse-AstWCnS2OjmHEu3D6Lv9uRxUSBTmrk1LZKx0EmlGCyX1B0ZPMFaGaENj3HZyA3Y00Ln9IOjLzGXMadhi-HFAnMUuUttc-afcFFkySmBqlEFvpUNjOXzqjcKRx93ofXDjth-I7ps7wrYuJFjWlvrCmcf2p_1Gi1ha5uw1CutQ6yXxtNFlBEqJst3IGciYPuDN6wqcSsZ4uHc" />
        <div>
          <p className="font-headline text-sm font-bold text-on-surface">Alex Chen</p>
          <p className="font-headline text-[10px] font-medium text-primary uppercase tracking-wider">Pro Plan</p>
        </div>
      </div>
      {/* Nav Items */}
      <nav className="space-y-1 mb-auto">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <Link 
              key={item.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-['Plus_Jakarta_Sans'] text-sm font-medium transition-transform duration-200 hover:translate-x-1 ${
                isActive 
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-indigo-500'
              }`}
              to={item.path}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      {/* CTA */}
      <div className="mt-4 space-y-2">
        <button onClick={handleCreateProject} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-headline text-sm font-bold shadow-lg hover:shadow-indigo-500/20 transition-all transform hover:scale-[1.02] active:scale-95">
          <span className="material-symbols-outlined">add_circle</span>
          <span>Create New Project</span>
        </button>
        <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-headline text-sm font-bold transition-all">
          <span className="material-symbols-outlined">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
