import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.mjs";
import userRouter from "./routes/userRoutes.mjs";
import meetupRouter from "./routes/meetupRoutes.mjs";

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

app.use("/api/meetups", meetupRouter);

// Check för render
app.get("/api", (req, res) => {
  res.send("Lala,lal");
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server körs på http://localhost:${PORT}`);
  });
};

startServer();
