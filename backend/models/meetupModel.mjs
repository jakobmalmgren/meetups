import mongoose from "mongoose";

const meetupSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    host: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    capacity: { type: Number, required: true },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

export default mongoose.model("Meetup", meetupSchema);
