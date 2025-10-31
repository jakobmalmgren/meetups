import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const auth = req.headers.authorization || "";
    const [, token] = auth.split(" ");

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.sub };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
