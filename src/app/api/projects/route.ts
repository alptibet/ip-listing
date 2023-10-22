import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const newProject = await prisma.project.create({
      data: { name: body.name },
    });
    return NextResponse.json({ newProject }, { status: 201 });
  } catch (error: Prisma.PrismaClientKnownRequestError | any) {
    return NextResponse.json(
      {
        message: 'There is a project with the same name',
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    const projects = await prisma.project.findMany();
    return NextResponse.json(projects, { status: 200 });
  } catch (error: Prisma.PrismaClientKnownRequestError | any) {
    return NextResponse.json({
      message: error.message,
    });
  }
}
