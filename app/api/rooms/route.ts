 import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongoose';
import Room from '@/app/models/Room';
 
export async function POST(req: NextRequest) {
  try {
    await connectDB();
   

    const body = await req.json();
    const { roomNumber, title, description, price, features, status } = body;

    if (!roomNumber || !title || !description || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const room = await Room.create({
      roomNumber,
      title,
      description,
      price,
      features: features || [],
      status: status || 'vacant',
    });

    return NextResponse.json(room, { status: 201 });
  } catch (err) {
     return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
 
export async function GET() {
  try {
    await connectDB();
    const rooms = await Room.find().sort({ createdAt: -1 });
    return NextResponse.json(rooms);
  } catch (err) {
     return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

