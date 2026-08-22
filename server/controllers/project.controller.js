import { createProject, updateProject } from "../services/project/admin.service.js";
import { getAllProjects } from "../services/project/user.service.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";


export const getAllProjectsController = asyncHandler(async (req, res) => {
    const projects = await getAllProjects();
    ApiResponse(res, 200, "Projects fetched successfully", projects);
});

export const createProjectController = asyncHandler(async (req, res) => {
    const projectData = req.body;
    const project = await createProject(projectData);
    ApiResponse(res, 201, "Project created successfully", project);
});

export const updateProjectController = asyncHandler(async (req, res) => {
    const projectId = req.params.id;
    const updateData = req.body;
    const updatedProject = await updateProject(projectId, updateData);
    ApiResponse(res, 200, "Project updated successfully", updatedProject);
});