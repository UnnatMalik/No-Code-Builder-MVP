import React from 'react';

const CTA = () => {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-8">
        <div className="relative bg-inverse-surface rounded-[3rem] p-12 md:p-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent"></div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-8">
              Ready to architect your digital future?
            </h2>
            <p className="text-xl text-slate-300 mb-10">
              Join thousands of designers and entrepreneurs building high-performance websites without touching a single line of code.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-transform">
                Start Building Now
              </button>
              <button className="text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
                Compare Plans
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
