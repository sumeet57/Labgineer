import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import env from "./config/env.js";
import limiter from "./middlewares/rateLimiter.js";
import authRouter from "./routes/auth.route.js";
import { configureSession } from "./config/session.js";

const app = express();

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  }),
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(configureSession());
app.use(limiter);

app.get("/", (req, res) => {
  res.send(`API is running... ${Date.now()}`);
});

app.use("/api/auth", authRouter);

export default app;