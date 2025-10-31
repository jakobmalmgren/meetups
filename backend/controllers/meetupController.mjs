import Meetup from "../models/meetupModel.mjs";
/* import User from "../models/userModel.mjs"; */

export const getMeetups = async (req, res) => {
  try {
    const meetups = await Meetup.find().sort({ date: -1 });

    // Lägger till antal lediga platser i varje meetup
    const meetupsWithAvailable = meetups.map((m) => ({
      ...m.toObject(),
      availableSpots: m.capacity - m.attendees.length,
    }));

    res.json(meetupsWithAvailable);
  } catch (error) {
    res.status(500).json({ message: "Cannot get meetups", error });
  }
};
