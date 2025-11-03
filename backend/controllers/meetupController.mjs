import Meetup from "../models/meetupModel.mjs";
import { User } from "../models/userModel.mjs";
import { addAvailableSpots } from "../utils/meetupHelpers.mjs";

export const getMeetups = async (req, res) => {
  try {
    const meetups = await Meetup.find().sort({ date: -1 });

    // Lägger till antal lediga platser i varje meetup med hjälpfunktion
    const meetupsWithAvailable = meetups.map(addAvailableSpots);

    res.json(meetupsWithAvailable);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Cannot get meetups", error });
  }
};

export const getMeetupById = async (req, res) => {
  try {
    const meetup = await Meetup.findById(req.params.id)
      .populate("attendees", "email")
      .populate({
        path: "reviews",
        select: "rating review createdAt updatedAt user meetup",
        options: { sort: { createdAt: -1 } },
        populate: [
          { path: "meetup", select: "title -_id" }, // bara title
        ],
      });

    if (!meetup)
      return res
        .status(404)
        .json({ success: false, message: "Could not find meetup" });

    // Lägg till antal lediga platser
    const meetupWithAvailable = addAvailableSpots(meetup);

    res.json(meetupWithAvailable);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Cannot get meetups", error });
  }
};

export const registerMeetup = async (req, res) => {
  try {
    const userId = req.user.id;
    const meetup = await Meetup.findById(req.params.id);
    const user = await User.findById(userId);

    if (!meetup || !user) {
      return res
        .status(404)
        .json({ success: false, message: "Could not find Meetup or User" });
    }

    if (meetup.attendees.some((id) => id.toString() === userId.toString())) {
      return res
        .status(400)
        .json({ success: false, message: "Already registered" });
    }

    if (meetup.attendees.length >= meetup.capacity) {
      return res
        .status(400)
        .json({ success: false, message: "Meetup is already fully booked" });
    }

    meetup.attendees.push(userId);
    user.registeredMeetups.push(meetup._id);

    await meetup.save();
    await user.save();

    res.status(200).json({
      success: true,
      message: "You are now registered for this meetup",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error trying to register", error });
  }
};

export const unregisterMeetup = async (req, res) => {
  try {
    const userId = req.user.id;
    const meetup = await Meetup.findById(req.params.id);
    const user = await User.findById(userId);

    if (!meetup || !user) {
      return res
        .status(404)
        .json({ success: false, message: "Could not find Meetup or User" });
    }

    // Ta bort användare från attendees
    meetup.attendees = meetup.attendees.filter(
      (attendeeId) => attendeeId.toString() !== userId
    );

    // Tar bort meetup från registeredMeetups
    user.registeredMeetups = user.registeredMeetups.filter(
      (mId) => mId.toString() !== meetup._id.toString()
    );
    await meetup.save();
    await user.save();

    res.status(200).json({
      success: true,
      message: "You have been unregistered for this Meetup",
    });
  } catch (error) {
    console.error("Error trying to unregister from meetup", error);
    res.status(500).json({
      success: false,
      message: "Error trying to unregister",
      error: error.message,
    });
  }
};
