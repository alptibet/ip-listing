import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: { name: params.name },
      select: { id: true, name: true, devices: true },
    });
    return NextResponse.json(project, { status: 200 });
  } catch (error: Prisma.PrismaClientKnownRequestError | any) {
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
    const newDevice = await prisma.device.create({
      data: body,
    });
    return NextResponse.json({ newDevice }, { status: 201 });
  } catch (error: Prisma.PrismaClientKnownRequestError | any) {
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
    const updateDevice = await prisma.device.update({
      where: {
        id: body.id,
      },
      data: body,
    });
    return NextResponse.json({ updateDevice }, { status: 201 });
  } catch (error: Prisma.PrismaClientKnownRequestError | any) {
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
    const updateDevice = await prisma.device.deleteMany({
      where: {
        id: { in: body },
      },
    });
    return NextResponse.json({ updateDevice }, { status: 201 });
  } catch (error: Prisma.PrismaClientKnownRequestError | any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 400 }
    );
  }
}
