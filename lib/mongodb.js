import mongoose from 'mongoose';

// Global cache survives hot-module-reload in development and
// prevents connection pool exhaustion in serverless environments.
let cached = global.mongoose ?? { conn: null, promise: null };
global.mongoose = cached;

export async function connectDB() {
  // Validate at call-time, not at module-load-time, so the Next.js build
  // can collect route metadata without requiring the env var to be set.
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not defined');
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false, // fail fast rather than silently queuing when disconnected
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null; // allow retry on next call
    throw err;
  }

  return cached.conn;
}
