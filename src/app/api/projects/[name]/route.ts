import { NextRequest, NextResponse } from 'next/server';
import { dbClient } from '@/db/db';
import { devices } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const project = await dbClient.query.projects.findFirst({
      with: { devices: true },
      where: (projects, { eq }) => eq(projects.name, params.name),
    });
    return NextResponse.json(project, { status: 200 });
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
    const newDevice = await dbClient
      .insert(devices)
      .values(body.device)
      .returning();
    return NextResponse.json(newDevice, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 400 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  try {
    const updateDevice = await dbClient
      .update(devices)
      .set({}) //complete
      .where(eq(devices.id, body.data.id))
      .returning();
    return NextResponse.json(updateDevice, { status: 201 });
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
      .delete(devices)
      .where(eq(devices.id, body.data.id))
      .returning();
    return NextResponse.json({ updateDevice: deleteDevice }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 400 }
    );
  }
}
