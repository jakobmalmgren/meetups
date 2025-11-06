import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.mjs";
import userRouter from "./routes/userRoutes.mjs";
import reviewRouter from "./routes/reviewRoute.mjs";
import meetupRouter from "./routes/meetupRoutes.mjs";
import profileRouter from "./routes/profileRoute.mjs";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const allowedOrigin = process.env.CLIENT_URL;

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/reviews", reviewRouter);

app.use("/api/meetups", meetupRouter);
app.use("/api/profile", profileRouter);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server körs på http://localhost:${PORT}`);
  });
};

startServer();
