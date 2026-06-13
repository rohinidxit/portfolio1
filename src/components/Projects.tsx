/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ExternalLink, Github, Sparkles, X, ChevronRight, HelpCircle, ShieldCheck,
  Instagram, Heart, MessageCircle, Send, Check, Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Check if profile is Rohini based on project IDs
  const isRohini = projects[0]?.id?.startsWith('vp');

  // Extract all unique tags across projects for filters
  const allTags = ['All', ...Array.from(new Set(projects.flatMap(p => p.tags)))];

  const filteredProjects = selectedTag === 'All'
    ? projects
    : projects.filter(p => p.tags.includes(selectedTag));

  return (
    <section id="projects" className="py-24 bg-bg-primary relative overflow-hidden">
      {/* Visual glowing design tokens */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Heading */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-px bg-brand-cyan"></span>
            <span className="text-xs font-mono text-brand-cyan uppercase tracking-widest leading-none">SHOWCASE FEEDS</span>
            <span className="w-8 h-px bg-brand-cyan"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight">
            Creative Storys & <span className="font-serif italic text-brand-cyan">Blueprints</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-[15px]">
            {isRohini 
              ? 'Explore the live creative lifestyle journal, visual slides, and interactive tools designed to communicate ideas directly.'
              : 'Explore production applications, designer architectures, and interactive libraries.'}
          </p>
        </div>

        {/* Instagram Visual Connect Badge for Rohini */}
        {isRohini && (
          <div className="flex justify-center mb-10 -mt-2">
            <a 
              href="https://instagram.com/rohinihehe" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative flex items-center gap-2.5 px-6 py-3 rounded-full border border-pink-500/20 text-white bg-slate-900/40 hover:bg-slate-900/80 transition-all duration-300 hover:scale-105 hover:border-pink-500/45 hover:shadow-[0_0_25px_rgba(236,72,153,0.15)] select-none cursor-pointer"
            >
              <Instagram className="w-4.5 h-4.5 text-pink-500 group-hover:rotate-12 transition-transform duration-350" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 group-hover:text-white transition-colors">Follow @rohinihehe on Instagram</span>
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
            </a>
          </div>
        )}

        <div>
          {/* Tag Filters Bar */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/40 font-semibold'
                    : 'bg-white/5 text-slate-400 border border-transparent hover:text-white hover:bg-slate-800'
                }`}
              >
                #{tag.toLowerCase()}
              </button>
            ))}
          </div>

          {/* Projects Responsive Grid */}
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                  whileHover={{ y: -5 }}
                  onClick={() => setActiveProject(project)}
                  className="group relative glass-panel rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-br from-slate-900/60 to-slate-950/60 border border-white/5 hover:border-brand-cyan/25 hover:glow-cyan transition-all duration-300 flex flex-col h-full shadow-lg"
                >
                  {/* Floating Image section */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    {/* Subtle hover overlay details */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-80" />
                    <div className="absolute inset-0 bg-brand-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Project Sector badge in panel corner */}
                    <div className="absolute top-4 right-4 bg-slate-950/80 backend px-3 py-1 bg-slate-900 text-brand-cyan text-[10px] font-mono rounded-md border border-white/5 leading-none">
                      {project.category}
                    </div>
                  </div>

                  {/* Content Details Block */}
                  <div className="p-6 flex flex-col flex-grow justify-between gap-5">
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-mono text-brand-cyan uppercase tracking-wider">
                        {project.subtitle}
                      </span>
                      <h3 className="text-xl font-display font-bold text-white group-hover:text-brand-cyan transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-400 text-xs leading-relaxed mt-2 line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Skills/Tags Bottom Line */}
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map((tg) => (
                          <span key={tg} className="text-[9px] font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                            #{tg}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="text-[9px] font-mono text-slate-500 px-2 py-0.5">
                            +{project.tags.length - 3} more
                          </span>
                        )}
                      </div>

                      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-brand-cyan font-semibold">
                        <span className="flex items-center gap-1 group-hover:underline">
                          Review Blueprints <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Detailed Blueprint Modal */}
        <AnimatePresence>
          {activeProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveProject(null)}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
              />

              {/* Modal Body Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: 'spring', duration: 0.4 }}
                className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl glass-panel bg-slate-950 border border-white/10 glow-blue shadow-2xl p-6 md:p-8 flex flex-col gap-6"
              >
                
                {/* Fixed upper close button */}
                <button
                  onClick={() => setActiveProject(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/5"
                  aria-label="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Left Column Layout details */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-4">
                  {/* Visual Left Frame column */}
                  <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-4">
                    <div className="rounded-2xl overflow-hidden aspect-video border border-white/5">
                      <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col gap-1 bg-white/5 border border-white/5 p-4 rounded-xl font-mono text-[11px] text-slate-400">
                      <span className="text-brand-cyan uppercase tracking-widest font-semibold flex items-center gap-1.5 mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-spin" style={{ animationDuration: '5s' }} />
                        ARCHITECTURE SPEC
                      </span>
                      <p>SECTOR: {activeProject.category}</p>
                      <p>COMPILIATION: SUCCESS (NODE_9)</p>
                      <p>CONTROLS: KEYBOARD INTERACTIVE</p>
                    </div>

                    {/* Interactive Action Links */}
                    <div className="flex gap-3 mt-2">
                      <a
                        href={activeProject.demoUrl}
                        className="flex-1 text-center py-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-xs font-mono font-bold tracking-wider hover:glow-cyan border border-white/5 hover:-translate-y-0.5 transition-all"
                      >
                        <ExternalLink className="w-4 h-4 inline mr-1.5 -cmd-0.5" />
                        LIVE PREVIEW
                      </a>
                      <a
                        href={activeProject.codeUrl}
                        className="flex-1 text-center py-3 rounded-xl glass-panel text-slate-300 hover:text-white text-xs font-mono font-bold border border-white/5 hover:-translate-y-0.5 hover:bg-white/5 transition-all"
                      >
                        <Github className="w-4 h-4 inline mr-1.5 -cmd-0.5" />
                        SOURCE CODE
                      </a>
                    </div>
                  </div>

                  {/* Technical Narrative Right column */}
                  <div className="md:col-span-12 lg:col-span-7 flex flex-col gap-5 text-left">
                    <div>
                      <span className="text-brand-cyan text-xs font-mono font-semibold tracking-wider uppercase">
                        {activeProject.subtitle}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight mt-1">
                        {activeProject.title}
                      </h3>
                    </div>

                    <p className="text-slate-300 text-[14px] leading-relaxed font-sans">
                      {activeProject.fullDescription}
                    </p>

                    {/* Challenge & Solution Splits */}
                    <div className="grid grid-cols-1 gap-4 mt-2">
                      {/* Challenge Grid box */}
                      <div className="p-4 bg-rose-950/20 rounded-xl border border-rose-500/10 flex gap-3.5 items-start">
                        <HelpCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-rose-400 font-mono text-[10px] uppercase font-bold tracking-widest">
                            The Architecture Challenge
                          </span>
                          <p className="text-slate-350 text-xs mt-1 leading-relaxed font-sans">
                            {activeProject.challenge}
                          </p>
                        </div>
                      </div>

                      {/* Solution Grid box */}
                      <div className="p-4 bg-emerald-950/20 rounded-xl border border-emerald-500/10 flex gap-3.5 items-start">
                        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-widest">
                            The Engineered Solution
                          </span>
                          <p className="text-slate-350 text-xs mt-1 leading-relaxed font-sans">
                            {activeProject.solution}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Feature Lists */}
                    <div className="flex flex-col gap-2.5 text-left">
                      <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                        INTEGRATED OPERATIONS & CAPABILITIES:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {activeProject.features.map((feature, ix) => (
                          <li key={ix} className="flex gap-2 items-start text-xs text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan shrink-0 mt-1.5 animate-pulse" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
