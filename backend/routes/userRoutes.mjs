import { Router } from "express";
import { signup } from "../controllers/userController.mjs";
import { signupSchema } from "../models/userModel.mjs";
import { validate } from "../middlewares/validateBody.mjs";

const router = Router();

router.post("/signup", validate(signupSchema), signup);

export default router;
