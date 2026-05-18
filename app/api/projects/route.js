import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { connectDB } from '@/lib/mongodb';
import Project from '@/models/Project';

// GET /api/projects
// Public — returns active projects sorted by displayOrder.
// GET /api/projects?admin=true (requires auth) — returns ALL projects.
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const adminMode = searchParams.get('admin') === 'true';

    if (adminMode) {
      const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const filter = adminMode ? {} : { active: true };
    const projects = await Project.find(filter).sort({ displayOrder: 1 }).lean();

    return NextResponse.json(projects, { status: 200 });
  } catch (err) {
    console.error('[GET /api/projects]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/projects — admin only
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const project = await Project.create(body);

    return NextResponse.json(project, { status: 201 });
  } catch (err) {
    console.error('[POST /api/projects]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
