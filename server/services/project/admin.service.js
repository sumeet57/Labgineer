import Project from "../../models/project.model.js";
import { ApiError } from "../../utils/api-response.js";

export const createProject = async (projectData) => {
  const project = await Project.create(projectData);
  return project;
};

export const updateProject = async (projectId, updateData) => {
  const updatedProject = await Project.findByIdAndUpdate(projectId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedProject) {
    throw new ApiError(404, "Project not found");
  }

  return updatedProject;
};