import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 8 },
  },
  { timestamps: true }
); // vill vi ha timestamps ? ?

userSchema.index({ email: 1 }, { unique: true });

export const User = mongoose.model("User", userSchema);
