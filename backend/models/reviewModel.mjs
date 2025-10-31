import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  meetup: { type: Schema.Types.objectId, ref: "Meetup", required: true },
  user: { type: Schema.Types.objectId, ref: "User", required: true },

  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },

  review: {
    type: String,
    minlength: 3,
    maxlength: 300,
    trim: true,
  },
});

export default mongoose.model("Review", reviewSchema);
