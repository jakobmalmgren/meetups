import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.mjs";
import { createReview } from "../controllers/reviewController.mjs";
import { paramsSchema, reviewSchema } from "../validators/reviewValidator.mjs";
import { validateParams } from "../middlewares/validateParams.mjs";
import { protect } from "../middlewares/auth.mjs";

const router = Router();

router.post(
  "/:meetupId",
  protect,
  validateParams(paramsSchema),
  validateBody(reviewSchema),
  createReview
);

export default router;
