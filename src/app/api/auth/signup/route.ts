import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { newUser } = await request.json();
    //validate username email and password
    console.log(newUser);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}
