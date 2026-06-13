/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Code, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Profile } from '../types';

interface HeroProps {
  profile: Profile;
  onExploreProjects: () => void;
  onViewContact: () => void;
}

export default function Hero({ profile, onExploreProjects, onViewContact }: HeroProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // Floating background particle items
  const [particles] = useState(() => 
    Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * -10
    }))
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized relative vector (-0.5 to 0.5)
      setCoords({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-bg-primary"
    >
      {/* Immersive Aurora Gradient Aura */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Neon Blur Blue Node */}
        <div 
          className="absolute top-1/4 left-1/4 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-brand-blue/20 blur-[130px]"
          style={{
            transform: `translate(${coords.x * 35}px, ${coords.y * 35}px)`,
            transition: 'transform 0.2s cubic-bezier(0.1, 0.8, 0.2, 1)'
          }}
        />
        {/* Neon Blur Cyan Node */}
        <div 
          className="absolute bottom-1/4 right-1/4 w-[280px] md:w-[500px] h-[280px] md:h-[500px] rounded-full bg-brand-cyan/15 blur-[110px]"
          style={{
            transform: `translate(${coords.x * -25}px, ${coords.y * -25}px)`,
            transition: 'transform 0.15s cubic-bezier(0.1, 0.8, 0.2, 1)'
          }}
        />
        {/* Accent Gold Node for high contract highlights */}
        <div 
          className="absolute top-1/2 left-2/3 w-[150px] md:w-[300px] h-[150px] md:h-[300px] rounded-full bg-brand-gold/10 blur-[80px]"
          style={{
            transform: `translate(${coords.x * 15}px, ${coords.y * 45}px)`,
            transition: 'transform 0.3s cubic-bezier(0.1, 0.8, 0.2, 1)'
          }}
        />
      </div>

      {/* Floating Animated Dust Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.1, y: `${p.y}%` }}
            animate={{ 
              y: ['0%', '100%'],
              opacity: [0.1, 0.5, 0.1]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: p.delay
            }}
            className="absolute rounded-full bg-slate-300"
            style={{
              left: `${p.x}%`,
              width: `${p.size}px`,
              height: `${p.size}px`
            }}
          />
        ))}
      </div>

      {/* Hero Core Content Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        
        {/* Left Column: Big typography & call to actions */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Greeting Tag */}
          <motion.div
            id="hero-badge"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 glow-blue text-xs font-mono font-semibold text-brand-cyan tracking-wider mb-6 animate-pulse"
          >
            <Sparkles className="w-4.5 h-4.5 text-brand-gold animate-bounce" />
            hello visitors this is rohini dixit
          </motion.div>

          {/* Master Heading inspired by design image: */}
          <div className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-6">
            <AnimatePresence mode="popLayout">
              <motion.div
                key="title-1"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.4 }}
                className="block"
              >
                {profile.title}
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="popLayout">
              <motion.div
                key="title-2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="text-brand-gold font-serif italic font-medium tracking-normal inline-block pr-3"
              >
                {profile.titleSerifHighlight}
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.p
              key="subtitle-desc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-slate-300 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl mb-10"
            >
              {profile.subtitle}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Right Column: Immersive Virtual Sandbox Device Panel */}
        <div className="lg:col-span-5 flex justify-center relative">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-[420px] aspect-square rounded-3xl overflow-hidden glass-panel border border-white/10 p-6 flex flex-col justify-between glow-blue backdrop-blur-xl"
            style={{
              transformStyle: 'preserve-3d',
              transform: `perspective(1000px) rotateY(${coords.x * 20}deg) rotateX(${coords.y * -20}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {/* Holographic Header lines */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-pink-500/85"></div>
                <div className="w-3 h-3 rounded-full bg-fuchsia-500/85"></div>
                <div className="w-3 h-3 rounded-full bg-purple-500/85"></div>
              </div>
              <span className="text-[10px] font-mono text-slate-400 tracking-widest flex items-center gap-1.5 uppercase leading-none">
                <Code className="w-3 h-3 text-brand-cyan animate-pulse" />
                ROHINI_LABS.run
              </span>
            </div>

            {/* Beautiful Custom Post/Interactive Card replacing the photo */}
            <div className="my-6 relative flex-grow rounded-2xl overflow-hidden border border-white/5 flex flex-col justify-center items-center text-center shadow-inner bg-slate-950/40">
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img 
                  src="https://instasize.com/api/image/4e3462b6a721a816556b37aa3c6b9ac58ca2b18fd006c4731a5b1869ec00aed0.jpeg" 
                  alt="Rohini Dixit"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top select-none"
                />
                {/* Absolute shadow and ambient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/20 pointer-events-none" />
              </div>

              {/* Live Info Tags */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div className="flex flex-col gap-0.5 text-left">
                  <span className="text-[9px] font-mono text-brand-cyan uppercase tracking-wider">STATUS: ACTIVE 🌐</span>
                  <span className="text-[9px] font-mono text-slate-400">AI WORKSPACE</span>
                </div>
                <div className="px-2 py-0.5 bg-brand-cyan/20 text-brand-cyan text-[8px] font-mono rounded border border-brand-cyan/30 tracking-widest uppercase">
                  MEMBER
                </div>
              </div>
            </div>

            {/* Quick Metrics display inside Hero card - Now customized to learning and living */}
            <div className="pt-4 border-t border-white/5 flex flex-col items-center justify-center">
              <span className="text-xl sm:text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan tracking-wider uppercase animate-pulse">
                learning & living
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-1 text-center">
                my life motto & state of mind
              </span>
            </div>
            
          </motion.div>

          {/* Additional visual element matching 'glow' layout */}
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-brand-gold/5 border border-brand-gold/10 animate-pulse glow-gold pointer-events-none z-0" />
        </div>

      </div>
    </section>
  );
}
