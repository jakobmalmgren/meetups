import Meetup from "../models/meetupModel.mjs";
/* import User from "../models/userModel.mjs"; */
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
      // Hämtar deltagares email och allt från reviews
      .populate("attendees", "email")
      .populate("reviews");

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
