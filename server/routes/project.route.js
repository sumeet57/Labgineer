import { Router } from "express";
import {
  createProjectController,
  getAllProjectsController,
  getProjectByIdController,
  updateProjectController,
} from "../controllers/project.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createProjectSchema,
  updateProjectSchema,
} from "../validations/project.validation.js";
import { isAdmin } from "../middlewares/auth.middleware.js";

const projectRouter = Router();

projectRouter.get("/featured", getAllProjectsController);
projectRouter.get("/:id", getProjectByIdController);


// Admin routes
projectRouter.post("/", isAdmin ,validate(createProjectSchema), createProjectController);
projectRouter.put("/:id", isAdmin, validate(updateProjectSchema), updateProjectController);


export default projectRouter;