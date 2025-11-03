import { Router } from "express";
import { protect } from "../middlewares/auth.mjs";

const router = Router();

router.get("/", protect);

export default router;
