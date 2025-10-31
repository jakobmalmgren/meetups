import mongoose from "mongoose";

const { Schema } = mongoose;

const UserReviewSchema = new Schema(
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
      minlength: 8,
      maxlength: 300,
      trim: true,
    },
  },
  { timestamps: true }
);
UserReviewSchema.index({ meetup: 1, user: 1 }, { unique: true });

export default mongoose.model("Review", UserReviewSchema);
