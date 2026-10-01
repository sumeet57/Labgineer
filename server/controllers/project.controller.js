import { createProject, updateProject } from "../services/project/admin.service.js";
import { getAllProjects, getProjectById } from "../services/project/user.service.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

export const getAllProjectsController = asyncHandler(async (req, res) => {
  const projects = await getAllProjects();
  new ApiResponse(200, "Projects fetched successfully", projects).send(res);
});

export const getProjectByIdController = asyncHandler(async (req, res) => {
    const projectId = req.params.id;
    const project = await getProjectById(projectId);
  
    new ApiResponse(200, "Project fetched successfully", project).send(res);
});

export const createProjectController = asyncHandler(async (req, res) => {
  const projectData = req.body;
  const project = await createProject(projectData);
  new ApiResponse(201, "Project created successfully", project).send(res);
});

export const updateProjectController = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const updateData = req.body;
  const updatedProject = await updateProject(projectId, updateData);
  new ApiResponse(200, "Project updated successfully", updatedProject).send(res);
});