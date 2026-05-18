'use client';

import { motion } from 'motion/react';

const CATEGORIES = [
  {
    title: 'Backend',
    icon: '⚙️',
    color: '#00D4FF',
    skills: ['Node.js', 'Express.js', 'Hono', 'REST APIs', 'GraphQL', 'WebSockets', 'JWT Auth'],
  },
  {
    title: 'Frontend',
    icon: '🎨',
    color: '#4488FF',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'HTML5 / CSS3', 'Framer Motion'],
  },
  {
    title: 'AI / LLM',
    icon: '🤖',
    color: '#AA44FF',
    skills: ['LangChain.js', 'Groq API', 'HuggingFace', 'RAG Pipelines', 'Prompt Engineering', 'SSE Streaming'],
  },
  {
    title: 'Databases',
    icon: '🗄️',
    color: '#00DDAA',
    skills: ['MongoDB', 'Mongoose', 'Qdrant', 'PostgreSQL', 'Redis'],
  },
  {
    title: 'DevOps & Tools',
    icon: '🚀',
    color: '#FF8844',
    skills: ['Vercel', 'Render', 'Docker', 'Git / GitHub', 'CI/CD', 'Postman'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-3">
            My toolkit
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-text">Skills & Technologies</span>
          </h2>
        </motion.div>

        {/* Category grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map(({ title, icon, color, skills }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{icon}</span>
                <h3 className="font-bold text-base" style={{ color }}>
                  {title}
                </h3>
              </div>

              {/* Skill badges */}
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-xs font-medium border
                               transition-all duration-200 hover:scale-105 cursor-default"
                    style={{
                      backgroundColor: `${color}12`,
                      color,
                      borderColor:    `${color}30`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
