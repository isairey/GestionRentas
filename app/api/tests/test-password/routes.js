 import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { plainPassword, hashedPassword } = await req.json();
    
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    
    return NextResponse.json({
      isMatch,
      plainPassword: plainPassword,
      hashedPasswordLength: hashedPassword?.length
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}