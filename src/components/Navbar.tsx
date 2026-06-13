/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'playroom', label: 'Playroom' },
    { id: 'testimonials', label: 'Guestbook' },
    { id: 'contact', label: 'Contact' },
    { id: 'projects', label: 'Work' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple intersection resolver
      const scrollPos = window.scrollY + 120;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav
        id="app-navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <span 
              onClick={() => scrollToSection('home')} 
              className="text-xl font-display font-bold tracking-tight text-white cursor-pointer select-none flex items-center gap-1.5"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse"></div>
              rohini<span className="text-brand-blue font-serif italic font-normal">.create</span>
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`relative text-[14px] tracking-wide font-medium transition-colors cursor-pointer ${
                      activeSection === item.id ? 'text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-blue to-brand-cyan rounded-full"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>

            {/* Let's Create Button */}
            <button
              onClick={() => scrollToSection('contact')}
              className="px-4 py-2 bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-xs font-mono font-bold tracking-widest rounded-full shadow-md hover:scale-105 active:scale-95 transition-all uppercase cursor-pointer"
            >
              let's create
            </button>
          </div>

          {/* Mobile Hamburg Trigger */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Quick Mobile "let's create" Button */}
            <button
              onClick={() => scrollToSection('contact')}
              className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-mono font-bold uppercase transition-all active:scale-95 cursor-pointer"
            >
              let's create
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-400 hover:text-white focus:outline-none focus:ring-1 focus:ring-brand-cyan rounded"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-40 glass-panel border-b border-white/10 shadow-2xl p-6 md:hidden flex flex-col gap-6"
          >
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left py-2 text-lg font-medium tracking-wide border-b border-white/5 transition-colors ${
                      activeSection === item.id ? 'text-brand-cyan font-semibold' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
