import { NextRequest, NextResponse } from 'next/server';
import { dbClient } from '@/db/db';
import { devices } from '@/db/schema';
import { eq, inArray } from 'drizzle-orm';

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
      .set({
        name: body.name,
        location: body.location,
        ipAddress: body.ipAddress,
        subnet: body.subnet,
        gateway: body.gateway,
        status: body.status,
        system: body.system,
      })
      .where(eq(devices.id, body.id))
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
      .where(inArray(devices.id, body))
      .returning();
    return NextResponse.json({ deleteDevice }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 400 }
    );
  }
}
