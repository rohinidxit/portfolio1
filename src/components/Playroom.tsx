/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Sliders, Play, Copy, RefreshCw, Heart, Volume2, 
  Terminal, HelpCircle, Laptop, Feather, Compass, CheckCircle2, 
  ChevronRight, Info, Eye, Code, Flame, Star, BookOpen, Plus, Trash2,
  Send, MessageSquare, AlertTriangle, Ghost, Film, Film as VideoIcon, 
  HelpCircle as HelpIcon, Flame as FireIcon, Wand2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PromptTemplate {
  id: string;
  title: string;
  role: string;
  description: string;
  icon: string;
  defaultTopic: string;
  placeholderText: string;
}

const INITIAL_TEMPLATES: PromptTemplate[] = [
  {
    id: 'story',
    title: 'Cozy Ambient Storyteller',
    role: 'Ambient Dreamscape Narrator',
    description: 'Generates whimsical, cozy bedside stories with acoustic coffee-shop soundscapes.',
    icon: '🔮',
    defaultTopic: 'A glowing teapot that speaks ancient languages in a rainy treehouse',
    placeholderText: 'e.g., A library floating on hot-air balloons...'
  },
  {
    id: 'hooks',
    title: 'Stellar Reels Micro-Hooker',
    role: 'High-Engagement Hook Architect',
    description: 'Builds creative hooks and caption strategies for videos, lifestyle grids, and reels.',
    icon: '🎥',
    defaultTopic: 'Learning prompt engineering as an absolute beginner without feeling lost',
    placeholderText: 'e.g., Unveiling my favorite daily coffee recipes...'
  },
  {
    id: 'visualizer',
    title: 'Visual Prompt Architect',
    role: 'High-Fidelity Prompt Designer',
    description: 'Transforms basic ideas into hyper-detailed generative image prompt blueprints (Imagen/Midjourney).',
    icon: '🎨',
    defaultTopic: 'A wooden study desk covered in glowing notes, fairy lights, and steaming matcha latte',
    placeholderText: 'e.g., A cozy cyberpunk workspace covered in plants...'
  },
  {
    id: 'companion',
    title: 'Mellow Analogy Solver',
    role: 'Playful Conceptual Tutor',
    description: 'Explains complex tech concepts through cozy kitchen recipes, garden metaphors, or tea brews.',
    icon: '🌱',
    defaultTopic: 'How database queries work, compared to sorting a drawer of spices',
    placeholderText: 'e.g., Explaining neural network weights through baking a cake...'
  }
];

const MOODS = [
  { id: 'lofi', label: '🌻 Warm Cozy Lofi', accent: 'text-amber-400 border-amber-500/20 text-brand-gold bg-amber-500/10' },
  { id: 'cyber', label: '🌌 Cyber Neon Glow', accent: 'text-brand-cyan border-brand-cyan/20 bg-brand-cyan/10' },
  { id: 'minimal', label: '🐚 Editorial Clean', accent: 'text-indigo-400 border-indigo-400/20 bg-indigo-500/10' },
  { id: 'magic', label: '✨ Whimsical Magical', accent: 'text-rose-450 border-rose-500/20 bg-rose-500/10' }
];

const PERSONAS = [
  { id: 'friend', name: 'Cozy Best Friend', prefix: 'Hey friend! Here is a beautiful spark for you: ' },
  { id: 'hacker', name: 'Vintage Terminal AI', prefix: 'CONNECTING DATASTREAM... COMPILED SCHEMATIC: ' },
  { id: 'monk', name: 'Zen Mindfulness Guide', prefix: 'Take a soft breath. Let your thoughts settle around this idea: ' },
  { id: 'architect', name: 'Surrealist Dream Architect', prefix: 'Imagine a canvas where dimensions dissolve. Let us build: ' }
];

interface ExplainerDetails {
  title: string;
  tag: string;
  formula: string;
  concept: string;
}

const EXPLAINERS: Record<string, ExplainerDetails> = {
  role: {
    title: 'System Role Boundary',
    tag: 'ACT_AS_[ROLE]',
    formula: 'Instructs the neural net what specialized skill matrix and baseline knowledge to assume.',
    concept: 'By declaring "Ambient Dreamscape Narrator", the model restricts its vocabulary, prioritizing soothing verbs, slow-paced adjectives, and whimsical imagery instead of dry technical speech.'
  },
  atmosphere: {
    title: 'Atmospheric Conditioning',
    tag: 'APPLY_[ATMOSPHERE]',
    formula: 'Binds secondary style variables, color tokens, and spatial descriptors.',
    concept: 'Applying "Sunflower Warm Lofi" conditions the output probability map to weight analog triggers highly, introducing soft sensory elements (tea steam, rain sounds, low-fidelity tape hiss).'
  },
  persona: {
    title: 'Tone & Greeting Injection',
    tag: 'STYLE_OF_[PERSONA_PREFIX]',
    formula: 'Defines how the speaker positions themselves relative to the listener.',
    concept: 'Standard AI models feel clinical. Instructing a "Zen Guide" prefix ensures the output initializes with high emotional safety, forcing the agent to introduce structural breathing intervals.'
  },
  temp: {
    title: 'Creativity Entropy (Temperature)',
    tag: 'TEMPERATURE=[VALUE]',
    formula: 'Alters output probability distribution (diversity vs. safety).',
    concept: 'At low temperature (0.2), the model picks the absolute safest, most predictable next token. At high temperature (1.2), it broadens the search space to allow dreamlike, highly unique metaphors.'
  },
  topic: {
    title: 'Context Topic Capsule',
    tag: 'TOPIC_"{USER_INPUT}"',
    formula: 'A strict semantic scope tag preventing tangential runaways or prompt injection.',
    concept: 'Surrounding your custom prompt input inside absolute tags like quotes acts as a linguistic barrier, preserving task coherence and stopping model deviations.'
  }
};

// PRESET CATEGORIES AND SUGGESTED IDEAS ACCORDING TO USER'S SELECTED AREAS (HUMOR / HORROR / ETC.)
const GENRES = [
  { id: 'comedy', name: '🎭 Comedy / Skits', description: 'Witty, relatable dialogue and situational humor.' },
  { id: 'horror', name: '🧟 Horror / Suspense', description: 'Immersive stories, eerie visuals, and spooky hooks.' },
  { id: 'education', name: '💡 AI & Video Tools', description: 'Tips, prompt engineering walkthroughs, and aesthetics.' },
  { id: 'vlog', name: '☕ Cinematic Lifestyle', description: 'Cozy routines, atmospheric frames, and lofi audio.' },
  { id: 'mystery', name: '🔎 True Crime / Mystery', description: 'Suspenseful narratives, plot twists, and curious evidence.' }
];

const FORMATS = [
  { id: 'reel', name: '📱 Instagram Reel / Short (9:16)', icon: '📱' },
  { id: 'yt', name: '🎬 YouTube Video (16:9)', icon: '🎥' },
  { id: 'podcast', name: '🎙️ Audio Podcast (1:1)', icon: '🎙️' },
  { id: 'shortfilm', name: '📽️ Cinematic Short Film', icon: '🍿' }
];

const ATMO_TONES = [
  { id: 'snappy', name: '⚡ Snappy & High-Energy', color: 'border-amber-500/20 text-amber-300' },
  { id: 'mysterious', name: '👁️ Eerie & Suspenseful', color: 'border-fuchsia-500/20 text-fuchsia-300' },
  { id: 'lofi', name: '☕ Mellow, Warm & Lofi', color: 'border-cyan-500/20 text-cyan-300' },
  { id: 'academic', name: '🕯️ Dark Academia Intellectual', color: 'border-emerald-500/20 text-emerald-300' },
  { id: 'satirical', name: '🤪 Satirical & Organic', color: 'border-rose-500/20 text-rose-300' }
];

const GENRE_SUGGESTED_PROMPTS: Record<string, string[]> = {
  comedy: [
    "When your Smart Fridge starts judging your midnight snack reviews",
    "Exposing people who pretend to study with lofi music in coffee shops",
    "If generative AI models had a family Thanksgiving dinner argument",
    "A content creator who takes 'aesthetic micro-vlogging' way too seriously"
  ],
  horror: [
    "An AI home security system that captures shadows waving back from empty rooms",
    "A vintage Polaroid camera that outputs photos taken exactly 5 minutes in the future",
    "A lost audio track that claims to guide listener's breathing but says creepy warnings",
    "A cozy library where the books rewrite themselves to match whoever is reading them"
  ],
  education: [
    "Explaining visual prompt engineering so a medieval peasant could paint an oil canvas",
    "3 secret AI video editing hacks that feel like absolute witchcraft in 2026",
    "How to maintain a highly aesthetic visual feed on Instagram without burn out",
    "The step-by-step math secret of creating recursive glassmorphic UI models"
  ],
  vlog: [
    "Chasing an emerald-colored rainy morning inside a steel and flower creative studio",
    "A slow-paced cinematic routine brewing a cinnamon latte on a mechanical typewriter table",
    "Finding deep artistic balance in Chhattisgarh - street aesthetics and lofi memories",
    "A visual essay on why typography and dark warm colors heal early morning anxiety"
  ],
  mystery: [
    "The strange file labeled 'unrendered.sys' discovered on an antique hard drive from 1989",
    "A hidden micro-message located in the margin rules of a famous designer portfolio",
    "A fictional true-crime report of a model whose weights shifted autonomously every midnight",
    "The secret biography of an audio frequency that vanished from any synthesizer map"
  ]
};

// --- Web Audio API cozy synthesizer engine ---
let audioCtx: AudioContext | null = null;
let humOsc: OscillatorNode | null = null;
let noiseNode: AudioBufferSourceNode | null = null;
let humGain: GainNode | null = null;
let rainGain: GainNode | null = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playKeystrokeSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    // warm organic keyboard pop
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(120 + Math.random() * 90, ctx.currentTime);
    
    gain.gain.setValueAtTime(0.015, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {
    // secure warning fallback if audio is blocked or fails
  }
}

function stopAmbientAtmosphere() {
  try {
    if (humGain) {
      humGain.gain.linearRampToValueAtTime(0, getAudioContext().currentTime + 0.8);
    }
    if (rainGain) {
      rainGain.gain.linearRampToValueAtTime(0, getAudioContext().currentTime + 0.8);
    }
  } catch (e) {}
}

function startAmbientAtmosphere() {
  try {
    const ctx = getAudioContext();
    
    // 1. Cozy hum synthesizer
    if (!humOsc) {
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      humGain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, ctx.currentTime); // 55Hz mellow baseline
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, ctx.currentTime);
      
      humGain.gain.setValueAtTime(0, ctx.currentTime);
      
      osc.connect(filter);
      filter.connect(humGain);
      humGain.connect(ctx.destination);
      osc.start();
      humOsc = osc;
    }
    
    // fade in cozy drone
    humGain?.gain.linearRampToValueAtTime(0.14, ctx.currentTime + 1.2);

    // 2. Synthesized cozy ambient crackle/rain static
    if (!noiseNode) {
      const bufferSize = ctx.sampleRate * 2; // 2 sec loop
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      
      const source = ctx.createBufferSource();
      source.buffer = noiseBuffer;
      source.loop = true;
      
      const rainFilter = ctx.createBiquadFilter();
      rainFilter.type = 'bandpass';
      rainFilter.frequency.setValueAtTime(450, ctx.currentTime);
      rainFilter.Q.setValueAtTime(0.4, ctx.currentTime);
      
      rainGain = ctx.createGain();
      rainGain.gain.setValueAtTime(0, ctx.currentTime);
      
      source.connect(rainFilter);
      rainFilter.connect(rainGain);
      rainGain.connect(ctx.destination);
      
      source.start();
      noiseNode = source;
    }
    
    // fade in cozy static
    rainGain?.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 1.5);
  } catch (e) {
    console.warn("Audio Context blocked, waiting for user trigger:", e);
  }
}

export default function Playroom() {
  // Multi-mode view tabs
  const [activeTab, setActiveTab] = useState<'chatbot' | 'sandbox'>('chatbot');
  
  // Tab 1: AI Chatbot specific states
  const [chatbotGenre, setChatbotGenre] = useState('comedy');
  const [chatbotFormat, setChatbotFormat] = useState('reel');
  const [chatbotAtmosphere, setChatbotAtmosphere] = useState('lofi');
  const [rawPromptInput, setRawPromptInput] = useState('');
  
  // Real Chat history state
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant'; content: string; timestamp: Date }>>([
    {
      role: 'assistant',
      content: `👋 I am Agorathm, your advanced AI Creative Producer! Select your options on the left to set up the prompt guidelines, then select/type a creative concept. \n\nClick **"Generate Ideas Blueprint"** or type below to brainstorm hooks, visual narratives, scripts, and production blueprints!`,
      timestamp: new Date()
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatCopiedIndex, setChatCopiedIndex] = useState<number | null>(null);

  // Keyboard typing muffled pops sound trigger for Chatbot replies
  const [currentlyTypingIndex, setCurrentlyTypingIndex] = useState<number | null>(null);
  const [chatTypingText, setChatTypingText] = useState('');

  // Tab 2: Sandbox states (Original design sandbox)
  const [templates, setTemplates] = useState<PromptTemplate[]>(INITIAL_TEMPLATES);
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate>(INITIAL_TEMPLATES[0]);
  const [topic, setTopic] = useState('');
  const [selectedMood, setSelectedMood] = useState(MOODS[0]);
  const [selectedPersona, setSelectedPersona] = useState(PERSONAS[0]);
  const [temperature, setTemperature] = useState(0.8);
  
  // Custom template creator states
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [newIcon, setNewIcon] = useState('💫');

  // Interactive Explainer States
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [activeExplainKey, setActiveExplainKey] = useState<string>('role');

  // Cozy Atmosphere Sound Toggles
  const [ambientAudioOn, setAmbientAudioOn] = useState(false);
  const [keyboardClicksOn, setKeyboardClicksOn] = useState(true);

  // Production sandbox states
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesisProgress, setSynthesisProgress] = useState(0);
  const [synthesizedPrompt, setSynthesizedPrompt] = useState('');
  const [simulatedResponse, setSimulatedResponse] = useState('');
  const [copied, setCopied] = useState(false);
  const [typerText, setTyperText] = useState('');

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Sync default topic for sandbox
  useEffect(() => {
    setTopic(selectedTemplate.defaultTopic);
  }, [selectedTemplate]);

  // Audio Context sync
  useEffect(() => {
    if (ambientAudioOn) {
      startAmbientAtmosphere();
    } else {
      stopAmbientAtmosphere();
    }
    return () => {
      stopAmbientAtmosphere();
    };
  }, [ambientAudioOn]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isChatLoading, chatTypingText]);

  // Trigger typewriter and keyboard clicking sounds
  const runTypewriterAnimation = (text: string, index: number) => {
    setCurrentlyTypingIndex(index);
    let strIndex = 0;
    
    const interval = setInterval(() => {
      setChatTypingText(text.slice(0, strIndex));
      strIndex += 4;
      
      if (keyboardClicksOn && Math.random() > 0.45 && strIndex <= text.length) {
        playKeystrokeSound();
      }

      if (strIndex > text.length) {
        clearInterval(interval);
        setCurrentlyTypingIndex(null);
        setChatTypingText('');
        // Push full text to history index permanently once finished
        setChatHistory(prev => {
          const updated = [...prev];
          updated[index] = { ...updated[index], content: text };
          return updated;
        });
      }
    }, 7);
  };

  // Chat Submission Handler - CALLS THE REAL /api/chat ENDPOINT on the server!
  const handleChatSubmit = async (customMessage?: string) => {
    const rawContent = (customMessage || rawPromptInput).trim();
    if (!rawContent && !customMessage) return;

    if (isChatLoading) return;

    // Grab configuration
    const genreObj = GENRES.find(g => g.id === chatbotGenre);
    const formatObj = FORMATS.find(f => f.id === chatbotFormat);
    const atmosphereObj = ATMO_TONES.find(a => a.id === chatbotAtmosphere);

    const newUserMessage = {
      role: 'user' as const,
      content: rawContent,
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, newUserMessage]);
    setRawPromptInput('');
    setIsChatLoading(true);

    try {
      // Build full history to pass to endpoint
      const preparedMessages = [...chatHistory, newUserMessage].map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: preparedMessages,
          genre: genreObj?.name || 'Comedy',
          format: formatObj?.name || 'Instagram Reel',
          atmosphere: atmosphereObj?.name || 'Mellow Lofi',
          customPrompt: rawContent
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP error ${res.status}`);
      }

      const responseData = await res.json();
      const replyContent = responseData.content || "I couldn't generate ideas. Please verify your system parameters.";

      // Push temporary empty response to state, then start typewriter sound flow
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: '', // typewriter will gradually update
        timestamp: new Date()
      }]);

      const nextAssistantIndex = chatHistory.length + 1; // +1 since we appended newUserMessage above
      setIsChatLoading(false);
      runTypewriterAnimation(replyContent, nextAssistantIndex);

    } catch (error: any) {
      console.error("Error communicating with AI Chatbot server:", error);
      
      // Fallback fallback simulated response so the app keeps spinning and explaining nicely!
      let fallbackText = `⚠️ **Could not connect to the real server-side Gemini backend.** 

Ensure you have provided your **GEMINI_API_KEY** under **Settings > Secrets** in the AI Studio sidebar!

Here is a beautifully structured simulated fallback blueprint focused on: **"${rawContent}"**
***

### 🎨 Simulated Content Blueprint: "${rawContent}"
- **Genre Zone**: \`${genreObj?.name || 'Comedy'}\`
- **Shoot Format Layout**: \`${formatObj?.name || 'Instagram Reel'}\`
- **Visual Atmosphere / Vibe**: \`${atmosphereObj?.name || 'Cozy & Mellow'}\`

#### ⚡ 1. Scroll-Stopping Hook Options
- **Target Hook A:** "Nobody talks about this..." (highly engaging overlay)
- **Target Hook B:** "If you are shooting content about ${rawContent}, stop scrolls with this camera angle."

#### 🎬 2. The Scene-by-Scene Visual Breakdown
- **Scene 1 (0-3s):** Extreme close-up shot of hands brewing steam-hot coffee on a typewriter. Dynamic macro film lens. Sound: Low lofi tape crackle.
- **Scene 2 (3-10s):** Fast visual match-cut showing raw handwritten scribbles related to: *"${rawContent}"*. Lowpass audio filters.
- **Scene 3 (10-15s):** Smooth pull-back reveal of the laptop showcasing responsive code blocks, overlaying glowing labels.

#### 📝 3. Prompt Action Formula
Set your parameters to generate full custom scripts. Enter your real API key in the top right to unlock infinite chat follow-ups!`;

      // Simulating loading state buffer even for fallback to feel natural
      setTimeout(() => {
        setIsChatLoading(false);
        setChatHistory(prev => [...prev, {
          role: 'assistant',
          content: '',
          timestamp: new Date()
        }]);
        const nextAssistantIndex = chatHistory.length + 1;
        runTypewriterAnimation(fallbackText, nextAssistantIndex);
      }, 700);
    }
  };

  const handleCopyChatMessage = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setChatCopiedIndex(index);
    setTimeout(() => setChatCopiedIndex(null), 2000);
  };

  // Original Sandbox Generate logic
  const handleCopySandbox = () => {
    const fullText = `[PROMPT BLUEPRINT]\n${synthesizedPrompt}\n\n[SIMULATED MODEL RESPONSE]\n${simulatedResponse}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSynthesizeSandbox = () => {
    setIsSynthesizing(true);
    setSynthesisProgress(0);
    setTyperText('');
    setSimulatedResponse('');
    
    if (ambientAudioOn || keyboardClicksOn) {
      getAudioContext();
    }

    let count = 0;
    const interval = setInterval(() => {
      count += 5;
      setSynthesisProgress(count);
      if (count >= 100) {
        clearInterval(interval);
        
        const currentTopic = topic.trim() || selectedTemplate.defaultTopic;
        const compiledPrompt = `Act as an expert [${selectedTemplate.role}]. Apply a [${selectedMood.label}] atmosphere. Speak directly in the style of [${selectedPersona.name}] with a creative randomness setting of temperature=${temperature}. Structure a beautiful response around this concept: "${currentTopic}".`;
        
        let simulatedText = '';
        if (selectedTemplate.id === 'story') {
          simulatedText = `${selectedPersona.prefix}
"Once upon a quiet tick of the clock, ${currentTopic}. Drops of warm rain rhythmically tapped against the high glass ceiling, while amber flames danced slowly inside a porcelain heater. 

Everything was draped in a soft, low-fidelity hum—the perfect room to sit, brew a jasmine tea, and let thoughts wander like clouds."`;
        } else if (selectedTemplate.id === 'hooks') {
          simulatedText = `${selectedPersona.prefix}
"🎬 THE INSTA HOOK METRIC:
'The world is moving at 100fps, but what happens when we slow down to just enjoy the learning?'

📌 THE SPREAD STRATEGY:
1. Cover Title Layout: Keep your face top-cropped for organic, premium contrast.
2. Hook Option A: 'This simple template saved me 12 hours of prompt writing.'
3. Caption formula: Share 3 warm truths + an invitation to comment below."`;
        } else if (selectedTemplate.id === 'visualizer') {
          simulatedText = `${selectedPersona.prefix}
"Prompt blueprint for Midjourney v6/Imagen:
/imagine prompt: A high-fidelity cinematic close-up photo of ${currentTopic}, cinematic back-lighting, deep warm film grain, highly cozy lofi aesthetic, natural morning sunshine pouring through leaves, soft volumetric dust particles floating in air, shot with Hasselblad 500c, 35mm lens, f/1.8 --ar 16:9 --style raw --co 15"`;
        } else if (selectedTemplate.id === 'companion') {
          simulatedText = `${selectedPersona.prefix}
"Let's break down this concept of: '${currentTopic}'.

Imagine your memory represents a cozy, hand-crafted spice cabinet in a cottage. Each drawer contains a small labeled glass jar of early-morning dry tea leaves, cinnamon sticks, or matcha green powder. 

If you request a cup of cinnamon tea, you don't dump the entire drawer! You query a single jar, retrieve two dry pieces, and steep them elegantly. That is exactly how database queries pull records, keeping your workspace delightfully neat!"`;
        } else {
          simulatedText = `${selectedPersona.prefix}
"I've initialized the framework for: '${currentTopic}' under a custom [${selectedTemplate.role}] configuration. 

Here is a highly synthesized response aligned to your mood setup:
- Aesthetic Element: Low-frequency ${selectedMood.label} ambient filters.
- Core Action: We are organizing ${currentTopic} through a mellow, simplified workflow.
- Step One: Keep the scope constrained.
- Step Two: Structure the visual metadata carefully."`;
        }

        setSynthesizedPrompt(compiledPrompt);
        setSimulatedResponse(simulatedText);
        setIsSynthesizing(false);
      }
    }, 45);
  };

  useEffect(() => {
    if (!simulatedResponse) return;
    
    let index = 0;
    const promptTyping = setInterval(() => {
      setTyperText(simulatedResponse.slice(0, index));
      index += 3;
      
      if (keyboardClicksOn && Math.random() > 0.45 && index <= simulatedResponse.length) {
        playKeystrokeSound();
      }

      if (index > simulatedResponse.length) {
        clearInterval(promptTyping);
      }
    }, 8);

    return () => clearInterval(promptTyping);
  }, [simulatedResponse, keyboardClicksOn]);

  const handleAddTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newRole || !newDesc) return;

    const added: PromptTemplate = {
      id: `custom_${Date.now()}`,
      title: newTitle,
      role: newRole,
      description: newDesc,
      icon: newIcon,
      defaultTopic: newTopic || 'How trees communicate in a dense emerald forest',
      placeholderText: 'e.g., Design a warm garden cabin...'
    };

    setTemplates([...templates, added]);
    setSelectedTemplate(added);
    setShowAddModal(false);
    
    setNewTitle('');
    setNewRole('');
    setNewDesc('');
    setNewTopic('');
  };

  const handleDeleteTemplate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = templates.filter(t => t.id !== id);
    setTemplates(updated);
    if (selectedTemplate.id === id) {
      setSelectedTemplate(updated[0] || INITIAL_TEMPLATES[0]);
    }
  };

  return (
    <section id="playroom" className="py-24 bg-bg-primary relative overflow-hidden font-sans">
      {/* Dynamic atmospheric ambient gradients */}
      <div className="absolute top-[5%] right-[5%] w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[2%] w-[400px] h-[400px] bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-px bg-brand-cyan"></span>
            <span className="text-xs font-mono text-brand-cyan uppercase tracking-widest leading-none font-bold">CREATIVE AI COLLAB LAB</span>
            <span className="w-8 h-px bg-brand-cyan"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight leading-tight">
            The Interactive <span className="font-serif italic text-brand-cyan">AI Playroom</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-[15px] leading-relaxed">
            Brainstorm viral content ideas, scripts, and cinematic scene structures using my custom neural mastermind, or play with the parameters in the playground constructor.
          </p>

          {/* Interactive Multi-mode Tab Switcher */}
          <div className="mt-8 inline-flex p-1.5 bg-slate-950/80 border border-white/5 rounded-2xl">
            <button
              onClick={() => setActiveTab('chatbot')}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'chatbot'
                  ? 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white shadow-md shadow-brand-cyan/10'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <MessageSquare className="w-4.5 h-4.5" />
              <span>🤖 AI Idea Chatbot</span>
            </button>
            <button
              onClick={() => setActiveTab('sandbox')}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'sandbox'
                  ? 'bg-gradient-to-r from-teal-500 to-indigo-600 text-white shadow-md shadow-teal-500/10'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sliders className="w-4.5 h-4.5" />
              <span>⚡ prompt Sandbox</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: AI CONTENT IDEA GENERATOR CHATBOT (DEFAULT USER EXP) */}
        {/* ======================================================== */}
        {activeTab === 'chatbot' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            
            {/* Left Block: Option Selectors Panel */}
            <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6">
              
              {/* Option step 1: Area Selection (Genre) */}
              <div className="glass-panel p-6 rounded-3xl bg-slate-900/60 border border-white/5 shadow-xl text-left">
                <span className="text-[10px] font-mono text-brand-cyan tracking-widest uppercase block mb-1.5 font-bold">
                  STEP 1 // CHOOSE CONTENT AREA & GENRE
                </span>
                <p className="text-[11px] text-slate-400 mb-4 font-sans">
                  Choose a storytelling domain to shape the AI's creative tone.
                </p>

                <div className="flex flex-col gap-2.5">
                  {GENRES.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setChatbotGenre(g.id)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                        chatbotGenre === g.id
                          ? 'border-brand-cyan bg-brand-cyan/10 text-white shadow-sm shadow-brand-cyan/5'
                          : 'border-white/5 bg-slate-950/40 text-slate-400 hover:bg-slate-900/30 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{g.name.split(' ')[0]}</span>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white font-mono uppercase tracking-wide">
                            {g.name.slice(3)}
                          </span>
                          <span className="text-[10px] text-slate-450 leading-normal mt-0.5">
                            {g.description}
                          </span>
                        </div>
                      </div>
                      <div className={`w-2 h-2 rounded-full transition-all ${chatbotGenre === g.id ? 'bg-brand-cyan animate-pulseScale' : 'bg-transparent border border-slate-700'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Option step 2: Shoot Category & Mood Parameters */}
              <div className="glass-panel p-6 rounded-3xl bg-slate-900/60 border border-white/5 shadow-xl text-left">
                <span className="text-[10px] font-mono text-brand-cyan tracking-widest uppercase block mb-3.5 font-bold">
                  STEP 2 // PLATFORM FORMAT & ATMOSPHERE
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category format */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                      Category Format
                    </label>
                    <select
                      value={chatbotFormat}
                      onChange={(e) => setChatbotFormat(e.target.value)}
                      className="w-full bg-slate-950/90 border border-white/10 rounded-xl px-3.5 py-3 text-xs text-slate-200 focus:outline-none focus:border-brand-cyan cursor-pointer transition-all"
                    >
                      {FORMATS.map((f) => (
                        <option key={f.id} value={f.id}>{f.icon} {f.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Atmosphere Treatment */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                      Tone & Atmosphere
                    </label>
                    <select
                      value={chatbotAtmosphere}
                      onChange={(e) => setChatbotAtmosphere(e.target.value)}
                      className="w-full bg-slate-950/90 border border-white/10 rounded-xl px-3.5 py-3 text-xs text-slate-200 focus:outline-none focus:border-brand-cyan cursor-pointer transition-all"
                    >
                      {ATMO_TONES.map((a) => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Preset idea prompts related to current genre selection */}
                <div className="mt-5 pt-4 border-t border-white/5">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-bold block mb-2">
                    ⚡ Quick-Pick Hot Topics
                  </span>
                  
                  <div className="flex flex-wrap gap-2">
                    {GENRE_SUGGESTED_PROMPTS[chatbotGenre]?.map((p, index) => (
                      <button
                        key={index}
                        onClick={() => setRawPromptInput(p)}
                        className="text-[10px] text-slate-350 hover:text-white px-3 py-1.5 bg-slate-950/80 hover:bg-brand-cyan/20 border border-white/5 hover:border-brand-cyan/30 rounded-xl text-left transition-all leading-relaxed cursor-pointer"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Muffled mechanical clicking toggle */}
              <div className="p-4 rounded-2xl bg-slate-950/40 border border-white/5 flex items-center justify-between text-left">
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-mono text-slate-300 font-bold uppercase">PHYSICAL ACOUSTIC FEEDBACK</span>
                  <p className="text-[9px] text-slate-500 leading-tight">Plays satisfying typing pops during generation.</p>
                </div>
                <button
                  onClick={() => setKeyboardClicksOn(!keyboardClicksOn)}
                  className={`py-1.5 px-3 rounded-lg border font-mono text-[9px] transition-all cursor-pointer ${
                    keyboardClicksOn
                      ? 'border-brand-cyan/20 bg-brand-cyan/10 text-brand-cyan'
                      : 'border-white/5 bg-slate-950/80 text-slate-500'
                  }`}
                >
                  {keyboardClicksOn ? '⌨️ Pops Active' : '⌨️ Silent'}
                </button>
              </div>

            </div>

            {/* Right Block: Live Chatbot Terminal Box */}
            <div className="lg:col-span-12 xl:col-span-7 flex flex-col h-[570px] bg-slate-950 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden text-left">
              
              {/* Terminal Head Bar */}
              <div className="flex items-center justify-between px-6 py-4 bg-slate-900/80 border-b border-white/5 select-none">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-xl bg-brand-cyan/15 border border-brand-cyan/30 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-brand-cyan" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-950 animate-pulse" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white font-mono uppercase tracking-wider leading-none">
                      AGORATHM_BOT // CONTENT MASTERMIND
                    </span>
                    <span className="text-[9px] text-slate-500 leading-none mt-1">
                      Gemini Server Node Enabled
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono border border-white/10 text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded-lg select-text uppercase tracking-wider">
                    {GENRES.find(g => g.id === chatbotGenre)?.name.split(' ')[1]}
                  </span>
                </div>
              </div>

              {/* Chat Thread Messages Box */}
              <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-5 custom-scrollbar bg-slate-950/45 relative select-text">
                {chatHistory.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col max-w-[85%] ${
                      msg.role === 'user' ? 'self-end items-end' : 'self-start items-start'
                    }`}
                  >
                    {/* Role name row */}
                    <span className="text-[9px] font-mono tracking-widest text-slate-550 mb-1 leading-none uppercase">
                      {msg.role === 'user' ? 'CREATOR // INPUT' : 'AGORATHM // CRITIQUE'}
                    </span>

                    {/* Chat Bubble card */}
                    <div
                      className={`p-4 rounded-2xl relative text-xs leading-relaxed text-slate-200 border whitespace-pre-wrap ${
                        msg.role === 'user'
                          ? 'bg-slate-900 border-white/10 rounded-tr-sm text-right font-mono'
                          : 'bg-slate-900/40 border-brand-cyan/10 rounded-tl-sm text-left'
                      }`}
                    >
                      {/* Standard parsing for Markdown rendering simplified fallback */}
                      {currentlyTypingIndex === idx ? (
                        <span>
                          {chatTypingText}
                          <span className="inline-block w-1.5 h-4 bg-brand-cyan ml-0.5 animate-pulse" />
                        </span>
                      ) : (
                        <div>
                          {msg.content}
                        </div>
                      )}

                      {/* Floating actions for Assistant message ideas */}
                      {msg.role === 'assistant' && msg.content && (
                        <div className="flex items-center justify-end gap-2 mt-3 pt-2.5 border-t border-white/5 select-none">
                          <button
                            onClick={() => handleCopyChatMessage(msg.content, idx)}
                            className="px-2 py-1 rounded bg-slate-950 border border-white/5 font-mono text-[9px] hover:text-white text-slate-450 transition-all flex items-center gap-1 cursor-pointer"
                          >
                            {chatCopiedIndex === idx ? (
                              <CheckCircle2 className="w-3 h-3 text-brand-cyan" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                            <span>{chatCopiedIndex === idx ? 'Copied' : 'Copy blueprint'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isChatLoading && (
                  <div className="flex flex-col self-start items-start max-w-[80%] animate-pulse">
                    <span className="text-[9px] font-mono text-slate-550 mb-1 leading-none uppercase">
                      AGORATHM is thinking...
                    </span>
                    <div className="p-4 rounded-2xl bg-slate-900/20 border border-white/5 text-slate-500 text-xs flex items-center gap-2">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-brand-cyan" />
                      <span>Synthesizing structural hook formulas and scene outlines...</span>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Chat Input Bar */}
              <div className="p-4 bg-slate-900/60 border-t border-white/5 relative flex items-center gap-2 select-none">
                <input
                  type="text"
                  value={rawPromptInput}
                  onChange={(e) => setRawPromptInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleChatSubmit();
                  }}
                  id="chat-concept-input"
                  placeholder="Type a creative topic (e.g. 'haunted camera', 'existential fridge')..."
                  className="flex-grow bg-slate-950 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-slate-200 placeholder:text-slate-650 focus:outline-none focus:border-brand-cyan"
                />

                <button
                  onClick={() => handleChatSubmit()}
                  disabled={isChatLoading || !rawPromptInput.trim()}
                  id="chatbot-generate-btn"
                  className="px-5 py-3.5 bg-gradient-to-r from-brand-blue to-brand-cyan hover:glow-cyan text-white text-xs font-mono font-bold uppercase rounded-xl tracking-wider transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
                  title="Submit instruction details"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Brainstorm</span>
                </button>
              </div>

            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: ORIGINAL PROMPT PARAMETER SANDBOX */}
        {/* ======================================================== */}
        {activeTab === 'sandbox' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            
            {/* Left Block: Original Tuning Panel */}
            <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6">
              
              {/* Select/Create Role Blueprint */}
              <div className="glass-panel p-6 rounded-3xl bg-slate-900/60 border border-white/5 relative shadow-xl text-left">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-mono text-brand-cyan tracking-widest uppercase font-bold">
                    STEP_1 // AGENT ROLE BLUEPRINT
                  </span>
                  <button
                    onClick={() => setShowAddModal(!showAddModal)}
                    className="px-2.5 py-1 bg-white/5 hover:bg-brand-cyan/20 border border-white/10 hover:border-brand-cyan/20 text-brand-cyan text-[10px] font-mono rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Custom Node</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {templates.map((temp) => (
                    <button
                      key={temp.id}
                      onClick={() => setSelectedTemplate(temp)}
                      className={`flex items-start gap-3 p-3 rounded-2xl border text-left cursor-pointer transition-all relative group ${
                        selectedTemplate.id === temp.id
                          ? 'border-brand-cyan bg-brand-cyan/10 text-white shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                          : 'border-white/5 bg-slate-950/40 text-slate-400 hover:bg-slate-900/50 hover:text-white'
                      }`}
                    >
                      <span className="text-2xl select-none pt-0.5">{temp.icon}</span>
                      <div className="flex flex-col min-w-0 pr-4">
                        <span className="text-xs font-display font-semibold text-white tracking-wide truncate">
                          {temp.title}
                        </span>
                        <span className="text-[10px] text-slate-400 leading-tight mt-0.5 line-clamp-2">
                          {temp.description}
                        </span>
                      </div>

                      {temp.id.startsWith('custom_') && (
                        <button
                          onClick={(e) => handleDeleteTemplate(temp.id, e)}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 hover:text-rose-450 p-1 rounded bg-slate-950 border border-white/5 text-slate-500 transition-all"
                          title="Delete custom node"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </button>
                  ))}
                </div>

                <AnimatePresence>
                  {showAddModal && (
                    <motion.form
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      onSubmit={handleAddTemplate}
                      className="mt-4 p-4 rounded-2xl bg-slate-950 border border-white/10 flex flex-col gap-3 text-xs"
                    >
                      <div className="flex items-center justify-between pb-1 border-b border-white/5">
                        <span className="font-mono text-[9px] text-brand-gold uppercase tracking-widest font-bold font-bold">CREATE CUSTOM AGENT MODEL</span>
                        <span className="p-1 text-slate-500 cursor-pointer hover:text-white" onClick={() => setShowAddModal(false)}>✕</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-mono text-slate-400">Node Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Vintage Novelist"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="bg-slate-900 border border-white/5 rounded-lg px-2.5 py-1.5 text-white focus:outline-none"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-mono text-slate-400">Role Instruction</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Retro Sci-Fi Writer"
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                            className="bg-slate-900 border border-white/5 rounded-lg px-2.5 py-1.5 text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-mono text-slate-400">Prompt Description</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Crafting cozy retro space exploration journals."
                          value={newDesc}
                          onChange={(e) => setNewDesc(e.target.value)}
                          className="bg-slate-900 border border-white/5 rounded-lg px-2.5 py-1.5 text-white focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-2 flex flex-col gap-1">
                          <label className="text-[9px] font-mono text-slate-400">Default Input Prompt</label>
                          <input
                            type="text"
                            placeholder="e.g. A solar sailboat at Saturn..."
                            value={newTopic}
                            onChange={(e) => setNewTopic(e.target.value)}
                            className="bg-slate-900 border border-white/5 rounded-lg px-2.5 py-1.5 text-white focus:outline-none"
                          />
                        </div>
                        <div className="col-span-1 flex flex-col gap-1">
                          <label className="text-[9px] font-mono text-slate-400">Emoji Icon</label>
                          <select
                            value={newIcon}
                            onChange={(e) => setNewIcon(e.target.value)}
                            className="bg-slate-900 border border-white/5 rounded-lg px-2.5 py-1.5 text-white focus:outline-none"
                          >
                            <option value="💫">💫 Star</option>
                            <option value="🍳">🍳 Kitchen</option>
                            <option value="☕">☕ Cafe</option>
                            <option value="🌲">🌲 Forest</option>
                            <option value="🛸">🛸 Space</option>
                            <option value="🕯️">🕯️ Candle</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="py-1.5 bg-brand-cyan/20 border border-brand-cyan/40 hover:bg-brand-cyan text-white font-mono text-[9px] uppercase tracking-widest rounded-lg font-bold transition-all cursor-pointer"
                      >
                        Initialize System Node
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              {/* Step 2 parameters */}
              <div className="glass-panel p-6 rounded-3xl bg-slate-900/60 border border-white/5 relative shadow-xl text-left">
                <span className="text-[9px] font-mono text-brand-cyan tracking-widest uppercase block mb-3 font-bold font-bold">
                  STEP_2 // CRITICAL PARAMETER TUNERS
                </span>

                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center justify-between">
                      <span>Task Context/Topic</span>
                    </span>
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder={selectedTemplate.placeholderText}
                      className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-655 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                        Atmosphere
                      </label>
                      <select
                        value={selectedMood.id}
                        onChange={(e) => {
                          const hit = MOODS.find((m) => m.id === e.target.value);
                          if (hit) setSelectedMood(hit);
                        }}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none cursor-pointer"
                      >
                        {MOODS.map((m) => (
                          <option key={m.id} value={m.id}>{m.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                        Persona
                      </label>
                      <select
                        value={selectedPersona.id}
                        onChange={(e) => {
                          const hit = PERSONAS.find((p) => p.id === e.target.value);
                          if (hit) setSelectedPersona(hit);
                        }}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none cursor-pointer"
                      >
                        {PERSONAS.map((p) => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-slate-950/40 border border-white/5">
                    <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-slate-400">
                      <span className="flex items-center gap-1 font-bold">
                        <Flame className="w-3.5 h-3.5 text-brand-cyan" />
                        CREATIVITY TEMPERATURE
                      </span>
                      <span className="text-brand-cyan font-bold font-mono text-xs">{temperature}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-[9px] font-mono text-slate-500">Predictable</span>
                      <input
                        type="range"
                        min="0.2"
                        max="1.2"
                        step="0.1"
                        value={temperature}
                        onChange={(e) => setTemperature(parseFloat(e.target.value))}
                        className="flex-grow accent-brand-cyan"
                      />
                      <span className="text-[9px] font-mono text-slate-500">Creative</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSynthesizeSandbox}
                    disabled={isSynthesizing}
                    className="w-full mt-2 py-4 bg-gradient-to-r from-teal-500 to-indigo-600 text-white text-xs font-mono font-bold tracking-widest rounded-xl shadow-lg uppercase transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSynthesizing ? 'animate-spin' : ''}`} />
                    <span>Synthesize Prompt Node</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Right Block: Sandbox Console Outputs */}
            <div className="lg:col-span-12 xl:col-span-7 flex flex-col h-[525px] rounded-2xl border border-white/15 bg-slate-950 shadow-2xl overflow-hidden relative text-left">
              
              <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-white/5 select-none">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-brand-cyan" />
                  <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase font-bold">
                    CO-CREATION_NODE_COMPILER // RUNNING
                  </span>
                </div>

                <button
                  onClick={handleCopySandbox}
                  disabled={!simulatedResponse}
                  className="p-1 px-2.5 rounded-lg border border-white/5 hover:border-white/10 bg-slate-950 text-slate-400 hover:text-white text-[10px] font-mono flex items-center gap-1 transition-all cursor-pointer disabled:opacity-40"
                >
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-grow font-mono text-xs flex flex-col gap-6 custom-scrollbar relative">
                
                <AnimatePresence>
                  {isSynthesizing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-slate-950/90 z-20 flex flex-col items-center justify-center p-6 text-center select-none"
                    >
                      <div className="relative mb-5">
                        <div className="w-12 h-12 rounded-full border-2 border-slate-900 border-t-brand-cyan animate-spin" />
                      </div>
                      <span className="text-white text-[11px] font-mono uppercase tracking-widest font-bold">
                        Compiling Cognitive Instruction Blocks...
                      </span>
                      <div className="w-40 h-1 bg-slate-800 rounded-full overflow-hidden mt-3 max-w-[200px]">
                        <div 
                          className="h-full bg-brand-cyan transition-all"
                          style={{ width: `${synthesisProgress}%` }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!simulatedResponse && !isSynthesizing && (
                  <div className="flex flex-col items-center justify-center py-24 text-center gap-5 text-slate-500 select-none max-w-sm mx-auto">
                    <Laptop className="w-11 h-11 text-slate-700 animate-pulse" />
                    <div>
                      <span className="text-white font-mono text-[11px] uppercase tracking-widest font-bold block mb-1">
                        SANDBOX CONSOLE READY
                      </span>
                      <p className="text-[10px] leading-relaxed">
                        Customize templates, then click <strong className="text-brand-cyan uppercase">Synthesize Prompt Node</strong> to view instructions and watch typewriter rendering!
                      </p>
                    </div>
                  </div>
                )}

                {simulatedResponse && (
                  <div className="flex flex-col gap-5 pt-1 animate-fadeIn leading-relaxed text-slate-350">
                    
                    {/* Anatomies */}
                    <div className="p-4 bg-slate-900/60 rounded-xl border border-white/5 text-[11px]">
                      <span>Act as an expert </span>
                      <span 
                        onMouseEnter={() => { setHoveredPart('role'); setActiveExplainKey('role'); }}
                        className={`cursor-pointer transition-all border-b px-1 py-0.5 rounded font-bold ${
                          hoveredPart === 'role' || activeExplainKey === 'role'
                            ? 'bg-brand-cyan/20 border-brand-cyan text-white shadow-sm'
                            : 'border-brand-cyan/30 text-brand-cyan'
                        }`}
                      >
                        [{selectedTemplate.role}]
                      </span>
                      <span>. Apply a </span>
                      <span 
                        onMouseEnter={() => { setHoveredPart('atmosphere'); setActiveExplainKey('atmosphere'); }}
                        className={`cursor-pointer transition-all border-b px-1 py-0.5 rounded font-bold ${
                          hoveredPart === 'atmosphere' || activeExplainKey === 'atmosphere'
                            ? 'bg-amber-500/20 border-amber-500 text-white shadow-sm'
                            : 'border-amber-500/30 text-amber-300'
                        }`}
                      >
                        [{selectedMood.label}]
                      </span>
                      <span> atmosphere. Speak in </span>
                      <span 
                        onMouseEnter={() => { setHoveredPart('persona'); setActiveExplainKey('persona'); }}
                        className={`cursor-pointer transition-all border-b px-1 py-0.5 rounded font-bold ${
                          hoveredPart === 'persona' || activeExplainKey === 'persona'
                            ? 'bg-fuchsia-500/20 border-fuchsia-400 text-white shadow-sm'
                            : 'border-fuchsia-400/30 text-fuchsia-400'
                        }`}
                      >
                        [{selectedPersona.name}]
                      </span>
                      <span> with setting </span>
                      <span 
                        onMouseEnter={() => { setHoveredPart('temp'); setActiveExplainKey('temp'); }}
                        className={`cursor-pointer transition-all border-b px-1 py-0.5 rounded font-bold ${
                          hoveredPart === 'temp' || activeExplainKey === 'temp'
                            ? 'bg-indigo-500/20 border-indigo-500 text-white shadow-sm'
                            : 'border-indigo-500/30 text-indigo-400'
                        }`}
                      >
                        temperature={temperature}
                      </span>
                      <span> around: </span>
                      <span 
                        onMouseEnter={() => { setHoveredPart('topic'); setActiveExplainKey('topic'); }}
                        className={`cursor-pointer transition-all border-b px-1 py-0.5 rounded font-bold ${
                          hoveredPart === 'topic' || activeExplainKey === 'topic'
                            ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-sm'
                            : 'border-emerald-500/30 text-emerald-400'
                        }`}
                      >
                        "{topic || selectedTemplate.defaultTopic}"
                      </span>
                    </div>

                    {/* Explainer card segment */}
                    <div className="p-4 bg-slate-900 border border-white/5 rounded-xl text-[11px]">
                      <div className="flex items-center gap-1.5 text-brand-gold text-xs font-bold font-mono">
                        <Info className="w-3.5 h-3.5" />
                        <span>{EXPLAINERS[activeExplainKey].title}</span>
                        <code className="text-[10px] ml-auto px-1.5 py-0.5 bg-slate-950 text-slate-400 rounded">
                          {EXPLAINERS[activeExplainKey].tag}
                        </code>
                      </div>
                      <p className="mt-2 text-slate-350 text-[10.5px]">
                        {EXPLAINERS[activeExplainKey].concept}
                      </p>
                    </div>

                    {/* Typewriter segment */}
                    <div className="p-4 bg-slate-950 border border-white/5 rounded-xl text-slate-100 text-xs text-left select-text whitespace-pre-wrap">
                      {typerText}
                      {typerText.length < simulatedResponse.length && (
                        <span className="inline-block w-1.5 h-3 bg-brand-cyan animate-pulse ml-0.5" />
                      )}
                    </div>

                  </div>
                )}

              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}

// Custom simple Icons to avoid import bugs
function KeyboardIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M10 8h.01M14 8h.01M18 8h.01M6 12h.01M18 12h.01M10 12h.01M14 12h.01M14 16H10M6 8h.01" />
      <rect width="20" height="12" x="2" y="5" rx="2" />
    </svg>
  );
}
