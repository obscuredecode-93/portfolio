import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

// Simple contact submission schema (inline, no separate model file needed).
const ContactSchema = new mongoose.Schema(
  { name: String, email: String, message: String },
  { timestamps: true }
);
const Contact =
  mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

// POST /api/contact — store contact form submission
export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await connectDB();
    await Contact.create({ name: name.trim(), email: email.trim(), message: message.trim() });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/contact]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
