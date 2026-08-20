import dotenv from "dotenv";
import path from "path";
import fs from "fs";
dotenv.config();

const env = process.env.NODE_ENV || "development";

const currentPath = path.join(process.cwd(), ".env");
const basePath = currentPath + "." + env;
const finalPath = fs.existsSync(basePath) ? basePath : currentPath;
console.log("loaded from : ", finalPath);

dotenv.config({ path: finalPath });

export default {
  port: process.env.PORT || 3000,
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",

  // MongoDB connection
  MONGO_URI: process.env.MONGO_URI,
  SESSION_SECRET: process.env.SESSION_SECRET,
  NODE_ENV: process.env.NODE_ENV,

  // JWT secrets
  ACCESS_SECRET: process.env.ACCESS_SECRET,
  REFRESH_SECRET: process.env.REFRESH_SECRET,

  // Brevo email service
  BREVO_API_KEY: process.env.BREVO_API_KEY,
  EMAIL_SENDER: process.env.EMAIL_SENDER,
};
