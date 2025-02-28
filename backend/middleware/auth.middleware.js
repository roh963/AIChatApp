import jwt from "jsonwebtoken"
import redisClient from "../services/redis.services.js"
import { JWT_SECRET } from "../const.js";
export const authUser = async (req, res, next) => {
    try {
        
     const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
     

    if (!token) return res.status(401).send({ error: 'unauthorized user token' });

    const isBlacklisted = await redisClient.get(token);
    if (isBlacklisted) {
        res.cookie('token','');
        return res.status(401).send({ error: 'unauthorized user' });
    }
    const decoded = jwt.verify(token,JWT_SECRET);
    req.user = decoded;
    next();
    } catch (error) {
        console.log(error);
        res.status(401).send({ error: 'Unauthorized !User' });
    }

}