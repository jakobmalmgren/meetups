import Meetup from "../models/meetupModel.mjs";
import Review from "../models/reviewModel.mjs";

/// Profile ska innehålla:
// anmälda meetups,
// history, meetups man lämnat review på hamnar i history
// username
// avregistrera bokade meetups

export const getMyProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const include = (req.query.include ?? "registered, history, reviews").split(
      ","
    );
  } catch {}
};
