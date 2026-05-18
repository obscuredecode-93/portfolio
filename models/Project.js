import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    name:         { type: String, required: true, trim: true },
    description:  { type: String, required: true, trim: true },
    techStack:    { type: [String], default: [] },
    githubUrl:    { type: String, default: '' },
    liveUrl:      { type: String, default: '' },
    displayOrder: { type: Number, default: 0 },
    active:       { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Singleton guard: prevents "Cannot overwrite model" error on Next.js hot reloads.
export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
