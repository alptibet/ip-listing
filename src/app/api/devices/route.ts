// import prisma from '@/lib/prisma';
// import { Prisma } from '@prisma/client';
// import { NextResponse } from 'next/server';
//
// export async function GET() {
//   try {
//     const numDevices = await prisma.device.count();
//     return NextResponse.json(numDevices, { status: 200 });
//   } catch (error: Prisma.PrismaClientKnownRequestError | any) {
//     return NextResponse.json(
//       {
//         message: error.message,
//       },
//       { status: 400 }
//     );
//   }
// }
