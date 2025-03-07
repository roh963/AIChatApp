import projectModel from "../model/project.model.js";
import mongoose from "mongoose";

export const createProject = async ({ name, userId }) => {
    if (!name || !userId) {
        throw new Error("required name or userId")
    }
    let project;

    try {
        project = await projectModel.create({
            name,
            users: [userId]
        });
    } catch (error) {
        if (error.code === 11000) {
            throw new Error('Project name already exists');
        }
        throw error;
    }
    return project;
}

export const getAllProjectByUserId = async ({userId}) => {
    if (!userId) {
        throw new Error("required userId")
    }
    const allUserProjects = await projectModel.find({
        users: userId
    })
    return allUserProjects;
}

export const addUserofProject = async ({ projectId, users, userId }) => {
    if (!projectId) {
        throw new Error("required projectId")
    }
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid projectId")
    }
    if (!users) {
        throw new Error("users are required")
    }
    if (!Array.isArray(users) || users.some(userId => !mongoose.Types.ObjectId.isValid(userId))) {
        throw new Error("Invalid userId(s) in users array")
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("invalid userid")
    }
    const project = await projectModel.findOne({
        _id: projectId,
        users: userId
    })

    if (!project) {
        throw new Error("Project not found");
    }
    const updateproject = await projectModel.findOneAndUpdate({
        _id: projectId
    }, {
        $addToSet: {
            users: {
                $each: users
            }
        }
    }, {
        new: true
    })

    return updateproject;

}

export const getProjectById = async ({ projectId }) =>{
    if (!projectId) {
        throw new Error("required projectId")
    }
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid projectId")
    }
    const project = await projectModel.findOne({ _id: projectId}).populate('users');

    return project;
}

export const  updateFileTree = async ({projectId, fileTree}) => {
    if (!projectId) {
        throw new Error("required projectId")
    }
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid projectId")
    }
    if (!fileTree) {
        throw new Error("fileTree is required")
    }
    const project = await projectModel.findOneAndUpdate({
        _id: projectId
    }, {
        fileTree
    }, {
        new: true
    })
}