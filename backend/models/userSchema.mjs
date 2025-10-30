import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: { type: String, required: true, minlength: 8, select: false },

    registeredMeetups: {
      type: [{ type: Schema.Types.ObjectId, ref: "Meetup" }],
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });

export const User = mongoose.model("User", userSchema);
