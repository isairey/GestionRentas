 import { Schema, models, model } from 'mongoose';

const roomSchema = new Schema(
  {
    roomNumber: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    features: { type: [String], default: [] },
    status: {
      type: String,
      enum: ['vacant', 'occupied'],
      default: 'vacant',
    },
  },
  { timestamps: true }
);

const Room = models.Room || model('Room', roomSchema);
export default Room;
