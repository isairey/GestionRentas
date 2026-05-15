 import { Schema, models, model } from 'mongoose';

const tenantSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  roomNumber: { type: String, required: true },
  rentAmount: { type: Number, required: true },
  moveInDate: { type: Date, required: true },
  gender: { type: String, required: true },
  lastPayment: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Tenant = models.Tenant || model('Tenant', tenantSchema);
export default Tenant;
