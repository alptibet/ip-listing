import { NextRequest, NextResponse } from 'next/server';
import { dbClient } from '@/db/db';
import { devices, projects } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const projects = await dbClient.query.projects.findMany({
      with: { devices: true },
    });
    return NextResponse.json(projects, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 400 }
    );
  }
}
console.log('fd');
export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const newProject = await dbClient
      .insert(projects)
      .values({ name: body.name })
      .returning();
    return NextResponse.json(newProject, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  try {
    const deleteProject = await dbClient
      .delete(projects)
      .where(eq(projects.name, body.name))
      .returning();

    await dbClient
      .delete(devices)
      .where(eq(devices.projectId, deleteProject[0].id));

    return NextResponse.json(deleteProject, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 400 }
    );
  }
}
