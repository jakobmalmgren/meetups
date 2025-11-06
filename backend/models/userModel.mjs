import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 8, select: false },

    registeredMeetups: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Meetup" },
    ],

    history: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meetup" }],

    username: { type: String },
  },

  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
