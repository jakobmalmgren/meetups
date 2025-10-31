import { Router } from "express";
import { login, signup } from "../controllers/userController.mjs";
import { loginSchema, signupSchema } from "../validators/userValidator.mjs";
import { validateBody } from "../middlewares/validateBody.mjs";

const router = Router();

router.post("/signup", validateBody(signupSchema), signup);

router.post("/login", validateBody(loginSchema), login);

export default router;
