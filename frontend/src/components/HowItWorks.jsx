import React from 'react';

const Step = ({ number, title, description, colorClass }) => (
  <div className="relative z-10 text-center">
    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${colorClass} text-on-primary text-3xl font-extrabold mb-8 shadow-xl shadow-primary/20`}>
      {number}
    </div>
    <h3 className="text-2xl font-bold text-on-surface mb-4">{title}</h3>
    <p className="text-on-surface-variant">{description}</p>
  </div>
);

const HowItWorks = () => {
  return (
    <section className="py-32 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center max-w-2xl mx-auto mb-24">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-background mb-6">
            The 3-Step Journey
          </h2>
          <p className="text-lg text-on-surface-variant">
            Go from concept to live URL faster than you can brew a coffee.
          </p>
        </div>
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          <Step 
            number="1" 
            title="Choose Components" 
            description="Browse our library of premium, responsive blocks tailored for any use case."
            colorClass="bg-primary"
          />
          <Step 
            number="2" 
            title="Customize Design" 
            description="Fine-tune colors, fonts, and spacing using our intuitive fluid architect workspace."
            colorClass="bg-secondary"
          />
          <Step 
            number="3" 
            title="Publish Live" 
            description="Hit publish and watch your site go live on a lightning-fast custom domain."
            colorClass="bg-tertiary"
          />
          {/* Background Connector Line */}
          <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary via-secondary to-tertiary opacity-20"></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
