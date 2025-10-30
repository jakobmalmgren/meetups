import { User } from "../models/userSchema.mjs";
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const exists = await User.findOne({ email }).lean();
    if (exists)
      return res.status(409).json({ error: "This email is already in use..." });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({ email, password: hash });

    return res
      .status(201)
      .json({ message: "Account created", userId: user._id });
  } catch (err) {
    return err?.code === 11000
      ? res.status(409).json({ error: "Email already regist..." })
      : next(err);
  }
};
