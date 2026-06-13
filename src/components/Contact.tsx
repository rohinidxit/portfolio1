/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Copy, Check, Send, AlertCircle, Sparkles, ExternalLink, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactProps {
  profileEmail?: string;
  profilePhone?: string;
  profilePhoneUrl?: string;
  profileLocation?: string;
  profileLocationUrl?: string;
}

export default function Contact({ 
  profileEmail = 'hello@example.com',
  profilePhone = '+1 (415) 385-9921',
  profilePhoneUrl = 'tel:+14153859921',
  profileLocation = 'San Francisco, CA (Standard UTC-8)',
  profileLocationUrl = 'https://www.google.com/maps/search/?api=1&query=San+Francisco,+CA'
}: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const contactDetails = [
    {
      id: 'email',
      label: 'Direct Channels',
      value: profileEmail,
      icon: <Mail className="w-5 h-5 text-brand-cyan" />,
      copyValue: profileEmail,
      href: `mailto:${profileEmail}`
    },
    {
      id: 'phone',
      label: 'Express Dial',
      value: profilePhone,
      icon: <Phone className="w-5 h-5 text-brand-gold" />,
      copyValue: profilePhone.replace('(', '').replace(')', '').replace(/-/g, '').replace(/\s+/g, ''),
      href: profilePhoneUrl
    },
    {
      id: 'location',
      label: 'Deployment Station',
      value: profileLocation,
      icon: <MapPin className="w-5 h-5 text-brand-blue" />,
      copyValue: profileLocation,
      href: profileLocationUrl
    }
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(id);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Identification name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Secure email channel is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Secure channel format is invalid.';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject parameters are required.';
    if (!formData.message.trim()) newErrors.message = 'Transmission logs are empty.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormSubmitting(true);
    
    // Simulate telemetry delay
    setTimeout(() => {
      setFormSubmitting(false);
      setFormSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      // Reset success chip after 8 seconds
      setTimeout(() => setFormSubmitted(false), 8000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-bg-secondary relative overflow-hidden">
      {/* Absolute radial background details */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Heading */}
        <div className="text-center md:text-left mb-16">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
            <span className="w-8 h-px bg-brand-cyan"></span>
            <span className="text-xs font-mono text-brand-cyan uppercase tracking-widest">TRANSMISSION LINK</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
            Initiate a <span className="font-serif italic text-brand-cyan">Collaboration</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl text-[15px]">
            Have a project or strategic vacancy? Fill out the portal parameters or connect via direct dial keys instantly.
          </p>
        </div>

        {/* Split Screen Columns layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12">
          
          {/* Left Column: Direct channels list & socials */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="glass-panel p-6 md:p-8 rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-950 to-slate-900 border border-white/5 flex flex-col gap-6">
              
              <h3 className="text-xl font-display font-bold text-white mb-2">
                Operational Coordinates
              </h3>

              <div className="flex flex-col gap-5">
                {contactDetails.map((channel) => (
                  <div
                    key={channel.id}
                    className="flex flex-col gap-1 p-3.5 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/10 transition-all group"
                  >
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold">
                      {channel.label}
                    </span>
                    <div className="flex items-center justify-between gap-4 mt-1">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-950 border border-white/5 group-hover:border-brand-cyan/20">
                          {channel.icon}
                        </div>
                        <a 
                          href={channel.href}
                          target={channel.id === 'location' ? "_blank" : undefined}
                          rel={channel.id === 'location' ? "noopener noreferrer" : undefined}
                          className="text-[14px] text-slate-200 hover:text-brand-cyan hover:underline transition-all font-mono font-medium truncate max-w-[200px] sm:max-w-xs flex items-center gap-1.5"
                        >
                          {channel.value}
                          {channel.id === 'location' && (
                            <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity text-brand-cyan shrink-0 animate-pulse-slow" />
                          )}
                        </a>
                      </div>

                      {/* Copy on click action indicator button */}
                      <button
                        onClick={() => handleCopy(channel.id, channel.copyValue)}
                        className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer border border-white/5"
                        title="Copy properties"
                      >
                        {copiedField === channel.id ? (
                          <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Networking index Row */}
              <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                  DECENTRALIZED CHANNELS
                </span>
                <div className="flex gap-3">
                  <a
                    href="https://instagram.com/rohinihehe"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-slate-900 border border-white/5 hover:border-brand-cyan/40 hover:text-white text-slate-400 shadow-md transition-all cursor-pointer"
                    aria-label="Access Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-slate-900 border border-white/5 hover:border-brand-cyan/40 hover:text-white text-slate-400 shadow-md transition-all cursor-pointer"
                    aria-label="Access LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://wa.me/919343648744"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-slate-900 border border-white/5 hover:border-brand-cyan/40 hover:text-white text-slate-400 shadow-md transition-all cursor-pointer"
                    aria-label="Connect on WhatsApp"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.456h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Portal form parameters input */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 md:p-8 rounded-3xl bg-gradient-to-tr from-slate-900/40 via-slate-950/60 to-slate-900/40 border border-white/5">
              
              <AnimatePresence mode="wait">
                {formSubmitted ? (
                  // Success confirmation cards
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-8 text-center flex flex-col items-center justify-center gap-4 min-h-[350px]"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/20 text-emerald-500 flex items-center justify-center mb-2 animate-bounce glow-cyan">
                      <Sparkles className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                      Transmission Confirmed!
                    </h3>
                    <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed mt-1">
                      Your collaboration query has bypassed firewalls and landed inside my active workspace index. I will review coordinates and reply within 12 business hours.
                    </p>
                    <div className="font-mono text-[10px] text-emerald-500 bg-emerald-500/5 px-4 py-1.5 rounded border border-emerald-500/20 tracking-wider mt-4">
                      PACKET_HASH_VERIFIED // STATUS_CODE_201_CREATED
                    </div>
                  </motion.div>
                ) : (
                  // Core Submission Form
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                    noValidate
                  >
                    {/* Name block */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-xs font-mono text-slate-400 uppercase tracking-widest font-semibold flex justify-between">
                        <span>Signature Name</span>
                        {errors.name && <span className="text-rose-400 text-[10px] lowercase text-right flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</span>}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Rohini Dixit (example)"
                        className={`w-full px-4 py-3 bg-slate-950 border rounded-xl font-sans text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-all ${
                          errors.name ? 'border-rose-500/60' : 'border-white/5'
                        }`}
                      />
                    </div>

                    {/* Email and Subject grid row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-xs font-mono text-slate-400 uppercase tracking-widest font-semibold flex justify-between">
                          <span>Connection Email</span>
                          {errors.email && <span className="text-rose-400 text-[10px] lowercase text-right flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</span>}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="client@hq.ceo"
                          className={`w-full px-4 py-3 bg-slate-950 border rounded-xl font-mono text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-all ${
                            errors.email ? 'border-rose-500/60' : 'border-white/5'
                          }`}
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="subject" className="text-xs font-mono text-slate-400 uppercase tracking-widest font-semibold flex justify-between">
                          <span>Subject Coordinates</span>
                          {errors.subject && <span className="text-rose-400 text-[10px] lowercase text-right flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.subject}</span>}
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="SaaS Redesign Architecture"
                          className={`w-full px-4 py-3 bg-slate-950 border rounded-xl font-sans text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-all ${
                            errors.subject ? 'border-rose-500/60' : 'border-white/5'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Message block */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-xs font-mono text-slate-400 uppercase tracking-widest font-semibold flex justify-between">
                        <span>Transmission Content</span>
                        {errors.message && <span className="text-rose-400 text-[10px] lowercase text-right flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.message}</span>}
                      </label>
                      <textarea
                        type="text"
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        placeholder="Detail files, deadline scopes, and technology targets..."
                        className={`w-full px-4 py-3 bg-slate-950 border rounded-xl font-sans text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-all resize-none ${
                          errors.message ? 'border-rose-500/60' : 'border-white/5'
                        }`}
                      />
                    </div>

                    {/* Submit trigger with loading support */}
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="mt-2 w-full py-4 rounded-xl text-center bg-gradient-to-r from-brand-blue to-brand-cyan hover:glow-cyan text-white text-xs font-mono font-bold tracking-widest uppercase flex items-center justify-center gap-2 border border-white/5 hover:-translate-y-0.5 transition-all cursor-pointer shadow-lg disabled:opacity-50"
                    >
                      {formSubmitting ? (
                        <>
                          <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                          LAUNCHING SECURE PACKET...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          LAUNCH CORRESPONDENCE
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
