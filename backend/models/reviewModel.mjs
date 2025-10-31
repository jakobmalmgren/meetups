import mongoose from "mongoose";

const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    meetup: { type: Schema.Types.ObjectId, ref: "Meetup", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },

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
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
