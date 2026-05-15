 import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongoose';
import User from '@/app/models/User';

export async function GET() {
  try {
    await connectDB();
    
    const tenants = await User.find({ role: 'tenant' }).select('-password');
    
    return NextResponse.json({
      count: tenants.length,
      tenants: tenants.map(t => ({
        id: t._id,
        name: t.name,
        roomNumber: t.roomNumber,
        email: t.email,
        role: t.role
      }))
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//http://localhost:3000/api/test-tenant
