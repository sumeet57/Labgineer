import Project from "../../models/project.model";


export const createProject = async (projectData) => {
    const project = Project.create(projectData);

    return project;
};

export const updateProject = async (projectId, updateData) => {
    const updatedProject = await Project.findByIdAndUpdate(projectId, updateData, { new: true });

    return updatedProject;
};