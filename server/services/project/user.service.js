import Project from "../../models/project.model.js";
import { ApiError } from "../../utils/api-response.js";

export const getAllProjects = async () => {
  const projects = await Project.find({});
  return projects;
};

export const getProjectById = async (projectId) => {
    const project = await Project.findById(projectId);
    if (!project) {
        throw new ApiError(404, "Project not found");
    }
    return project;
};