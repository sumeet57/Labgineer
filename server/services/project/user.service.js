import Project from "../../models/project.model";




export const getAllProjects = async () => {

    // fetch all projects from the database 
    const projects = await Project.find({});

    return projects;
};