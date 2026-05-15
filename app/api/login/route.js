 import { NextResponse } from 'next/server'
 import { connectDB } from '@/app/lib/mongoose'
import User from '@/app/models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
   
    const { identifier, password, role } = body;
    console.log('login', { identifier, role, passwordLength: password?.length });

     const query = role === 'tenant' ? { roomNumber: identifier.trim(), role: 'tenant' }
      : { adminId: identifier.trim(), role: 'admin' };

    console.log('Query:', query);

    const user = await User.findOne(query);
    
   
    if (user) {
      console.log('user data', {
        roomNumber: user.roomNumber || user.adminId,
        hasPassword: !!user.password,
        passwordLength: user.password?.length,
        role: user.role
      });
    }

    if (!user) {
      console.log('no user');
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    if (!user.password) {
      console.log('bo passwod');
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
 
    if (!isMatch) {
       return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

     const token = jwt.sign(
      { 
        id: user._id.toString(), 
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '7h' }
    );

 
    return NextResponse.json({
      token,
      role: user.role,
      user: {
        id: user._id,
        name: user.name || 'User',
        roomNumber: user.roomNumber,
        email: user.email || 'N/A',
      },
    });

  } catch (err) {
     return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


