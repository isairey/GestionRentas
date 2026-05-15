import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongoose';
import Tenant from '@/app/models/real-tenant';
import RentPayment from '@/app/models/RentPayment'; 

 
type RentPayment = {
  _id: string;
  tenantId: string;
  tenantName: string;
  roomNumber: string;
  amount: number;
  dueDate: string;
  paidDate: string | null;
  status: 'paid' | 'pending' | 'overdue';
  paymentMethod: string;
  lateFee: number;
};

export async function GET(req: NextRequest) {
  try {
    await connectDB();

   
    const tenants = await Tenant.find({}).select('name roomNumber rentAmount moveInDate').lean();
    
     const payments = tenants.map(tenant => {
      const dueDate = new Date();
      dueDate.setMonth(dueDate.getMonth() + 1);  
      
      const daysLate = Math.floor(Math.random() * 10);
      const isOverdue = daysLate > 0;
      const status: RentPayment['status'] = isOverdue ? 'overdue' : Math.random() > 0.3 ? 'paid' : 'pending';

      return {
        _id: `payment_${tenant._id}`,
        tenantId: tenant._id,
        tenantName: tenant.name,
        roomNumber: tenant.roomNumber,
        amount: tenant.rentAmount,
        dueDate: dueDate.toISOString(),
        paidDate: status === 'paid' ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() : null,
        status,
        paymentMethod: ['M-Pesa', 'Bank', 'Cash'][Math.floor(Math.random() * 3)],
        lateFee: isOverdue ? 500 : 0,
      };
    });

    return NextResponse.json({
      success: true,
      payments,
      count: payments.length
    });
  } catch (error) {
    console.error('Rent tracking error:', error);
    return NextResponse.json({ success: false, error: 'Failed to load payments' }, { status: 500 });
  }
}
