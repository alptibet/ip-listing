import { NextResponse } from 'next/server';
import { dbClient } from '@/db/db';

export async function GET() {
  try {
    const numDevices = await dbClient.query.devices.findMany({});
    return NextResponse.json(numDevices.length, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 400 }
    );
  }
}
