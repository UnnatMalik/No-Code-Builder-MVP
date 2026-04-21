import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center h-20 px-8 max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-white text-lg font-bold leading-none">B</span>
          </div>
          BuildIt
        </Link>
        <div className="hidden md:flex items-center space-x-8 font-headline font-semibold text-sm">
          <Link to="/" className="text-slate-600 hover:text-primary transition-colors duration-200">Features</Link>
          <Link to="/" className="text-slate-600 hover:text-primary transition-colors duration-200">Pricing</Link>
          <Link to="/" className="text-slate-600 hover:text-primary transition-colors duration-200">About</Link>
          <Link to="/login" className="text-slate-600 hover:text-primary transition-colors duration-200">Login</Link>
          <Link to="/signup" className="inline-block bg-gradient-to-r from-primary to-secondary text-on-primary px-6 py-2.5 rounded-full font-bold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200">
            Sign Up
          </Link>
        </div>
        <button className="md:hidden text-slate-600 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </nav>
  );
};


export default Navbar;
