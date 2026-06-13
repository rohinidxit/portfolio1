/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Briefcase, Layers, Users, Clock, PieChart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Profile } from '../types';

interface AboutProps {
  profile: Profile;
}

export default function About({ profile }: AboutProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const slices = [
    { name: 'AI Learning', val: 40, color: 'stroke-brand-cyan', textClass: 'text-brand-cyan', bgClass: 'bg-brand-cyan/20 border-brand-cyan/30', desc: 'Exploring and experimenting with neural networks, multi-agent frameworks, and prompt engineering daily to learn from.' },
    { name: 'Content Production', val: 30, color: 'stroke-brand-blue', textClass: 'text-brand-blue', bgClass: 'bg-brand-blue/20 border-brand-blue/30', desc: 'Designing and scripting high-quality, fun visual demonstrations and coding tutorials for community platforms.' },
    { name: 'Community Hub', val: 20, color: 'stroke-purple-500', textClass: 'text-purple-400', bgClass: 'bg-purple-500/20 border-purple-500/30', desc: 'Connecting directly with new learners, answering thought-provoking questions, and sharing mutual discoveries.' },
    { name: 'Fun Projects', val: 10, color: 'stroke-pink-500', textClass: 'text-pink-400', bgClass: 'bg-pink-500/20 border-pink-500/30', desc: 'Engineering reactive single-screen tools, sensory visual widgets, and creative code concepts.' },
  ];

  let accumulatedPercent = 0;
  const segments = slices.map((slice) => {
    const strokeLength = (slice.val / 100) * 282.74;
    const strokeOffset = 282.74 - ((accumulatedPercent / 100) * 282.74);
    accumulatedPercent += slice.val;
    return {
      ...slice,
      strokeLength,
      strokeOffset,
    };
  });
  
  const stats = [
    {
      id: 'stat-exp',
      value: 24,
      suffix: ' mo',
      label: 'Active Learning',
      icon: <Clock className="w-5 h-5 text-brand-cyan" />,
      color: 'from-brand-blue/10 to-brand-cyan/10 border-brand-cyan/20'
    },
    {
      id: 'stat-proj',
      value: 52,
      suffix: '+',
      label: 'Interactive Demos',
      icon: <Briefcase className="w-5 h-5 text-brand-gold" />,
      color: 'from-brand-gold/10 to-transparent border-brand-gold/25'
    },
    {
      id: 'stat-cli',
      value: 12,
      suffix: '+',
      label: 'Co-Learners',
      icon: <Users className="w-5 h-5 text-brand-cyan" />,
      color: 'from-brand-cyan/10 to-transparent border-brand-cyan/20'
    },
    {
      id: 'stat-tech',
      value: 18,
      suffix: '+',
      label: 'AI Blueprints',
      icon: <Layers className="w-5 h-5 text-brand-blue" />,
      color: 'from-brand-blue/10 to-transparent border-brand-blue/20'
    }
  ];

  return (
    <section id="about" className="py-24 bg-bg-secondary relative overflow-hidden">
      {/* Background visual helpers */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center md:text-left mb-16">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
            <span className="w-8 h-px bg-brand-cyan"></span>
            <span className="text-xs font-mono text-brand-cyan uppercase tracking-widest leading-none">MY CREATIVE JOURNEY</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight">
            Connecting Minds & <span className="font-serif italic text-brand-cyan">Exploring AI</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl text-[15px]">
            Sharing ideas, building a supportive global tech community, and learning artificial intelligence together.
          </p>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Interactive Pie Chart representing creative division of focus */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[400px] rounded-3xl glass-panel border border-white/10 p-6 flex flex-col justify-between overflow-hidden group">
              {/* Grid Background */}
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
              
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-cyan flex items-center justify-center shadow-md">
                      <PieChart className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-md font-display font-bold text-white uppercase tracking-wider leading-none">CREATOR PROCESS</h3>
                      <p className="text-[9px] font-mono text-slate-400 leading-none mt-1">ACTIVITY DISTRIBUTION</p>
                    </div>
                  </div>
                  <span className="px-1.5 py-0.5 bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-[8px] font-mono rounded select-none">
                    LIVE_METRICS
                  </span>
                </div>
              </div>

              {/* Pie/Donut Chart Stage */}
              <div className="relative flex justify-center items-center my-6 h-48 select-none">
                <svg className="w-40 h-40 transform -rotate-90 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]" viewBox="0 0 120 120">
                  {/* Decorative faint background track */}
                  <circle
                    cx="60"
                    cy="60"
                    r="45"
                    fill="transparent"
                    stroke="rgba(255,255,255,0.03)"
                    strokeWidth="10"
                  />
                  {segments.map((seg, i) => (
                    <motion.circle
                      key={seg.name}
                      cx="60"
                      cy="60"
                      r="45"
                      fill="transparent"
                      strokeWidth={activeIndex === i ? 12 : 8}
                      className={`${seg.color} transition-all duration-300 cursor-pointer`}
                      strokeDasharray="282.74"
                      strokeDashoffset={seg.strokeOffset}
                      strokeLinecap="round"
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => setActiveIndex(i)}
                      whileHover={{ strokeWidth: 14 }}
                      style={{ originX: '60px', originY: '60px' }}
                    />
                  ))}
                </svg>

                {/* Center Stats Display */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <motion.span 
                    key={activeIndex !== null ? slices[activeIndex].val : 'total'}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-2xl font-display font-black text-white tracking-tight"
                  >
                    {activeIndex !== null ? slices[activeIndex].val : '100'}%
                  </motion.span>
                  <motion.span
                    key={activeIndex !== null ? slices[activeIndex].name : 'creation'}
                    initial={{ opacity: 0, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[9px] font-mono text-slate-400 uppercase tracking-widest text-center max-w-[90px] truncate"
                  >
                    {activeIndex !== null ? slices[activeIndex].name : 'FOCUS'}
                  </motion.span>
                </div>
              </div>

              {/* Interactive Key / Legends */}
              <div className="relative z-10 grid grid-cols-2 gap-2 mb-4">
                {slices.map((slice, i) => (
                  <button
                    key={slice.name}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`flex items-center gap-2 p-1.5 rounded-lg border text-left cursor-pointer transition-all ${
                      activeIndex === i 
                        ? 'bg-white/5 border-white/10 text-white' 
                        : 'border-transparent text-slate-400 hover:bg-white/5'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full shrink-0 ${slice.color.replace('stroke', 'bg')}`} />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] font-mono font-bold leading-none truncate">{slice.name}</span>
                      <span className="text-[9px] font-sans text-slate-500 mt-1">{slice.val}%</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Description Card for Active Segment */}
              <div className="relative z-10 bg-slate-900/80 rounded-xl p-3 border border-white/5 min-h-[64px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {activeIndex !== null && (
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                    >
                      <p className="text-[10px] text-slate-300 leading-relaxed font-sans">
                        {slices[activeIndex].desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right: Rich Stories & Micro Statistics Grid */}
          <div className="lg:col-span-7 flex flex-col gap-8 text-left">
            <div className="flex flex-col gap-5 text-slate-300 text-[15px] leading-relaxed">
              <span className="text-brand-gold font-mono text-xs uppercase tracking-widest block font-medium">
                THE MINDSET
              </span>
              <div>
                <p className="text-lg text-white font-medium mb-4">
                  {profile.description}
                </p>
                <p className="mb-4">
                  I love making complex technology accessible. I build interactive demos, write engaging posts, and publish visual content exploring state-of-the-art neural architectures, all through an authentic, easy-to-grasp approach.
                </p>
                <p>
                  I am passionate about collaborating with fellow enthusiasts, testing the newest AI tools, and creating spaces that connect people through mutual curiosities.
                </p>
              </div>
            </div>

            {/* Statistics Bento Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {stats.map((st) => (
                <div
                  key={st.id}
                  className={`glass-panel p-4 rounded-2xl flex flex-col items-start gap-3 bg-gradient-to-tr ${st.color} border transition-all duration-350 hover:scale-[1.03] hover:border-white/15`}
                >
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5">
                    {st.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                      {st.value}
                      <span className="text-slate-400 text-xs font-mono lowercase">{st.suffix}</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mt-1 font-semibold leading-tight">
                      {st.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
