import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur-xl border-b border-white/5 shadow-lg">
      <div className="flex justify-between items-center h-20 px-8 max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold tracking-tight text-white">BuildIt</Link>
        <div className="hidden md:flex items-center space-x-8 font-headline font-semibold text-sm">
          <Link to="/" className="text-slate-300 hover:text-white transition-colors duration-200">Features</Link>
          <Link to="/" className="text-slate-300 hover:text-white transition-colors duration-200">Pricing</Link>
          <Link to="/" className="text-slate-300 hover:text-white transition-colors duration-200">About</Link>
          <Link to="/login" className="text-slate-300 hover:text-white transition-colors duration-200">Login</Link>
          <button className="bg-gradient-to-r from-primary to-secondary text-on-primary px-6 py-2.5 rounded-full font-bold hover:scale-[1.02] active:scale-[0.98] transition-transform">
            Get Started Free
          </button>
        </div>
        <button className="md:hidden text-slate-300 hover:text-white">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </nav>
  );
};


export default Navbar;
