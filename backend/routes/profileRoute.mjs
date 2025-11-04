import { Router } from "express";
import { protect } from "../middlewares/auth.mjs";
import {
  getProfile,
  markMeetupCompleteForUser,
} from "../controllers/profileController.mjs";

const router = Router();

router.get("/", protect, getProfile);
router.post("/complete/:meetupId", protect, markMeetupCompleteForUser);

export default router;
