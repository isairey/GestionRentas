//this code is run once to create admin in the database
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '@/app/models/User';


const MONGO_URL = process.env.MONGO_URL!;
const ADMIN_ID = process.env.ADMIN_ID!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

async function seedAdmin() {   
  await mongoose.connect(MONGO_URL);

  const existing = await User.findOne({ role: 'admin' });
  if (existing) {
    console.log('Admin already exists');
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

  await User.create({
    adminId: ADMIN_ID,
    password: hashedPassword,
    role: 'admin',
  });

  console.log('Admin created successfully');
  process.exit(0);
}

seedAdmin();

