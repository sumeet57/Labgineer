import { Router } from "express";
import {
  createRndController,
  getAllRndController,
  getRndBySlugController,
  updateRndController,
} from "../controllers/rnd.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createRndSchema,
  updateRndSchema,
} from "../validations/rnd.validation.js";
import { isAdmin } from "../middlewares/auth.middleware.js";

const rndRouter = Router();

rndRouter.get("/", getAllRndController);
rndRouter.get("/:slug", getRndBySlugController);


// Admin routes
rndRouter.post("/", isAdmin,validate(createRndSchema), createRndController);
rndRouter.patch("/:id", isAdmin, validate(updateRndSchema), updateRndController);



export default rndRouter;