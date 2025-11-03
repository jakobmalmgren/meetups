import express from "express";
import { protect } from "../middlewares/auth.mjs";
import { validateParams } from "../middlewares/validateParams.mjs";
import { meetupIdSchema } from "../validators/meetupValidator.mjs";
import {
  getMeetups,
  getMeetupById,
  registerMeetup,
  unregisterMeetup,
} from "../controllers/meetupController.mjs";

const router = express.Router();

router.get("/", getMeetups);
router.get("/:id", validateParams(meetupIdSchema), getMeetupById);
router.post(
  "/:id/register",
  protect,
  validateParams(meetupIdSchema),
  registerMeetup
);
router.delete(
  "/:id/unregister",
  protect,
  validateParams(meetupIdSchema),
  unregisterMeetup
);

export default router;
