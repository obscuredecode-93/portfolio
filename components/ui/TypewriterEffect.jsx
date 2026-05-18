'use client';

import { useState, useEffect } from 'react';

const PHRASES = [
  'Senior Full Stack Engineer',
  'AI/LLM Specialist',
  'React & Node.js Expert',
];

const TYPING_SPEED   = 80;   // ms per character typed
const DELETING_SPEED = 40;   // ms per character deleted
const PAUSE_AFTER    = 2000; // ms to pause when fully typed
const PAUSE_BEFORE   = 500;  // ms to pause before typing next phrase

export default function TypewriterEffect() {
  const [text, setText]           = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx]     = useState(0);
  const [isDeleting, setDeleting] = useState(false);
  const [isPaused, setPaused]     = useState(false);

  useEffect(() => {
    const current = PHRASES[phraseIdx];

    if (isPaused) {
      const t = setTimeout(() => {
        setPaused(false);
        setDeleting(true);
      }, PAUSE_AFTER);
      return () => clearTimeout(t);
    }

    if (!isDeleting && charIdx < current.length) {
      // Typing
      const t = setTimeout(() => {
        setText(current.slice(0, charIdx + 1));
        setCharIdx(charIdx + 1);
      }, TYPING_SPEED);
      return () => clearTimeout(t);
    }

    if (!isDeleting && charIdx === current.length) {
      // Pause before deleting
      setPaused(true);
      return;
    }

    if (isDeleting && charIdx > 0) {
      // Deleting
      const t = setTimeout(() => {
        setText(current.slice(0, charIdx - 1));
        setCharIdx(charIdx - 1);
      }, DELETING_SPEED);
      return () => clearTimeout(t);
    }

    if (isDeleting && charIdx === 0) {
      // Move to next phrase
      const t = setTimeout(() => {
        setDeleting(false);
        setPhraseIdx((phraseIdx + 1) % PHRASES.length);
      }, PAUSE_BEFORE);
      return () => clearTimeout(t);
    }
  }, [text, phraseIdx, charIdx, isDeleting, isPaused]);

  return (
    <span className="text-cyan font-semibold">
      {text}
      <span className="cursor" aria-hidden="true" />
    </span>
  );
}
