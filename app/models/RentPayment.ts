import mongoose from 'mongoose';

const rentPaymentSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant', required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  paidDate: { type: Date },
  status: { 
    type: String, 
    enum: ['paid', 'pending', 'overdue'], 
    default: 'pending' 
  },
  paymentMethod: { type: String },
  lateFee: { type: Number, default: 0 },
  notes: { type: String }
}, { timestamps: true });

export default mongoose.models.RentPayment || mongoose.model('RentPayment', rentPaymentSchema);
