import Redis from "ioredis";
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from "../const.js";

const redisClient = new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT,
    password:REDIS_PASSWORD
});
redisClient.on('connect', () => {
    console.log('Redis connected');
})

export default redisClient;