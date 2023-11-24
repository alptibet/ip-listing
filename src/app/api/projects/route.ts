import { NextRequest, NextResponse } from 'next/server';
import { dbClient } from '@/db/db';
import { projects } from '@/db/schema';
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

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const newProject = await dbClient.insert(projects).values(body).returning();
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
    const deleteDevice = await dbClient
      .delete(projects)
      .where(eq(projects.name, body))
      .returning();
    return NextResponse.json(deleteDevice, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 400 }
    );
  }
}
