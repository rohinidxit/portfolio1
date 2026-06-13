/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Terminal, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { rohiniData } from './data';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Playroom from './components/Playroom';
import Projects from './components/Projects';
import Guestbook from './components/Guestbook';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [preloaderText, setPreloaderText] = useState('BOOTING TELEMETRY SYSTEMS...');
  
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [theme]);

  // Auto-counting preloader timeline
  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 200);
          return 100;
        }

        // Cycle through terminal statuses based on progress milestones
        const next = prev + Math.floor(Math.random() * 20) + 10;
        const bounded = Math.min(next, 100);

        if (bounded < 30) {
          setPreloaderText('DECRYPTING INTERACTION BUFFERS...');
        } else if (bounded < 60) {
          setPreloaderText('SYNCHRONIZING GRAPH NODES...');
        } else if (bounded < 90) {
          setPreloaderText('ENGAGING VECTOR ALIGNMENTS...');
        } else {
          setPreloaderText('CONVERGENCE TARGET ESTABLISHED // OK');
        }

        return bounded;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [loading]);

  const activeProfile = rohiniData.profile;

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
    <div className="font-sans antialiased text-slate-350 min-h-screen bg-bg-primary overflow-x-hidden selection:bg-brand-blue/30 selection:text-white">
      
      {/* 1. STYLISH PRELOADER */}
      <AnimatePresence>
        {loading && (
          <motion.div
            id="app-preloader"
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center p-6 text-center select-none"
          >
            {/* Holographic glowing spinning ring */}
            <div className="relative mb-8">
              <div className="w-16 h-16 rounded-full border-4 border-slate-900 border-t-brand-cyan animate-spin" />
              <div className="absolute inset-0 w-16 h-16 rounded-full border border-brand-blue/20 animate-pulse glow-cyan flex items-center justify-center">
                <Terminal className="w-5 h-5 text-brand-cyan" />
              </div>
            </div>

            <div className="flex flex-col gap-2 max-w-sm">
              <span className="text-white font-mono text-sm tracking-wider uppercase font-bold">
                {preloaderText}
              </span>
              
              <div className="w-48 h-1 bg-slate-900 rounded-full overflow-hidden mx-auto mt-2">
                <div 
                  className="h-full bg-gradient-to-r from-brand-blue to-brand-cyan transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">
                OPERATIONAL INDEX: {progress}% // POWERED_BY_AI_STUDIO
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Portfolio Framework */}
      {!loading && (
        <div className="relative flex flex-col min-h-screen">
          
          {/* Navbar component */}
          <Navbar />

          {/* Hero segment */}
          <Hero 
            profile={activeProfile}
            onExploreProjects={handleScrollToProjects}
            onViewContact={handleScrollToContact}
          />

          {/* About section */}
          <About profile={activeProfile} />

          {/* Interactive AI Playroom / Sandbox Section */}
          <Playroom />

          {/* Showcase Projects section with modals */}
          <Projects projects={rohiniData.projects} />

          {/* Cozy Digital Letterbox Interactive Guestbook */}
          <Guestbook />

          {/* Contact split screen form */}
          <Contact 
            profileEmail="rohinidixit218@gmail.com" 
            profilePhone="+91 93436 48744"
            profilePhoneUrl="tel:+919343648744"
            profileLocation="Bhilai, Chhattisgarh, India"
            profileLocationUrl="https://www.google.com/maps/search/?api=1&query=Bhilai,+Chhattisgarh"
          />

          {/* Legal global footer */}
          <Footer />

          {/* FLOATING THEME BAR (LIGHT // DARK TOGGLE) */}
          <div className="fixed bottom-6 right-6 z-40">
            <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-slate-950 border border-white/10 shadow-2xl backdrop-blur-xl">
              <button
                onClick={() => setTheme('light')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-wider transition-all uppercase cursor-pointer ${
                  theme === 'light'
                    ? 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Activate Light Theme"
                style={{ outline: 'none' }}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Light</span>
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-mono font-bold tracking-wider transition-all uppercase cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white shadow-md'
                    : 'text-slate-200 hover:text-white'
                }`}
                title="Activate Dark Theme"
                style={{ outline: 'none' }}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Dark</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
