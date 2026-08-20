import { Router } from "express";
import { getCurrentUser, handleGoogleAuth } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";


const authRouter = Router();


authRouter.post("/google", handleGoogleAuth);
authRouter.get("/me", isAuthenticated ,getCurrentUser);


export default authRouter;