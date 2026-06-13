/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Profile, Skill, Experience, Project, Achievement } from './types';

export interface ProfileDataset {
  profile: Profile;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  achievements: Achievement[];
}

export const rohiniData: ProfileDataset = {
  profile: {
    id: 'rohini',
    name: 'Rohini Dixit',
    nickname: 'rohinihehe',
    title: 'Content Creator',
    titleSerifHighlight: 'ai learner',
    subtitle: 'i create content to interact and communicate with new people and learn together about ai and create fun content',
    description: 'I am dedicated to exploring the boundaries of artificial intelligence, sharing knowledge through engaging videos and written content, and building a lively community where anyone can learn and grow together.',
    yearsOfExperience: 2,
    completedProjects: 52,
    clientsServed: 12,
    masteredTechs: 18,
    resumeUrl: 'https://instagram.com/rohinihehe',
    profilePicUrl: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=500&h=500&q=80'
  },
  skills: [
    // Frontend (represented as creative media layouts & trends)
    { id: 'v1', name: 'Instagram Reels & Video', category: 'Frontend', rating: 96, experienceYears: 2 },
    { id: 'v2', name: 'Creative Feed Design', category: 'Frontend', rating: 92, experienceYears: 2 },
    { id: 'v3', name: 'Interactive Story Templates', category: 'Frontend', rating: 98, experienceYears: 2 },
    { id: 'v4', name: 'Audience Traffic Systems', category: 'Frontend', rating: 85, experienceYears: 2 },
    { id: 'v5', name: 'Canva / Figma Layouts', category: 'Frontend', rating: 90, experienceYears: 2 },
    
    // Backend (represented as cognitive AI engineering & setups)
    { id: 'v6', name: 'Prompt Engineering (Gemini/Claude)', category: 'Backend', rating: 94, experienceYears: 2 },
    { id: 'v7', name: 'AI Image Gen Prompts', category: 'Backend', rating: 90, experienceYears: 2 },
    { id: 'v8', name: 'Scriptwriting & Hooks', category: 'Backend', rating: 95, experienceYears: 2 },
    
    // Design
    { id: 'v9', name: 'Aesthetic Typography', category: 'Design', rating: 95, experienceYears: 2 },
    { id: 'v10', name: 'Visual Moodboards & Cards', category: 'Design', rating: 92, experienceYears: 2 },
    { id: 'v11', name: 'Harmonious Color Palettes', category: 'Design', rating: 94, experienceYears: 2 },
    
    // Tools
    { id: 'v12', name: 'CapCut & Premiere Pro', category: 'Tools', rating: 92, experienceYears: 2 },
    { id: 'v13', name: 'Gemini & ChatGPT advanced', category: 'Tools', rating: 96, experienceYears: 2 },
    { id: 'v14', name: 'Claude Workspace Agents', category: 'Tools', rating: 90, experienceYears: 2 }
  ],
  experience: [],
  projects: [
    {
      id: 'vp-1',
      title: '@rohinihehe Social Feed',
      subtitle: 'Interactive Instagram Grid & Gallery',
      category: 'Interactive Media',
      description: 'An immersive digital layout compiling high-fidelity lifestyle post snapshots, aesthetic imagery, and AI tips. Experience the cozy visual feed.',
      fullDescription: 'The @rohinihehe Social Feed is an ultra-smooth, custom-designed Instagram profile simulation featuring curated photos, rich captions, interactive like counters, and locally-savable visitor comments.',
      challenge: 'Presenting a fully client-side social portal with realistic image lightboxing, like tracking, and instant comment additions without any heavy backend database requirements.',
      solution: 'Wrote a beautiful, robust state manager using Framer Motion logic that registers comments, animate counters, and renders high-density Unsplash visuals instantly.',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
      tags: ['Instagram', 'Interactive', 'Motion', 'Aesthetic'],
      demoUrl: 'https://instagram.com/rohinihehe',
      codeUrl: '#',
      features: [
        'Dynamic like system with realistic visual click hearts',
        'Locally interactive visitor comments section with memory',
        'Fully custom masonry grid layout matching genuine Instagram UI',
        'High-contrast lightbox viewer showing captions and real hashtags'
      ]
    },
    {
      id: 'vp-2',
      title: 'AI Demystified Series',
      subtitle: 'Generative AI Tutorial Suite',
      category: 'Education',
      description: 'Bite-sized, beautiful tutorials breaking down machine learning algorithms, prompting hacks, and text-to-image tricks.',
      fullDescription: 'An aesthetic guide and series created to take the complex world of Artificial Intelligence and package it into warm, approachable, human-sized bites. Perfect for non-technical individuals wanting to learn and interact with models.',
      challenge: 'Maintaining visitor interest, avoiding technical buzzwords, and creating explanations that inspire immediate experimentation.',
      solution: 'Developed highly structured interactive slides paired with human-centric analogies (e.g. comparing temperature settings in LLMs to adding spices to tea).',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      tags: ['Education', 'AI Prompts', 'Figma', 'Content Design'],
      demoUrl: '#',
      codeUrl: '#',
      features: [
        'Visually styled slides containing prompt blueprints',
        'Cohesive visual palettes optimized for readability',
        'Downloadable worksheets outlining multi-agent workflows',
        'Direct connections to open playgrounds and model systems'
      ]
    },
    {
      id: 'vp-3',
      title: 'Mindful Learning Lab',
      subtitle: 'Community Collaboration Space',
      category: 'Digital Space',
      description: 'An interactive virtual workshop to organize notes, run aesthetic timers, and connect over mutually discovered AI hacks.',
      fullDescription: 'The Mindful Learning Lab is an immersive canvas built for creators. It features beautiful cozy study backgrounds, custom Pomodoro widgets, neural node diagrams, and quick-note boards.',
      challenge: 'Structuring multiple utility gadgets (notes, timers, sketches) on a single screen while preserving high visual breathing space.',
      solution: 'Designed fluid glassmorphic card boundaries paired with rich motion animations that minimize any tool when not in active focus.',
      image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80',
      tags: ['Aesthetic', 'Timer', 'Interactive', 'Notes Workspace'],
      demoUrl: '#',
      codeUrl: '#',
      features: [
        'Beautiful customizable ambient auditory loops (Cafe, Rain, Synth)',
        'Cozy visual custom timer with smooth completion alerts',
        'Interactive drag-and-drop notes sticky panel',
        'Collapsible quick-access checklist synchronized to local state'
      ]
    }
  ],
  achievements: []
};
