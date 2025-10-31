import { Router } from "express";
import { validateBody, validateBody } from "../middlewares/validateBody.mjs";
import { createReview } from "../controllers/reviewController.mjs";
import { paramsSchema, reviewSchema } from "../validators/reviewValidator.mjs";
import { validateParams } from "../middlewares/validateParams.mjs";

const router = Router();

router.post(
  "/review",
  validateParams(paramsSchema),
  validateBody(reviewSchema),
  createReview
);

export default router;
