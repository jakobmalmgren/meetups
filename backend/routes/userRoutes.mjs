import { Router } from "express";
import { login, signup } from "../controllers/userController.mjs";
import { loginSchema, signupSchema } from "../validators/userValidator.mjs";
import { validate } from "../middlewares/validateBody.mjs";

const router = Router();

router.post("/signup", validate(signupSchema), signup);

router.post("/login", validate(loginSchema), login);

export default router;
