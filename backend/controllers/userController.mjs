import bcrypt from "bcryptjs";
import { User } from "../models/userModel.mjs";
import { signJwt } from "../utils/jwt.mjs";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(401).json({ error: "Wrong email or password" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Wrong email or password" });

    const token = signJwt({ sub: user.id });

    return res.json({ token });
  } catch (err) {
    return next(err);
  }
};

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hash });
    const token = signJwt({ sub: user.id });

    return res.status(201).json({ token });
  } catch (err) {
    if (err?.code === 11000 || err?.codeName === "DuplicateKey") {
      return res.status(409).json({ error: "Email already regist.." });
    }
    return next(err);
  }
};
