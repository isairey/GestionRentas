 import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    roomNumber: { type: String, unique: true, sparse: true, required: false },
    adminId: { type: String, unique: true, sparse: true, required: false },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["tenant", "admin"],
      required: true,
    },
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);
