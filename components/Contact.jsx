'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/obscuredecode-93',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/anurag-lakshminarayan',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:anurag.lakshminarayan93@gmail.com',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  const inputCls =
    'w-full glass rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 ' +
    'focus:outline-none focus:ring-1 focus:ring-cyan/40 focus:border-cyan/30 ' +
    'border-transparent transition-all duration-200';

  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-3">
            Get in touch
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">Contact Me</span>
          </h2>
          <p className="text-white/50 text-base mt-4">
            Have a project in mind? Let&apos;s build something great together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
              <div>
                <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">
                  Name
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputCls}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputCls}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={inputCls}
                  placeholder="Tell me about your project…"
                />
              </div>

              {status === 'success' && (
                <div className="text-green-400 text-sm text-center py-2 glass rounded-lg border border-green-500/30">
                  ✓ Message sent! I&apos;ll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="text-red-400 text-sm text-center py-2 glass rounded-lg border border-red-500/30">
                  Something went wrong. Please email me directly.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          {/* Info + socials */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center gap-8"
          >
            <div className="glass rounded-2xl p-8">
              <h3 className="text-lg font-semibold text-white mb-4">Let&apos;s Connect</h3>
              <p className="text-white/55 text-sm leading-relaxed mb-6">
                I&apos;m open to full-time roles, freelance projects, and interesting
                collaborations. Reach out via the form or directly through any of the
                channels below.
              </p>
              <a
                href="mailto:anurag.lakshminarayan93@gmail.com"
                className="text-cyan text-sm hover:underline break-all"
              >
                anurag.lakshminarayan93@gmail.com
              </a>
            </div>

            <div className="glass rounded-2xl p-8">
              <h3 className="text-lg font-semibold text-white mb-5">Find me on</h3>
              <div className="flex flex-col gap-4">
                {SOCIALS.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-white/60 hover:text-cyan
                               transition-colors duration-200 group"
                  >
                    <span
                      className="p-2.5 glass rounded-xl border border-white/10
                                 group-hover:border-cyan/40 transition-colors duration-200"
                    >
                      {icon}
                    </span>
                    <span className="text-sm font-medium">{label}</span>
                    <svg
                      className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
