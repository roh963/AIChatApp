import { request } from "express";
import userModel from "../model/user.model.js"
import * as userService from "../services/user.services.js"
import {validationResult} from "express-validator"
import redisClient from "../services/redis.services.js";
import jwt from  "jsonwebtoken"


export const createUserController = async(req,res)=>{
     const errors = validationResult(req);
     if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
     }
     try {
        const user = await userService.createUser(req.body);
        const token = await user.generateJWT();
        delete user._doc.password
        res.status(201).json(user,token);
     } catch (error) {
        res.status(400).json({error: error.message});
     }
}
export const loginUserController = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({errors: errors.array()});
    }
    try {
        const {email , password} = req.body;

        const user = await userModel.findOne({email}).select(`+password`);
        if(!user){
            return res.status(401).json({errors: "Invalid Credentials"});
        }
        const isMatch = await user.isValidPassword(password);
        if(!isMatch){
            return res.status(401).json({errors: "Invalid Credentials"});
        }
        const token = await user.generateJWT();

         delete user._doc.password
        res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });

    } catch (error) {
        console.log(err);

        res.status(400).send(err.message);
    }        
}

export const profileController = async (req,res)=>{
    res.status(200).json({
        user: req.user
    });
}

import jwt from 'jsonwebtoken';

export const logoutController = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ errors: "Invalid Credentials" });
        }

        // Token ko verify karein
        jwt.verify(token, JWT_SECRET, (err) => {
            if (err) {
                return res.status(401).json({ errors: "Invalid Credentials" });
            }
        });

        redisClient.set(token, 'logout', 'EX', 60 * 60 * 24);
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
};



export const getAllUsersController = async(req, res) => {
    try {
        const loggedInUser = await userModel.findOne({
            email: req.user.email
        })
        const allUsers = await userService.getAllUsers({ userId: loggedInUser._id });
        res.status(200).json({
            users: allUsers
        });
    } catch (error) {
         console.log(error);
        res.status(400).json({error:error.message});
    }
}