import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || "1h").toLowerCase();

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET environment variable");
}

export const signJwt = (payload, options = {}) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN, ...options });
