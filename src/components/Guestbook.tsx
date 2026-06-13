/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, Sparkles, Heart, Coffee, Smile, Code, Trash2, 
  MessageSquare, MessageCirclePlus, Pin, Feather
} from 'lucide-react';

interface GuestbookEntry {
  id: string;
  name: string;
  vibe: string; // gradient preset key
  stamp: string; // lucide icon identifier
  message: string;
  date: string;
  avatarSeed: number;
  isPinned?: boolean;
}

const STAMPS = [
  { id: 'heart', icon: Heart, label: 'Love', color: 'text-rose-500' },
  { id: 'sparkles', icon: Sparkles, label: 'AI Magic', color: 'text-brand-gold' },
  { id: 'coffee', icon: Coffee, label: 'Cozy', color: 'text-amber-400' },
  { id: 'smile', icon: Smile, label: 'Joy', color: 'text-brand-cyan' },
  { id: 'code', icon: Code, label: 'Craft', color: 'text-indigo-400' },
];

const VIBES = [
  { id: 'cyan', name: 'Cozy Teal', class: 'from-cyan-900/40 via-brand-cyan/10 to-indigo-950/20 border-brand-cyan/30 text-brand-cyan' },
  { id: 'pink', name: 'Cyber Pink', class: 'from-pink-950/30 via-pink-500/10 to-rose-950/20 border-pink-500/35 text-pink-400' },
  { id: 'amber', name: 'Sunset Amber', class: 'from-amber-950/30 via-brand-gold/10 to-red-950/20 border-brand-gold/35 text-brand-gold' },
  { id: 'purple', name: 'Cosmic Violet', class: 'from-purple-950/40 via-purple-500/10 to-emerald-950/10 border-purple-500/30 text-purple-400' },
  { id: 'glass', name: 'Minimalist Slate', class: 'from-slate-900/60 to-slate-950/60 border-white/10 text-slate-300' }
];

const INITIAL_ENTRIES: GuestbookEntry[] = [
  {
    id: 'entry-sticky',
    name: 'AI Agent Mastermind',
    vibe: 'amber',
    stamp: 'sparkles',
    message: '📌 STICKY NOTE: The "Letterbox" is Rohini\'s cozy digital community message board! Leave a sweet note, ask a creative question, or recommend dry spices to add to early morning lofi tea brews. Pinned right here at the absolute peak of the page! 🌸',
    date: 'Jun 13, 2026',
    avatarSeed: 7,
    isPinned: true
  },
  {
    id: 'entry-1',
    name: 'Aria Patel',
    vibe: 'cyan',
    stamp: 'sparkles',
    message: 'Hey Rohini! Your reels on simple prompt templates completely changed how I think about Gemini. Keeps producing the cleanest layouts!',
    date: 'Jun 10, 2026',
    avatarSeed: 1
  },
  {
    id: 'entry-2',
    name: 'Devon Lane',
    vibe: 'amber',
    stamp: 'coffee',
    message: 'Your mindset of treated followers like friends and learning alongside them makes this digital space feel so sweet and welcoming. Love the new photo block too!',
    date: 'Jun 12, 2026',
    avatarSeed: 2
  },
  {
    id: 'entry-3',
    name: 'Kavya S.',
    vibe: 'pink',
    stamp: 'heart',
    message: 'Oh my goodness, the custom visual gradients here are absolute art! Wishing you all the love from Delhi. 🌸',
    date: 'Jun 13, 2026',
    avatarSeed: 3
  }
];

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>(() => {
    const saved = localStorage.getItem('rohini_guestbook');
    let loaded: GuestbookEntry[] = INITIAL_ENTRIES;
    if (saved) {
      try {
        loaded = JSON.parse(saved);
        if (!loaded.some(e => e.id === 'entry-sticky')) {
          loaded = [INITIAL_ENTRIES[0], ...loaded];
        } else {
          // ensure it stays pinned
          const idx = loaded.findIndex(e => e.id === 'entry-sticky');
          if (idx !== -1) {
            loaded[idx].isPinned = true;
          }
        }
      } catch (e) {
        loaded = INITIAL_ENTRIES;
      }
    }
    return loaded;
  });

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedVibe, setSelectedVibe] = useState('cyan');
  const [selectedStamp, setSelectedStamp] = useState('heart');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    localStorage.setItem('rohini_guestbook', JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newEntry: GuestbookEntry = {
      id: `entry-${Date.now()}`,
      name: name.trim(),
      vibe: selectedVibe,
      stamp: selectedStamp,
      message: message.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      avatarSeed: Math.floor(Math.random() * 10) + 4
    };

    setEntries([newEntry, ...entries]);
    setName('');
    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleDelete = (id: string) => {
    // Standard quick delete for local safety
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  // Helper to resolve stamp
  const renderEntryStamp = (stampId: string) => {
    const matching = STAMPS.find((s) => s.id === stampId) || STAMPS[0];
    const IconComponent = matching.icon;
    return <IconComponent className={`w-4 h-4 ${matching.color} shrink-0`} />;
  };

  // Helper to resolve vibe class
  const getVibeClass = (vibeId: string) => {
    const matching = VIBES.find((v) => v.id === vibeId) || VIBES[4];
    return matching.class;
  };

  return (
    <section id="testimonials" className="py-24 bg-bg-primary relative overflow-hidden">
      {/* Immersive radial mesh gradients */}
      <div className="absolute top-[15%] left-[10%] w-[350px] h-[350px] bg-pink-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] bg-brand-cyan/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-px bg-brand-cyan"></span>
            <span className="text-xs font-mono text-brand-cyan uppercase tracking-widest leading-none">COMMUNITY BOARD</span>
            <span className="w-8 h-px bg-brand-cyan"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight">
            Cozy Digital <span className="font-serif italic text-brand-cyan">Letterbox</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-[15px]">
            Leave a sweet note, ask a question, or recommend dry spices to add to early morning tea! 🌸
          </p>
        </div>

        {/* 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Letter Generator Form */}
          <div className="lg:col-span-4 glass-panel p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/5 relative shadow-xl">
            <div className="absolute top-4 right-4 text-[10px] font-mono text-slate-500 tracking-wider flex items-center gap-1">
              <Feather className="w-3.5 h-3.5 text-brand-cyan" />
              <span>DRAFT_STATION</span>
            </div>

            <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-1.5">
              <MessageCirclePlus className="w-5 h-5 text-brand-cyan" />
              Drop a Sticky Entry
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Visitor Name */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rohini's Friend"
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all"
                  id="guestbook-name-input"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">Your Message</label>
                <textarea
                  required
                  rows={4}
                  maxLength={300}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share a sweet idea or highlight! (Max 300 chars)"
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all resize-none"
                  id="guestbook-msg-input"
                />
              </div>

              {/* Choose Vibe Gradient */}
              <div className="flex flex-col gap-2 text-left">
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">STAMP VIBE</label>
                <div className="grid grid-cols-5 gap-1.5">
                  {VIBES.map((vib) => (
                    <button
                      key={vib.id}
                      type="button"
                      onClick={() => setSelectedVibe(vib.id)}
                      className={`h-8 rounded-lg cursor-pointer flex items-center justify-center border font-mono text-[9px] select-none transition-all ${
                        selectedVibe === vib.id
                          ? 'border-brand-cyan font-bold bg-white/10 shadow-inner'
                          : 'border-white/5 bg-slate-950 hover:bg-slate-900 text-slate-500'
                      }`}
                      style={{ outline: 'none' }}
                      title={vib.name}
                    >
                      {vib.name.split(' ')[1].slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Choose Stamp Icon */}
              <div className="flex flex-col gap-2 text-left">
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">STAMP GRAPHIC</label>
                <div className="grid grid-cols-5 gap-2">
                  {STAMPS.map((st) => {
                    const ExtComp = st.icon;
                    return (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setSelectedStamp(st.id)}
                        className={`h-9 rounded-xl flex items-center justify-center cursor-pointer border transition-all ${
                          selectedStamp === st.id
                            ? 'border-brand-cyan bg-brand-cyan/10'
                            : 'border-white/5 bg-slate-950 hover:bg-slate-900 text-slate-400'
                        }`}
                        title={st.label}
                      >
                        <ExtComp className={`w-4 h-4 ${selectedStamp === st.id ? 'scale-110' : 'opacity-70'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Trigger */}
              <button
                type="submit"
                id="guestbook-submit-btn"
                className="w-full mt-2 py-3 bg-gradient-to-r from-brand-blue to-brand-cyan hover:glow-cyan text-white text-xs font-mono font-bold tracking-widest rounded-xl shadow-md uppercase transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Pin Message</span>
              </button>

              {/* Successful submission feedback */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-[11px] font-mono rounded-lg text-center"
                  >
                    LETTER PINNED ONLINE // THANKS FOR CREATING!
                  </motion.div>
                )}
              </AnimatePresence>

            </form>
          </div>

          {/* Right Column: Virtual Interactive Board Grid */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* Board Status Bar */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
                LIVE BOARD: {entries.length} RECOGNIZED ENTRIES
              </span>
              <span className="text-[10px] font-mono text-slate-500 select-none uppercase">
                SCROLL_TO_DESCOVER // SECURE_BOARD
              </span>
            </div>

            {/* Board Grid view */}
            <div className="max-h-[580px] overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 gap-4 container-snap custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {[...entries].sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0)).map((entry) => (
                  <motion.div
                    key={entry.id}
                    layoutId={entry.id}
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: -15 }}
                    whileHover={{ y: -3, scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 25 }}
                    className={`relative p-5 sm:p-6 rounded-2xl border bg-gradient-to-br flex flex-col justify-between gap-5 shadow-lg group/entry ${getVibeClass(entry.vibe)} ${entry.isPinned ? 'ring-2 ring-brand-cyan/40 bg-slate-950/85 hover:bg-slate-950/95 shadow-brand-cyan/10' : ''}`}
                  >
                    {/* Decorative pinning stamp illustration */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 opacity-80 select-none">
                      {entry.isPinned && (
                        <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-brand-cyan px-1.5 py-0.5 rounded bg-brand-cyan/10 border border-brand-cyan/20 animate-pulse">
                          STICKY
                        </span>
                      )}
                      {renderEntryStamp(entry.stamp)}
                      <Pin className={`w-3.5 h-3.5 rotate-12 ${entry.isPinned ? 'text-brand-cyan scale-110 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]' : 'text-slate-400'}`} />
                    </div>

                    <div className="flex flex-col gap-2">
                      {/* Note date */}
                      <span className="text-[9px] font-mono text-slate-500 font-bold tracking-wider leading-none uppercase">
                        {entry.date} // {entry.isPinned ? 'PINNED_POST' : 'VISITOR_POST'}
                      </span>
                      
                      {/* Message Body */}
                      <p className="text-[13px] leading-relaxed font-sans italic pt-1 tracking-wide text-slate-200">
                        "{entry.message}"
                      </p>
                    </div>

                    {/* Footer Row */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center font-mono font-bold text-[10px] text-brand-cyan">
                          {entry.name.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="font-display font-bold text-white text-xs tracking-wide">
                          {entry.name}
                        </span>
                      </div>

                      {/* Floating dynamic delete option for visitors to clean their custom letters if they want */}
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="text-slate-650 hover:text-rose-400 p-1 rounded-md opacity-0 group-hover/entry:opacity-100 focus:opacity-100 transition-all duration-200 hover:bg-rose-500/10 cursor-pointer"
                        title="Remove Letter"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>

              {entries.length === 0 && (
                <div className="col-span-1 md:col-span-2 py-16 text-center border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3">
                  <MessageSquare className="w-8 h-8 text-slate-600 animate-bounce" />
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                    BOARD IS COMPLETELY EMPTY // READY TO LOG COZY WORDS
                  </span>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
