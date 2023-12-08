import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { dbClient } from '@/db/db';
import { users } from '@/db/schema';

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const hashedPassword = await hash(body.password, 10);
    const newUser = { ...body, password: hashedPassword };
    await dbClient.insert(users).values(newUser);
    return NextResponse.json({ message: 'success' }, { status: 201 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: 'fail' }, { status: 400 });
  }
}
