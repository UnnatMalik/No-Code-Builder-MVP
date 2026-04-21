import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const projectsData = [
  {
    id: 1,
    name: "E-Commerce Redesign 2024",
    date: "Jan 15, 2024",
    status: "Published",
    statusColor: "emerald-500",
    pages: "5",
    components: "12",
    edited: "Edited 2 hours ago",
    modifiedTimeStamp: new Date(Date.now() - 2 * 60 * 60 * 1000).getTime(), // 2 hours ago
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdsPuiOKr-6t7wG6Nv-ca-EQSTKb6wfwEGwRulGkgtsRo0IgFV8t4u2UYXZ8HH4hq1p1XbD7cRUD4Y892I8Ye2c5wX5ElAcUR6LnvoEEJFIHrkJNwn8ZSbzsMFrGhs2_0xp2oQgU64OJjO-IO7HblNWJDEOJUky7FZBVQ0_m7geOcuN-DexGKKOl9tb4sVLFinREvm6hmzAUFk7TuwC0DmAQKnuwlZP5RWpRTF1JNkty-KQRnZ3Bzr7eyNjJXQ_GbBnFVEbOKvVP0",
    liked: true,
    imageAlt: "clean minimalist SaaS dashboard design layout with vibrant blue accents on a desktop screen"
  },
  {
    id: 2,
    name: "Marketing Landing Page",
    date: "Feb 02, 2024",
    status: "Draft",
    statusColor: "amber-500",
    pages: "1",
    components: "8",
    edited: "Edited 5 mins ago",
    modifiedTimeStamp: new Date(Date.now() - 5 * 60 * 1000).getTime(), // 5 mins ago
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZtbeEfI_mEayitEb2asb5IRqsPbuVhgTgKj8j2FCfJLVg_TUaNw9bGQK1wV4-PABjtEODU0Z5O6y_7y0gWZJ4fGrwoTZQO0fdhx1M54XDvR7SF2Tm3m-pZSSiJFO5nOlVmVEe94J6cfbTGhByIaIJSEN-b7zmCCdX5xvGU1iTUTOldzuJ200u4ofNk2muQlD7Ee_gZNrZpXDjNLepTWx63Qn54AOVuMMJgqb2OOabrOA8cd89-hpVvyFut6LwA0sqjseDYUSOvAA",
    liked: false,
    imageAlt: "professional analytics dashboard with colorful data visualizations and clean white layout"
  },
  {
    id: 3,
    name: "Portfolio 2.0",
    date: "Dec 12, 2023",
    status: "Published",
    statusColor: "indigo-600",
    pages: "3",
    components: "24",
    edited: "Edited yesterday",
    modifiedTimeStamp: new Date(Date.now() - 24 * 60 * 60 * 1000).getTime(), // yesterday
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNvckNWmuPXSbpmK8PouqL-yisuqqcnv91R9Nb7Gfo0lgTjkCIpbsQgSYMhllEJbDfU9PX9Iw48c2S_ESemEaKuw-mmDNxo3dTKu9LGD0Z8RWGQKWawftHlisN104U7jldxp2eR9Rj-Y62LkqRXSA-09M3FqrrTEzATwIHPfYJuaFUZAdg2lbdjDWxPFsclyBbhYd5sbaRyTzNSJuXQ3biRwszcEU3g5z88mCLBeHk-GaBGGk1uOD1wi57xTRmmA7y5Ij4ct8eyqw",
    liked: true,
    imageAlt: "vibrant portfolio website design for a creative agency with bold typography and high-end imagery"
  }
];

const MyProjects = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = React.useState('grid');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('All Status');
  const [sortBy, setSortBy] = React.useState('Last Modified');

  const filteredAndSortedProjects = React.useMemo(() => {
    return projectsData
      .filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All Status' || project.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'Name') {
          return a.name.localeCompare(b.name);
        } else if (sortBy === 'Creation Date') {
          return new Date(b.date) - new Date(a.date);
        } else {
          return b.modifiedTimeStamp - a.modifiedTimeStamp;
        }
      });
  }, [searchQuery, statusFilter, sortBy]);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface text-on-surface absolute top-0 left-0 z-50 antialiased">
      {/* SideNavBar Component (Fixed Left) */}
      <Sidebar activePage="projects" />
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col md:pl-64 overflow-hidden h-full">
        {/* TopAppBar Component */}
        <header className="h-16 flex justify-between items-center w-full px-6 bg-surface/80 backdrop-blur-[20px] z-40 sticky top-0 shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg z-10 pointer-events-none">search</span>
              <input className="w-full pl-10 pr-4 py-2 bg-slate-100 hover:bg-slate-200/50 border border-transparent focus:border-indigo-500/30 rounded-full text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner" placeholder="Search for projects..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-500 transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <button className="p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-500 transition-colors">
              <span className="material-symbols-outlined">apps</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-surface-container overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all">
              <img alt="User avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJEcMI3_-P65uwvI9ANz-a7S6a2ISZP8r64gTfZ1Aq5szNdWim8I79IE11rItQ4XaxBFs8V6_mN7eHl8rHzx6hVKyA09WH_5lhM_5G9oUqTZdpgq5E2Q0V7L6jiiZApkgUofdE1zS6yIMGp1kEMB6ALoWtvWsUUzGPk_bK4lylBrx3gq30ON7fv9lYjZbkvzCnw-quW81j3qS0kBTXWxmnaRVdIGdFh4xwAfpflPKM4mZWj3yB4IefHBiS1S5VwASlj9xpAfBF9QE" />
            </div>
          </div>
        </header>

        {/* Dashboard Content Container -> My Projects Design */}
        <div className="flex-1 overflow-y-auto no-scrollbar bg-surface p-6 pb-24 md:pb-6">
          <div className="max-w-7xl mx-auto w-full">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <h2 className="text-[3.5rem] font-extrabold font-headline leading-none tracking-tight text-on-surface mb-2">My Projects</h2>
                <p className="text-on-surface-variant font-medium">12 projects total across your workspace</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-outline-variant hover:bg-surface-container-high transition-all font-semibold text-sm">
                  <span className="material-symbols-outlined text-lg">file_upload</span>
                  Import Project
                </button>
                <button className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-on-primary px-8 py-3 rounded-full font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all text-sm">
                  <span className="material-symbols-outlined text-lg">add_circle</span>
                  Create New Project
                </button>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="flex flex-wrap gap-2 mb-10">
              <div className="flex items-center gap-2 bg-surface-container-lowest px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-bold text-on-surface">12 Active</span>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-lowest px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span className="text-xs font-bold text-on-surface">8 Published</span>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-lowest px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span className="text-xs font-bold text-on-surface">3 Drafts</span>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-lowest px-4 py-2 rounded-full border border-slate-200 shadow-sm opacity-60">
                <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                <span className="text-xs font-bold text-on-surface">1 Archived</span>
              </div>
            </div>

            {/* Filters & Controls */}
            <div className="bg-surface-container-low rounded-2xl p-4 mb-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-[300px]">
                <div className="relative flex-1">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                  <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest rounded-xl border-none text-sm focus:ring-2 focus:ring-primary-container" placeholder="Search projects..." type="text" />
                </div>
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="bg-surface-container-lowest border-none rounded-xl text-sm py-2.5 px-4 pr-10 font-semibold focus:ring-2 focus:ring-primary-container">
                  <option>All Status</option>
                  <option>Published</option>
                  <option>Draft</option>
                  <option>Archived</option>
                </select>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 border-r border-slate-200 pr-4">
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Sort:</span>
                  <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-transparent border-none text-sm py-1 font-bold focus:ring-0 cursor-pointer">
                    <option>Last Modified</option>
                    <option>Name</option>
                    <option>Creation Date</option>
                  </select>
                </div>
                <div className="flex bg-surface-container-high p-1 rounded-lg">
                  <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md shadow-sm transition-colors ${viewMode === 'grid' ? 'bg-surface-container-lowest text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>
                    <span className="material-symbols-outlined">grid_view</span>
                  </button>
                  <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}>
                    <span className="material-symbols-outlined">list</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <input className="rounded text-primary focus:ring-primary-container w-5 h-5 cursor-pointer border-slate-300" id="select-all" type="checkbox" />
                  <label className="text-xs font-bold text-on-surface-variant cursor-pointer" htmlFor="select-all">Select All</label>
                </div>
              </div>
            </div>

            {/* Project Grid / List */}
            <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "flex flex-col gap-4"}>
              {filteredAndSortedProjects.map(project => (
                <div key={project.id} className={`group relative bg-surface-container-lowest overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex ${viewMode === 'grid' ? 'rounded-3xl flex-col' : 'rounded-2xl flex-col sm:flex-row items-center border border-slate-100'}`}>
                  <div className={`relative overflow-hidden bg-slate-100 ${viewMode === 'grid' ? 'h-48' : 'w-full sm:w-64 h-48 sm:h-32 shrink-0'}`}>
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={project.imageAlt} src={project.image} />
                    {viewMode === 'grid' && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <div className="flex gap-2">
                          <button className="p-2 bg-white/90 backdrop-blur rounded-full text-indigo-600 hover:bg-white text-sm">
                            <span className="material-symbols-outlined text-lg">visibility</span>
                          </button>
                          <button className={`p-2 bg-white/90 backdrop-blur rounded-full text-sm ${project.liked ? 'text-indigo-600 hover:bg-white' : 'text-slate-400 hover:text-indigo-600 hover:bg-white'}`}>
                            <span className="material-symbols-outlined text-lg" style={project.liked ? { fontVariationSettings: "'FILL' 1" } : {}}>favorite</span>
                          </button>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className={`bg-${project.statusColor} text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider`}>{project.status}</span>
                    </div>
                  </div>
                  <div className={`p-6 flex-1 flex ${viewMode === 'grid' ? 'flex-col' : 'flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4 sm:gap-6'}`}>
                    <div className={viewMode === 'grid' ? "w-full" : "flex-1"}>
                      <div className={`flex items-start justify-between ${viewMode === 'grid' ? 'mb-4' : ''}`}>
                        <div>
                          <h3 className="text-lg font-bold font-headline text-on-surface leading-tight hover:text-indigo-600 cursor-pointer transition-colors">{project.name}</h3>
                          <p className="text-xs text-on-surface-variant font-medium mt-1">Created {project.date}</p>
                        </div>
                        {viewMode === 'grid' && (
                          <button className="p-1 hover:bg-surface-container rounded-lg text-slate-400">
                            <span className="material-symbols-outlined">more_vert</span>
                          </button>
                        )}
                      </div>
                      
                      <div className={`flex items-center gap-6 ${viewMode === 'grid' ? 'mb-6' : 'mt-4 sm:mt-2'}`}>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-indigo-400 text-lg">description</span>
                          <span className="text-xs font-bold text-on-surface">{project.pages} Pages</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-indigo-400 text-lg">extension</span>
                          <span className="text-xs font-bold text-on-surface">{project.components} Components</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`${viewMode === 'grid' ? 'mt-auto flex items-center justify-between' : 'flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto h-full space-y-0 sm:space-y-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100'}`}>
                      <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container-low px-2 py-1 rounded">{project.edited}</span>
                      <div className="flex items-center gap-2">
                         <button className="px-5 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-xs font-bold hover:shadow-lg hover:shadow-indigo-200 transition-all">Edit Project</button>
                         {viewMode === 'list' && (
                            <button className="p-2 hover:bg-surface-container rounded-lg text-slate-400">
                              <span className="material-symbols-outlined">more_vert</span>
                            </button>
                         )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="mt-12 flex flex-col md:flex-row items-center justify-between py-6 border-t border-outline-variant/20 gap-4">
              <p className="text-sm font-medium text-on-surface-variant">Showing 1-3 of 12 projects</p>
              <div className="flex items-center gap-2">
                <button className="p-2 border border-slate-200 rounded-xl text-slate-400 hover:bg-white transition-all disabled:opacity-50" disabled>
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <div className="flex gap-1">
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold">1</button>
                </div>
                <button className="p-2 border border-slate-200 rounded-xl text-slate-400 hover:bg-white transition-all disabled:opacity-50">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Navigation (BottomNavBar) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 h-16 flex items-center justify-around px-4 z-50">
        <Link to="/dashboard" className="flex flex-col items-center text-slate-400">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-medium mt-1">Home</span>
        </Link>
        <Link to="/projects" className="flex flex-col items-center text-primary">
          <span className="material-symbols-outlined">folder</span>
          <span className="text-[10px] font-bold mt-1">Projects</span>
        </Link>
        <button className="flex items-center justify-center w-12 h-12 bg-gradient-to-tr from-primary to-secondary text-white rounded-full -mt-10 border-4 border-surface shadow-lg">
          <span className="material-symbols-outlined">add</span>
        </button>
        <Link to="#" className="flex flex-col items-center text-slate-400">
          <span className="material-symbols-outlined">auto_awesome_motion</span>
          <span className="text-[10px] font-medium mt-1">Store</span>
        </Link>
        <Link to="#" className="flex flex-col items-center text-slate-400">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-medium mt-1">Menu</span>
        </Link>
      </nav>
    </div>
  );
};

export default MyProjects;
