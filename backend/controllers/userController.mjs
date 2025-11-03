import bcrypt from "bcryptjs";
import { User } from "../models/userModel.mjs";
import { signJwt } from "../utils/jwt.mjs";

// login user return JWT Token
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(401).json({
        success: false,
        error: "Wrong email or password",
      });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
      return res.status(401).json({
        success: false,
        error: "Wrong email or password",
      });

    const token = signJwt({ sub: user.id });

    return res.json({
      success: true,
      message: "successfully logged in",
      user: { id: user.id, email: user.email },
      token,
    });
  } catch (err) {
    return next(err);
  }
};
// Create user with signup
export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hash });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { id: user.id, email: user.email },
    });
  } catch (err) {
    if (err?.code === 11000 || err?.codeName === "DuplicateKey") {
      return res.status(409).json({
        success: false,
        error: "Email already regist..",
      });
    }
    return next(err);
  }
};
