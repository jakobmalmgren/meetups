import express from "express";
import { getMeetups, getMeetupById } from "../controllers/meetupController.mjs";

const router = express.Router();

router.get("/", getMeetups);
router.get("/:id", getMeetupById);

export default router;
