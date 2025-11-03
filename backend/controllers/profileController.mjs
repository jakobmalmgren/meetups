import Meetup from "../models/meetupModel.mjs";

/// Profile ska innehålla:
// anmälda meetups:
// title. location , date, email, category

// history, meetups man lämnat review på hamnar i history
// username
// avregistrera bokade meetups

export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const sort = req.query.sort ?? "date";

    const [items, total] = await Promise.all([
      Meetup.find({ attendees: userId })
        .select("title location date category")
        .sort(sort),
    ]);

    const meeups = items.map((m) => ({
      id_: m.id,
      title: m.title,
    }));

    return res.json({
      success: true,
      title: m.title,
      items: meeups,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to load registered meetups" });
  }
};
