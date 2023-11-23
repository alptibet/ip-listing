import { NextRequest, NextResponse } from 'next/server';
import { dbClient } from '@/db/db';
import { drizzle } from 'drizzle-orm/postgres-js';

export async function GET() {
  try {
    const projects = await dbClient.query.projects.findMany();
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

// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   try {
//     const newProject = await prisma.project.create({
//       data: { name: body.name },
//     });
//     return NextResponse.json(newProject, { status: 201 });
//   } catch (error: Prisma.PrismaClientKnownRequestError | any) {
//     return NextResponse.json(
//       {
//         message: error.message,
//       },
//       { status: 400 }
//     );
//   }
// }
//
// export async function DELETE(req: NextRequest) {
//   const body = await req.json();
//   try {
//     const deleteDevice = await prisma.project.delete({
//       where: {
//         name: body,
//       },
//     });
//     return NextResponse.json(deleteDevice, { status: 201 });
//   } catch (error: Prisma.PrismaClientKnownRequestError | any) {
//     return NextResponse.json(
//       {
//         message: error.message,
//       },
//       { status: 400 }
//     );
//   }
// }
