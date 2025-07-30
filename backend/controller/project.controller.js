import projectModel from "../model/project.model.js";
import * as projectService from "../services/project.services.js";
import userModel from './../model/user.model.js';
import { validationResult } from "express-validator";

export const createProjectController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {name} = req.body;
        const loggedInUser = await userModel.findOne({email:req.user.email });
        const userId = loggedInUser._id

        const newProject = await projectService.createProject({name, userId});
        res.status(201).json(newProject);
    } catch (err){
        console.log(err);
        res.status(400).send(err.message);
    }
}

export const getAllProject = async (req, res) => {
    try {
        const loggedInUser = await userModel.findOne(
            {
                email:req.user.email
            });
            
        if (!loggedInUser) {
            throw new Error("User not logged in")
        }
       const allUserProjects = await projectService.getAllProjectByUserId({
        userId:loggedInUser._id
    })
        return res.status(200).json(
            {projects:allUserProjects}
        );
    }catch (err){
        console.log(err);
        res.status(400).json({ error: err.message })
    }
}
export const addUserProject = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        console.log("🛠️ [ADD USER] Payload received:", req.body); // ✅ Add this line
        const {projectId, users} = req.body;
        const loggedInUser = await userModel.findOne({email:req.user.email});
        const project = await projectService.addUserofProject({projectId, users,userId:loggedInUser._id});
        return res.status(200).json({project});
    }catch (err) {  
        console.error("❌ [ADD USER ERROR]:", err.message); // Optional: make log cleaner
        res.status(400).json({ error: err.message })
    }
}

export const getProjectById = async (req, res) => {
    const {projectId} = req.params;
    try {
        const project = await projectService.getProjectById({projectId});
        return res.status(200).json({project});
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message });
    }
}

export const updateFileTree = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {projectId, fileTree} = req.body;
        const project= await projectService.updateFileTree({projectId, fileTree});
        return res.status(200).json({project});
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
}

