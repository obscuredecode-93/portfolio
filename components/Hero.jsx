'use client';

import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import TypewriterEffect from '@/components/ui/TypewriterEffect';

// Canvas particle background must be server-side-render disabled
// because it calls window.innerWidth and canvas.getContext('2d').
const ParticleBackground = dynamic(
  () => import('@/components/ui/ParticleBackground'),
  { ssr: false }
);

function scrollTo(id) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
}

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 40 },
  animate:    { opacity: 1, y:  0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
});

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Constellation particle background */}
      <ParticleBackground />

      {/* Radial glow at centre */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,102,255,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.p
          {...fadeUp(0.1)}
          className="text-cyan text-sm font-semibold tracking-widest uppercase mb-4"
        >
          Welcome to my portfolio
        </motion.p>

        {/* Name */}
        <motion.h1
          {...fadeUp(0.25)}
          className="text-5xl md:text-7xl font-bold leading-tight mb-6"
        >
          <span className="text-white">Hi, I&apos;m </span>
          <span className="gradient-text">Anurag</span>
          <br />
          <span className="gradient-text">Lakshminarayan</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div {...fadeUp(0.45)} className="text-xl md:text-2xl text-white/80 mb-6 h-9">
          I&apos;m a&nbsp;
          <TypewriterEffect />
        </motion.div>

        {/* One-liner */}
        <motion.p
          {...fadeUp(0.6)}
          className="text-white/50 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Building scalable web applications and intelligent AI systems with 8+ years of
          full-stack expertise.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.75)} className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => scrollTo('#projects')}
            className="btn-primary text-base px-8 py-3"
          >
            View My Work
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="btn-ghost text-base px-8 py-3"
          >
            Contact Me
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
        <svg className="w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
