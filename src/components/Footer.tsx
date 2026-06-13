/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-bg-primary border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Branding */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span 
            onClick={handleScrollTop}
            className="text-lg font-display font-bold tracking-tight text-white cursor-pointer select-none flex items-center gap-1"
          >
            <div className="w-2 h-2 rounded-full bg-brand-cyan"></div>
            rohini<span className="text-brand-blue font-serif italic font-normal">.create</span>
          </span>
          <p className="text-[10px] font-mono text-slate-500 mt-1 uppercase tracking-widest leading-none">
            Creative Frontends & systems // Ver. 2026.06
          </p>
        </div>

        {/* Legal and system statuses */}
        <div className="text-center md:text-right flex flex-col items-center md:items-end gap-2 text-[11px] font-mono text-slate-500">
          <span className="flex items-center gap-1 text-slate-450 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
            Designed & Built with absolute precision in Google AI Studio
          </span>
          <p className="mt-0.5">
            &copy; {currentYear} Rohini Dixit. All rights reserved globally.
          </p>
        </div>

        {/* Back to Top */}
        <button
          onClick={handleScrollTop}
          className="p-3 rounded-xl bg-slate-900 border border-white/5 hover:border-brand-cyan/40 text-slate-400 hover:text-white transition-all cursor-pointer shadow-md scroll-top-trigger flex items-center justify-center hover:-translate-y-0.5"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

      </div>
    </footer>
  );
}
