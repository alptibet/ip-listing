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
      select: { devices: true },
    });
    return NextResponse.json([project], { status: 200 });
  } catch (error: Prisma.PrismaClientKnownRequestError | any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 400 }
    );
  }
}
