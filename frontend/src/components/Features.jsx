import React from 'react';

const FeatureCard = ({ icon, title, description, colorClass }) => (
  <div className="group p-10 rounded-[1.5rem] bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-300">
    <div className={`w-16 h-16 rounded-2xl ${colorClass}/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
      <span className={`material-symbols-outlined ${colorClass.replace('bg-', 'text-')} text-3xl`}>{icon}</span>
    </div>
    <h3 className="text-2xl font-bold text-on-surface mb-4">{title}</h3>
    <p className="text-on-surface-variant leading-relaxed">{description}</p>
  </div>
);

const Features = () => {
  return (
    <section className="py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-8">
        <div className="max-w-3xl mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-background mb-6">
            Redefining Creation
          </h2>
          <p className="text-xl text-on-surface-variant">
            We removed the boundaries between your imagination and the web. Tools that feel like an extension of your hands.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon="drag_indicator" 
            title="Drag & Drop Builder" 
            description="Arrange pixel-perfect components with a fluid engine that respects your creative intent instantly."
            colorClass="text-primary"
          />
          <FeatureCard 
            icon="visibility" 
            title="Real-time Preview" 
            description="See your changes live as you make them. No refreshes, no delays, just instant visual feedback."
            colorClass="text-secondary"
          />
          <FeatureCard 
            icon="rocket_launch" 
            title="One-Click Publishing" 
            description="Deploy your masterpiece to a global edge network with a single click. Fast, secure, and always online."
            colorClass="text-tertiary"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
