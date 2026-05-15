import bcrypt from 'bcryptjs';
import { connectDB } from '@/app/lib/mongoose';
import Tenant from '@/app/models/real-tenant';
import User from '@/app/models/User';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    console.log('🔥 TENANT CREATE STARTED');
    await connectDB();
    const body = await req.json();
 
    const { name, email, phone, roomNumber, rentAmount, moveInDate, gender, password } = body;

     if (!password || password.length < 6) {
      return NextResponse.json({ error: 'Password required (min 6 chars)' }, { status: 400 });
    }

     
    const existingUser = await User.findOne({ roomNumber: roomNumber.trim(), role: 'tenant' });
    if (existingUser) {
      return NextResponse.json({ error: 'Room already registered' }, { status: 409 });
    }

    const existingTenant = await Tenant.findOne({ roomNumber: roomNumber.trim() });
    if (existingTenant) {
      return NextResponse.json({ error: 'Room already occupied' }, { status: 409 });
    }

     const hashedPassword = await bcrypt.hash(password, 12);
    const authUser = await User.create({
      roomNumber: roomNumber.trim(),
      password: hashedPassword,
      role: 'tenant'
    });
 
     const newTenant = await Tenant.create({
      name: name?.trim(),
      email: email?.trim(),
      phone: phone?.trim(),
      roomNumber: roomNumber.trim(),
      rentAmount: Number(rentAmount),
      moveInDate: new Date(moveInDate),
      gender,
      lastPayment: new Date()
    });
 
    return NextResponse.json({ 
      success: true, 
      tenant: newTenant,
      userId: authUser._id 
    }, { status: 201 });

  } catch (error) {
    console.error('tenant create failed');
    
    return NextResponse.json({ 
      error: 'Failed to create tenant' 
    }, { status: 500 });
  }
}

