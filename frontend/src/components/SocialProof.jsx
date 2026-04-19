import React from 'react';

const SocialProof = () => {
  return (
    <section className="py-12 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-8">
        <p className="text-center text-sm font-semibold text-on-surface-variant uppercase tracking-[0.2em] mb-10">
          Trusted by 10,000+ creators
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="text-2xl font-bold flex items-center gap-2">
            Nexus<span className="w-2 h-2 bg-primary rounded-full"></span>
          </div>
          <div className="text-2xl font-bold italic tracking-tighter">Velocity</div>
          <div className="text-2xl font-headline font-extrabold text-secondary">Aura</div>
          <div className="text-2xl font-medium tracking-widest border-2 border-on-surface px-2">KINETIC</div>
          <div className="text-2xl font-bold opacity-80">SynthUI</div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
