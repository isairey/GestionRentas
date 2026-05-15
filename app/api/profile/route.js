 import {NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/app/lib/mongoose';
import User from '@/app/models/User';
import Tenant from '@/app/models/real-tenant';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export async function GET(req) {
  try {
    await connectDB();

    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    if (payload.role !== 'tenant') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

     const user = await User.findById(payload.id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const tenant = await Tenant.findOne({ roomNumber: user.roomNumber })
      .select('name email phone roomNumber rentAmount moveInDate gender lastPayment')
      .lean();

    if (!tenant) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      tenant,
    });
  } catch (err) {
    console.error('ME TENANT ERROR:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
