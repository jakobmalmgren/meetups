import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true, minlength: 8 },
  registeredMeetups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meetup" }],
});
userSchema.index({ email: 1 }, { unique: true });

export const User = mongoose.model("User", userSchema);
