import express from "express";
import { getMeetups } from "../controllers/meetupController.mjs";

const router = express.Router();

router.get("/", getMeetups);

export default router;
