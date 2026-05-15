 import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongoose';
import Tenant from '@/app/models/tenant';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, phone, roomNumber, rentAmount, moveInDate, gender } = body;

    if (!name || !email || !phone || !roomNumber || !rentAmount || !moveInDate || !gender) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newTenant = await Tenant.create({
      name,
      email,
      phone,
      roomNumber,
      rentAmount,
      moveInDate,
      gender,
      lastPayment: new Date(),
    });

    return NextResponse.json(
      { message: 'Tenant created successfully', data: newTenant },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating tenant:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    await connectDB();
    const tenants = await Tenant.find().sort({ createdAt: -1 });
    return NextResponse.json(tenants, { status: 200 });
  } catch (error) {
    console.error('Error fetching tenants:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
