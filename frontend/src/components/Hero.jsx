import React from 'react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-32 bg-surface">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-8 z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-container/20 text-primary font-semibold text-sm tracking-wide uppercase">
            Velocity Flux v2.0
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-on-background leading-[1.1]">
            Build Websites <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Without Code
            </span>
          </h1>
          <p className="text-xl text-on-surface-variant max-w-xl leading-relaxed">
            Drag, drop, and publish beautiful websites in minutes. Experience the fluid architecture of the world's most intuitive design engine.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-gradient-to-r from-primary to-secondary text-on-primary px-8 py-4 rounded-full font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-primary/20">
              Start Building
            </button>
            <button className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg text-primary border border-primary/20 hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
              Watch Demo
            </button>
          </div>
        </div>
        <div className="lg:col-span-6 relative">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-12 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
          <div className="relative bg-surface-container-lowest rounded-[2rem] shadow-[0_40px_80px_rgba(44,47,49,0.12)] p-4 border border-outline-variant/10">
            <img 
              alt="BuildIt Interface" 
              className="rounded-[1.5rem] w-full" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_Vk-IUT4u0V80pCvs50GWX2_-8yMzo9OkNc587l6VxhhfwDpQZLxd1lvB-BLpSSdvTYuLO-37d22W830nkZwZouES5D76oFsLqSYblJp7waXgW0XKCfAvl8savOBACWYpNKGRPssX6dSeRzHLyjJGv3Dey4pWAdxoNwRxfORz62zfhMtVuy-YeywKfPHJRxfLVe0aFhSk0B1HNyHq0JilJ0a5bXgl_PhyIIvoY0UGcvUNJCZPpTRuUznakrD9mmQH2Ze7v7O5Bqs" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
