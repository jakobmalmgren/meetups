import Meetup from "../models/meetupModel.mjs";
import { User } from "../models/userModel.mjs";
import mongoose from "mongoose";

export const markMeetupCompleteForUser = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { meetupId } = req.params;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Logg in first" });
    }
    if (!mongoose.isValidObjectId(meetupId)) {
      return res.status(400).json({
        success: false,
        message: "meetup id error",
      });
    }
    const exists = await Meetup.exists({ _id: meetupId });
    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "This meetup does not exist",
      });
    }

    /// Atomisk flytt: ta bort från registeredMeetups + lägg till i history (utan dubletter)

    const updated = await User.findOneAndUpdate(
      { _id: userId, registeredMeetups: meetupId },
      {
        $pull: { registeredMeetups: meetupId },
        $addToSet: { history: meetupId },
      },
      { new: true }
    )
      .select("+email")
      .populate([
        { path: "history", select: "title location date category" },
        { path: "registeredMeetups", select: "title location date category" },
      ])
      .lean();

    if (!updated) {
      return res.status(400).json({
        success: false,
        message: "U have not signed up to this meetup, could not update",
      });
    }
    return res.json({
      success: true,
      message: "Meetup moved to History",
      data: {
        email: updated.email,
        registered: updated.registeredMeetups ?? [],
        history: updated.history ?? [],
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Technical error",
      error: err.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId)
      return res
        .status(401)
        .json({ success: false, message: "Please logg in first" });

    const user = await User.findById(userId)
      .select("+email")
      .populate([
        { path: "history", select: "title location date category" },
        { path: "registeredMeetups", select: "title location date category" },
      ])
      .lean();

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User does not exists" });

    return res.json({
      success: true,
      data: {
        email: user.email,
        history: user.history ?? [],
        registered: user.registeredMeetups ?? [],
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Technical error", error: err.message });
  }
};
