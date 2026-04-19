import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-12 bg-slate-100 dark:bg-slate-900 tonal-shift-no-border">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="space-y-6">
          <div className="text-xl font-bold text-slate-900 dark:text-white">BuildIt</div>
          <p className="font-body text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Empowering the next generation of digital creators with tools that make the impossible simple.
          </p>
          <div className="flex gap-4">
            <a className="text-slate-400 hover:text-primary transition-colors" href="#">
              <span className="material-symbols-outlined">public</span>
            </a>
            <a className="text-slate-400 hover:text-primary transition-colors" href="#">
              <span className="material-symbols-outlined">alternate_email</span>
            </a>
            <a className="text-slate-400 hover:text-primary transition-colors" href="#">
              <span className="material-symbols-outlined">hub</span>
            </a>
          </div>
        </div>
        {/* Product Links */}
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider">Product</h4>
          <ul className="space-y-4 font-body text-sm text-slate-500 dark:text-slate-400">
            <li><a className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200" href="#">Features</a></li>
            <li><a className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200" href="#">Templates</a></li>
            <li><a className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200" href="#">Integrations</a></li>
            <li><a className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200" href="#">Pricing</a></li>
          </ul>
        </div>
        {/* Support Links */}
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider">Support</h4>
          <ul className="space-y-4 font-body text-sm text-slate-500 dark:text-slate-400">
            <li><a className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200" href="#">Privacy Policy</a></li>
            <li><a className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200" href="#">Terms of Service</a></li>
            <li><a className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200" href="#">Cookie Policy</a></li>
            <li><a className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200" href="#">Support</a></li>
          </ul>
        </div>
        {/* Newsletter Column */}
        <div className="space-y-6">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider">Stay Updated</h4>
          <p className="font-body text-sm text-slate-500 dark:text-slate-400">Join our newsletter for latest updates and design tips.</p>
          <div className="relative">
            <input 
              className="w-full bg-surface-container-high border-none rounded-full px-6 py-3 text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400" 
              placeholder="Email address" 
              type="email" 
            />
            <button className="absolute right-1 top-1 bg-primary text-on-primary w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-body text-sm text-slate-500 dark:text-slate-400">© 2024 BuildIt. All rights reserved.</p>
        <div className="flex gap-6">
          <span className="text-xs text-slate-400">System Status: Operational</span>
          <span className="text-xs text-slate-400">v2.4.0-stable</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
