import { User } from "../models/userModel.mjs";
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email }).lean();
    if (exists)
      return res.status(409).json({ error: "This email is already in use..." });

    const salt = await bcrypt.salt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hash });

    return res.status(201).json({ user: user.toJson() });
  } catch (err) {
    return err?.code === 11000
      ? res.status(409).json({ error: "Email already regist..." })
      : next(err);
  }
};
