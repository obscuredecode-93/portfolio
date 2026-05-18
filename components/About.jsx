'use client';

import { motion } from 'motion/react';

const STATS = [
  { value: '8+',    label: 'Years Experience' },
  { value: '3',     label: 'Deployed Projects' },
  { value: 'AI',    label: 'Specialist' },
];

const SKILL_CATEGORIES = [
  { category: 'Backend',   color: '#00D4FF', skills: ['Node.js', 'Express', 'Hono', 'REST APIs', 'GraphQL'] },
  { category: 'Frontend',  color: '#4488FF', skills: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'] },
  { category: 'AI / LLM',  color: '#AA44FF', skills: ['LangChain.js', 'Groq API', 'HuggingFace', 'RAG', 'Prompt Engineering'] },
  { category: 'Databases', color: '#00DDAA', skills: ['MongoDB', 'Qdrant', 'PostgreSQL', 'Mongoose'] },
];

const fadeIn = (delay = 0, dir = 'up') => ({
  initial:    { opacity: 0, [dir === 'up' ? 'y' : 'x']: dir === 'left' ? -30 : 30 },
  whileInView:{ opacity: 1, y: 0, x: 0 },
  viewport:   { once: true, margin: '-60px' },
  transition: { duration: 0.6, delay },
});

export default function About() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div {...fadeIn()} className="text-center mb-16">
          <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-3">Who I am</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">About Me</span>
          </h2>
        </motion.div>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — bio */}
          <motion.div {...fadeIn(0.1, 'left')}>
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-5">
                Senior Full Stack JavaScript Engineer
              </h3>
              <div className="space-y-4 text-white/65 text-base leading-relaxed">
                <p>
                  I&apos;m a passionate full-stack engineer with 8+ years of experience building
                  scalable, production-grade web applications. I specialise in the MERN stack
                  and modern JavaScript ecosystems.
                </p>
                <p>
                  Beyond traditional web development, I work extensively with AI and LLM
                  integrations — building RAG pipelines, streaming chat applications, and
                  intelligent systems powered by Groq, LangChain.js, and vector databases.
                </p>
                <p>
                  I care deeply about clean architecture, developer experience, and shipping
                  products that users actually enjoy.
                </p>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {STATS.map(({ value, label }) => (
                  <div key={label} className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-2xl font-bold gradient-text">{value}</div>
                    <div className="text-white/50 text-xs mt-1 leading-tight">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — skill badges */}
          <motion.div {...fadeIn(0.2, 'right')} className="space-y-5">
            {SKILL_CATEGORIES.map(({ category, color, skills }, i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="glass rounded-xl p-5"
              >
                <h4 className="text-sm font-semibold mb-3" style={{ color }}>
                  {category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 hover:scale-105"
                      style={{
                        backgroundColor: `${color}15`,
                        color,
                        borderColor: `${color}35`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
