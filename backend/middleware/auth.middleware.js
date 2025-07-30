import jwt from "jsonwebtoken"
import redisClient from "../services/redis.services.js"
import { JWT_SECRET } from "../const.js";

export const authUser = async (req, res, next) => {
    try {
        let token = req.cookies.token;
        
        // Check if authorization header exists and has the Bearer format
        if (!token && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader.startsWith('Bearer ')) {
                token = authHeader.split(' ')[1];
            }
        }

        if (!token) {
            return res.status(401).send({ error: 'unauthorized user token' });
        }

        const isBlacklisted = await redisClient.get(token);
        if (isBlacklisted) {
            res.cookie('token','');
            return res.status(401).send({ error: 'unauthorized user' });
        }
        
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log('Auth middleware error:', error);
        res.status(401).send({ error: 'Unauthorized !User' });
    }
}