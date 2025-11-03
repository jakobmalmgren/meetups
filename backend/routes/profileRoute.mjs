import { Router } from "express";
import { protect } from "../middlewares/auth.mjs";
import { getMyProfile } from "../controllers/profileController.mjs";

const router = Router();

router.get("/", protect, getMyProfile);

export default router;
