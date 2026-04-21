import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface text-on-surface absolute top-0 left-0 z-50 antialiased">
      {/* SideNavBar Component (Fixed Left) */}
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
          {/* Dashboard Active */}
          <Link className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm rounded-lg font-['Plus_Jakarta_Sans'] text-sm font-medium transition-transform duration-200 hover:translate-x-1" to="/dashboard">
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-indigo-500 font-['Plus_Jakarta_Sans'] text-sm font-medium transition-transform duration-200 hover:translate-x-1" to="/projects">
            <span className="material-symbols-outlined">folder</span>
            <span>My Projects</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-indigo-500 font-['Plus_Jakarta_Sans'] text-sm font-medium transition-transform duration-200 hover:translate-x-1" to="#">
            <span className="material-symbols-outlined">auto_awesome_motion</span>
            <span>Templates</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-indigo-500 font-['Plus_Jakarta_Sans'] text-sm font-medium transition-transform duration-200 hover:translate-x-1" to="#">
            <span className="material-symbols-outlined">public</span>
            <span>Published Sites</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-indigo-500 font-['Plus_Jakarta_Sans'] text-sm font-medium transition-transform duration-200 hover:translate-x-1" to="#">
            <span className="material-symbols-outlined">settings</span>
            <span>Settings</span>
          </Link>
        </nav>
        {/* CTA */}
        <div className="mt-4 space-y-2">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-headline text-sm font-bold shadow-lg hover:shadow-indigo-500/20 transition-all transform hover:scale-[1.02] active:scale-95">
            <span className="material-symbols-outlined">add_circle</span>
            <span>Create New Project</span>
          </button>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-headline text-sm font-bold transition-all">
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col md:pl-64 overflow-hidden h-full">
        {/* TopAppBar Component */}
        <header className="h-16 flex justify-between items-center w-full px-6 bg-surface/80 backdrop-blur-[20px] z-40 sticky top-0 shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
              <input className="w-full pl-10 pr-4 py-2 bg-slate-100/50 dark:bg-slate-800/50 border-none rounded-full text-sm font-body focus:ring-2 focus:ring-primary-container transition-all" placeholder="Search for projects..." type="text" />
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

        {/* Dashboard Content Container */}
        <div className="flex-1 overflow-y-auto no-scrollbar bg-surface p-6 pb-24 md:pb-6">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
            {/* Main Canvas (Left/Center) */}
            <div className="flex-1 space-y-10">
              {/* Welcome Message */}
              <section>
                <h2 className="text-3xl font-bold tracking-tight text-on-surface mb-1">Welcome back, Alex</h2>
                <p className="text-on-surface-variant text-sm font-medium">Your projects are growing. 4 new views today.</p>
              </section>

              {/* Stat Cards Grid */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-slate-100 group hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-primary-container/20 text-primary rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined">folder</span>
                    </div>
                    <span className="text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded-full">+2 this mo</span>
                  </div>
                  <h3 className="text-2xl font-bold text-on-surface">12</h3>
                  <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Total Projects</p>
                </div>
                <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-slate-100 group hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-secondary-container/20 text-secondary rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined">public</span>
                    </div>
                    <span className="text-xs font-bold text-secondary px-2 py-1 bg-secondary/10 rounded-full">Live</span>
                  </div>
                  <h3 className="text-2xl font-bold text-on-surface">8</h3>
                  <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Published Sites</p>
                </div>
                <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-slate-100 group hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-tertiary-container/20 text-tertiary rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined">visibility</span>
                    </div>
                    <span className="text-xs font-bold text-tertiary px-2 py-1 bg-tertiary/10 rounded-full">Trending</span>
                  </div>
                  <h3 className="text-2xl font-bold text-on-surface">1.2k</h3>
                  <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Total Views</p>
                </div>
                <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-slate-100 group hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 bg-error-container/20 text-error rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined">cloud_done</span>
                    </div>
                    <span className="text-xs font-bold text-on-surface">7.5 / 10 GB</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden mt-6 mb-2">
                    <div className="h-full bg-gradient-to-r from-primary to-secondary w-3/4 rounded-full"></div>
                  </div>
                  <p className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">Storage Used (75%)</p>
                </div>
              </section>

              {/* Recent Projects Section */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-on-surface">Recent Projects</h3>
                  <a className="text-sm font-bold text-primary hover:underline underline-offset-4 flex items-center gap-1" href="#">
                    View All
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="group bg-surface-container-lowest rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all">
                    <div className="relative h-48 bg-slate-100 overflow-hidden">
                      <img alt="Project thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfZFjLtD4sQJQioRisegRp6gTh8zTkP6JB5V1sem2-2kYsh0VOrjCGwLtzWuj3QDxgWYDhWqnUOrIDc83W18KqajTNIp74e2YoKI-kQjoEp9z2rhRc6rbATTLufiD2pguiWssuv5lvr-5EdieNK4y47NVC5IU1odrrPRc781PveiYLJP7MBa_8LuSbAhwSYdf0NvC6kahT_1qotIjg40Ym9EiO68nTbj1KU7z49BNEwG-jcugn0XA8ZdSBxx835yBJ_C39b46dQw8" />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                        <span className="text-[10px] font-bold text-secondary flex items-center gap-1 uppercase tracking-tight">
                          <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse"></span>
                          Published
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-headline font-bold text-on-surface text-lg">Portfolio v2</h4>
                          <p className="text-sm text-on-surface-variant">Last edited: 2 hours ago</p>
                        </div>
                        <button className="p-1 hover:bg-surface-container rounded-lg transition-colors">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-surface-container-lowest rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all">
                    <div className="relative h-48 bg-slate-100 overflow-hidden">
                      <img alt="Project thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC03opMvEez2D1xGGuVfLPvTgVK1t0arhfmtunFWLeryRYW0lTO40g7_LfRyxTj7IHshhzdh8VOqfnK_djxq-NP6UXJbFY-fYrhYLGhjEhw9pCBcn8mkSNb5IdRr9QHNg6ngosP_iP8TArQ9cS0MMkLPRGfHeetKyv1xZgKQXGaKlhALZhvNzoX9O0K-XQnJjOYE3PHt6n90UFMnr3J1vr7RR3vz9O805OqaLN4M3JexkwnggnADYj4RjcMN7YFXbhMgHXRpdytTls" />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                        <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1 uppercase tracking-tight">
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                          Draft
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-headline font-bold text-on-surface text-lg">E-commerce Store</h4>
                          <p className="text-sm text-on-surface-variant">Last edited: 2 days ago</p>
                        </div>
                        <button className="p-1 hover:bg-surface-container rounded-lg transition-colors">
                          <span className="material-symbols-outlined">more_vert</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Skeleton Card (Loading State) */}
                  <div className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-slate-100 opacity-60">
                    <div className="h-48 bg-surface-container-high animate-pulse"></div>
                    <div className="p-5 space-y-3">
                      <div className="h-6 w-3/4 bg-surface-container-high animate-pulse rounded-full"></div>
                      <div className="h-4 w-1/2 bg-surface-container-high animate-pulse rounded-full"></div>
                    </div>
                  </div>
                  {/* Skeleton Card 2 */}
                  <div className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-slate-100 opacity-60">
                    <div className="h-48 bg-surface-container-high animate-pulse"></div>
                    <div className="p-5 space-y-3">
                      <div className="h-6 w-3/4 bg-surface-container-high animate-pulse rounded-full"></div>
                      <div className="h-4 w-1/2 bg-surface-container-high animate-pulse rounded-full"></div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Action Panel */}
            <aside className="w-full lg:w-80 space-y-8">
              {/* Quick Actions Section */}
              <section className="bg-surface-container-low rounded-2xl p-6">
                <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-surface-container-lowest text-on-surface border border-slate-200 rounded-xl transition-all shadow-sm group">
                    <span className="flex items-center gap-3 font-medium">
                      <span className="material-symbols-outlined text-primary">auto_awesome</span>
                      Start from Template
                    </span>
                    <span className="material-symbols-outlined text-slate-300 group-hover:translate-x-1 transition-transform">chevron_right</span>
                  </button>
                  <button className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-surface-container-lowest text-on-surface border border-slate-200 rounded-xl transition-all shadow-sm group">
                    <span className="flex items-center gap-3 font-medium">
                      <span className="material-symbols-outlined text-secondary">upload_file</span>
                      Import Project
                    </span>
                    <span className="material-symbols-outlined text-slate-300 group-hover:translate-x-1 transition-transform">chevron_right</span>
                  </button>
                </div>
              </section>

              {/* Activity Feed */}
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest">Recent Activity</h3>
                  <button className="text-xs font-bold text-primary">Clear all</button>
                </div>
                <div className="relative space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-surface-container">
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary-container flex items-center justify-center ring-4 ring-surface z-10">
                      <span className="material-symbols-outlined text-[14px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_upload</span>
                    </div>
                    <p className="text-sm text-on-surface font-semibold">Published Portfolio v2</p>
                    <p className="text-xs text-on-surface-variant">12 minutes ago</p>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-secondary-container flex items-center justify-center ring-4 ring-surface z-10">
                      <span className="material-symbols-outlined text-[14px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>edit_note</span>
                    </div>
                    <p className="text-sm text-on-surface font-semibold">Edited Home page</p>
                    <p className="text-xs text-on-surface-variant">1 hour ago</p>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center ring-4 ring-surface z-10">
                      <span className="material-symbols-outlined text-[14px] text-on-surface-variant" style={{ fontVariationSettings: "'FILL' 1" }}>person_add</span>
                    </div>
                    <p className="text-sm text-on-surface font-semibold">New collaborator added</p>
                    <p className="text-xs text-on-surface-variant">4 hours ago</p>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-tertiary-container flex items-center justify-center ring-4 ring-surface z-10">
                      <span className="material-symbols-outlined text-[14px] text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </div>
                    <p className="text-sm text-on-surface font-semibold">Project 'SaaS Landing' favorited</p>
                    <p className="text-xs text-on-surface-variant">Yesterday</p>
                  </div>
                </div>
              </section>

              {/* Upgrade Promo */}
              <section className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white overflow-hidden relative group">
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <span className="material-symbols-outlined !text-9xl">workspace_premium</span>
                </div>
                <h4 className="text-lg font-bold mb-2">Team Collaboration</h4>
                <p className="text-indigo-100 text-xs mb-6">Invite up to 5 members to your workspace with the Team Plan.</p>
                <button className="bg-white text-indigo-600 px-4 py-2 rounded-full text-xs font-bold hover:bg-indigo-50 transition-colors">Upgrade Now</button>
              </section>
            </aside>
          </div>
        </div>
      </main>

      {/* Mobile Navigation (BottomNavBar) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 h-16 flex items-center justify-around px-4 z-50">
        <button className="flex flex-col items-center text-primary">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-bold mt-1">Home</span>
        </button>
        <button className="flex flex-col items-center text-slate-400">
          <span className="material-symbols-outlined">folder</span>
          <span className="text-[10px] font-medium mt-1">Projects</span>
        </button>
        <button className="flex items-center justify-center w-12 h-12 bg-gradient-to-tr from-primary to-secondary text-white rounded-full -mt-10 border-4 border-surface shadow-lg">
          <span className="material-symbols-outlined">add</span>
        </button>
        <button className="flex flex-col items-center text-slate-400">
          <span className="material-symbols-outlined">auto_awesome_motion</span>
          <span className="text-[10px] font-medium mt-1">Store</span>
        </button>
        <button className="flex flex-col items-center text-slate-400">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-medium mt-1">Menu</span>
        </button>
      </nav>
    </div>
  );
};

export default Dashboard;
