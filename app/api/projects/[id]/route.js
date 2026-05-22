import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { connectDB } from '@/lib/mongodb';
import Project from '@/models/Project';

// Auth guard shared by PUT and DELETE.
async function requireAuth() {
  const session = await getServerSession(authOptions);
  return session;
}

// PUT /api/projects/[id] — update a project
export async function PUT(request, { params }) {
  try {
    const session = await requireAuth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const body = await request.json();
    const updated = await Project.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error('[PUT /api/projects/:id]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/projects/[id] — remove a project
export async function DELETE(request, { params }) {
  try {
    const session = await requireAuth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Deleted' }, { status: 200 });
  } catch (err) {
    console.error('[DELETE /api/projects/:id]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
