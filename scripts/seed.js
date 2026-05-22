/**
 * Seed script — populates MongoDB with the three initial portfolio projects.
 *
 * Run from the portfolio root directory:
 *   node scripts/seed.js
 *
 * Requires .env.local to exist with MONGODB_URI set.
 */

const path    = require('path');
const fs      = require('fs');
const dotenv  = require('dotenv');
const mongoose = require('mongoose');

// Load .env.local (Next.js convention)
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config(); // fallback to .env
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌  MONGODB_URI is not set. Create .env.local first.');
  process.exit(1);
}

const ProjectSchema = new mongoose.Schema(
  {
    name:         { type: String, required: true },
    description:  { type: String, required: true },
    techStack:    { type: [String], default: [] },
    githubUrl:    { type: String, default: '' },
    liveUrl:      { type: String, default: '' },
    displayOrder: { type: Number, default: 0 },
    active:       { type: Boolean, default: true },
  },
  { timestamps: true }
);

const SEED_DATA = [
  {
    name: 'MERN Stack Roguelike Game',
    description:
      'Full stack roguelike game with React UI, Phaser.js engine, special attacks, screen shake and damage numbers.',
    techStack: ['React', 'Phaser.js', 'Node.js', 'MongoDB', 'Express'],
    githubUrl: 'https://github.com/obscuredecode-93',
    liveUrl:   'https://bullzully.vercel.app/',
    displayOrder: 1,
    active: true,
  },
  {
    name: 'Character.ai Clone',
    description:
      'AI character chat application with multiple avatar styles, streaming responses and conversation memory.',
    techStack: ['React', 'Groq API', 'Node.js', 'DiceBear', 'Express'],
    githubUrl: 'https://github.com/obscuredecode-93',
    liveUrl:   'https://groq-streaming-chat.onrender.com',
    displayOrder: 2,
    active: true,
  },
  {
    name: 'RAG Knowledge Base Q&A',
    description:
      'Full RAG pipeline with document ingestion, vector search, streaming SSE responses and per-session conversation memory.',
    techStack: ['LangChain.js', 'Groq API', 'Qdrant', 'Node.js', 'Hono', 'HuggingFace'],
    githubUrl: 'https://github.com/obscuredecode-93',
    liveUrl:   '',
    displayOrder: 3,
    active: true,
  },
];

async function seed() {
  console.log('🔌  Connecting to MongoDB…');
  await mongoose.connect(MONGODB_URI);

  const Project =
    mongoose.models.Project || mongoose.model('Project', ProjectSchema);

  let seeded = 0;
  for (const data of SEED_DATA) {
    const result = await Project.findOneAndUpdate(
      { name: data.name },   // match by name — idempotent
      { $set: data },
      { upsert: true, returnDocument: 'after' }
    );
    seeded++;
    console.log(`  ✓  ${data.name}`);
  }

  console.log(`\n✅  Seeded ${seeded} projects.`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌  Seed failed:', err.message);
  mongoose.disconnect();
  process.exit(1);
});
