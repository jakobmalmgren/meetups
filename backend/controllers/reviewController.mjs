import mongoose from "mongoose";
import Review from "../models/reviewModel.mjs";
import Meetup from "../models/meetupModel.mjs";

export const createReview = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { meetupId } = req.params;
    const { rating, review } = req.validated ?? req.body;

    if (!userId) {
      return res.status(401).json({ error: "u have to logg in first" });
    }

    if (!mongoose.isValidObjectId(meetupId)) {
      return res.status(400).json({ error: "wrong meetupId" });
    }

    const meetupDoc = await Meetup.findById(meetupId).select("_id attendees");
    if (!meetupDoc) {
      return res.status(404).json({ error: "Meetup not found.." });
    }

    /*     const attended =
      Array.isArray(meetupDoc.attendees) &&
      meetupDoc.attendees.some((a) => String(a) === String(userId)); */

    /*   if (!attended) {
      return res
        .status(403)
        .json({ error: "Cant leave a review if u did not attend" });
    } */

    const doc = await Review.create({
      meetup: meetupDoc._id,
      user: userId,
      rating,
      review,
    });

    await doc.populate([
      { path: "meetup", select: "_id title" },
      { path: "user", select: "_id email" },
    ]);

    await Meetup.findByIdAndUpdate(meetupId, { $push: { reviews: doc._id } });

    return res.status(201).json({ data: doc });
  } catch (err) {
    if (err?.code === 11000) {
      return res
        .status(409)
        .json({ error: "U already left a review about this meetup" });
    }
    if (err?.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    return next(err);
  }
};
