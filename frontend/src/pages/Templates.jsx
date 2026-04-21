import React from 'react';
import Sidebar from '../components/Sidebar';

const Templates = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface text-on-surface absolute top-0 left-0 z-50 antialiased">
      <Sidebar activePage="templates" />

      <main className="flex-1 flex flex-col md:pl-64 overflow-hidden h-full bg-[#f8fafc]">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 flex items-center justify-between px-8 z-30 sticky top-0">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Templates</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-[1400px] mx-auto">

            {/* Filter Chips */}
            <div className="flex gap-3 mb-10 overflow-x-auto pb-2 no-scrollbar">
              <button className="px-6 py-2.5 bg-slate-800 text-white rounded-full text-sm font-bold shadow-md whitespace-nowrap">All Templates</button>
              <button className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-sm font-bold transition-colors whitespace-nowrap">Landing Pages</button>
              <button className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-sm font-bold transition-colors whitespace-nowrap">Portfolios</button>
              <button className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-sm font-bold transition-colors whitespace-nowrap">SaaS Dashboards</button>
              <button className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-sm font-bold transition-colors whitespace-nowrap">Blogs</button>
              <button className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-sm font-bold transition-colors whitespace-nowrap">E-commerce</button>
              <button className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-sm font-bold transition-colors whitespace-nowrap">Misc</button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 relative z-10">

              {/* Card 1 */}
              <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col relative z-20">
                <div className="relative h-60 bg-gradient-to-br from-slate-200 to-slate-300 rounded-t-[2rem] p-6 flex items-center justify-center overflow-visible">
                  {/* Decorative card abstract */}
                  <div className="w-48 h-32 bg-white shadow-lg transform -rotate-12 rounded-lg blur-[1px]"></div>

                  {/* Badge */}
                  <div className="absolute top-5 left-5 bg-indigo-500 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full tracking-widest uppercase shadow-sm z-10">NEW</div>

                  {/* Floating Action Pill overlapping cards */}
                  <div className="absolute top-1/2 -right-12 translate-y-8 bg-white/90 backdrop-blur-xl rounded-full pl-3 pr-6 py-2.5 hidden lg:flex items-center gap-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-white/50 whitespace-nowrap z-50 transform hover:scale-105 transition-transform duration-300 cursor-pointer">

                  </div>
                </div>
                {/* Body */}
                <div className="p-8 flex-1 flex flex-col bg-white rounded-b-[2rem] relative z-10">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-indigo-600 tracking-wide">Blog</span>
                    <span className="text-xs font-bold text-slate-600 flex items-center gap-1"><span className="material-symbols-outlined text-[14px] text-slate-400" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 4.9</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3 tracking-tight">Editorial Flux</h3>
                  <p className="text-sm text-slate-500 line-clamp-2 h-10 mb-8 leading-relaxed">A clean typography-led blog template for thought leaders and researchers.</p>

                  <div className="flex justify-between items-center py-5 border-t border-b border-slate-100 mb-8 mt-auto">
                    <div className="text-center">
                      <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Pages</p>
                      <p className="text-base font-bold text-slate-800">12</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Items</p>
                      <p className="text-base font-bold text-slate-800">45</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Setup</p>
                      <p className="text-base font-bold text-slate-800">~5m</p>
                    </div>
                  </div>

                  <button className="w-full py-3.5 bg-slate-100 hover:bg-slate-200/80 text-indigo-600 font-bold rounded-xl transition-colors text-sm">Use Template</button>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col relative z-0 mt-8 md:mt-0">
                <div className="relative h-60 bg-slate-800 rounded-t-[2rem] p-6 flex items-center justify-center overflow-hidden">
                  <div className="w-32 h-44 bg-slate-900 rounded-xl shadow-2xl border border-slate-700 flex flex-col items-center pt-8 relative">
                    <div className="w-16 h-2 bg-slate-700 rounded-full mb-4"></div>
                    <div className="w-20 h-2 bg-slate-700/50 rounded-full mb-8"></div>
                    <div className="w-24 h-16 bg-orange-500/80 rounded-t-full shadow-[0_0_20px_rgba(249,115,22,0.4)]"></div>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-5 left-5 bg-purple-500 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full tracking-widest uppercase shadow-sm">POPULAR</div>
                </div>
                {/* Body */}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-purple-600 tracking-wide">E-commerce</span>
                    <span className="text-xs font-bold text-slate-600 flex items-center gap-1"><span className="material-symbols-outlined text-[14px] text-slate-400" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 5.0</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3 tracking-tight">Luxe Market</h3>
                  <p className="text-sm text-slate-500 line-clamp-2 h-10 mb-8 leading-relaxed">High-end product showcase with sleek cart interactions and filtering.</p>

                  <div className="flex justify-between items-center py-5 border-t border-b border-slate-100 mb-8 mt-auto">
                    <div className="text-center">
                      <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Pages</p>
                      <p className="text-base font-bold text-slate-800">24</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Items</p>
                      <p className="text-base font-bold text-slate-800">110</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Setup</p>
                      <p className="text-base font-bold text-slate-800">~15m</p>
                    </div>
                  </div>

                  <button className="w-full py-3.5 bg-slate-100 hover:bg-slate-200/80 text-indigo-600 font-bold rounded-xl transition-colors text-sm">Use Template</button>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col relative z-0 mt-8 xl:mt-0">
                <div className="relative h-60 bg-slate-900 rounded-t-[2rem] p-6 flex items-center justify-center overflow-hidden">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-b from-slate-400 to-slate-700 shadow-2xl relative overflow-hidden ring-4 ring-slate-800">
                    {/* Sphere steps mock */}
                    <div className="absolute top-1/4 left-0 right-0 h-1 bg-black/40 blur-[1px] transform -rotate-12"></div>
                    <div className="absolute top-2/4 left-0 right-0 h-1 bg-black/40 blur-[1px] transform -rotate-12"></div>
                    <div className="absolute top-3/4 left-0 right-0 h-1 bg-black/40 blur-[1px] transform -rotate-12"></div>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-5 left-5 bg-pink-500 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full tracking-widest uppercase shadow-sm">TRENDING</div>
                </div>
                {/* Body */}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-pink-500 tracking-wide">Agency</span>
                    <span className="text-xs font-bold text-slate-600 flex items-center gap-1"><span className="material-symbols-outlined text-[14px] text-slate-400" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 4.8</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3 tracking-tight">Studio Nexus</h3>
                  <p className="text-sm text-slate-500 line-clamp-2 h-10 mb-8 leading-relaxed">A bold dark-themed portfolio for studios looking to make a massive impact.</p>

                  <div className="flex justify-between items-center py-5 border-t border-b border-slate-100 mb-8 mt-auto">
                    <div className="text-center">
                      <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Pages</p>
                      <p className="text-base font-bold text-slate-800">8</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Items</p>
                      <p className="text-base font-bold text-slate-800">32</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Setup</p>
                      <p className="text-base font-bold text-slate-800">~2m</p>
                    </div>
                  </div>

                  <button className="w-full py-3.5 bg-slate-100 hover:bg-slate-200/80 text-indigo-600 font-bold rounded-xl transition-colors text-sm">Use Template</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Templates;
