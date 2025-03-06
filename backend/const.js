import dotenv from "dotenv"
dotenv.config()
export const PORT=process.env.PORT;
export const MONGO_URL=process.env.MONGO_URL
export const JWT_SECRET=process.env.JWT_SECRET
export const REDIS_HOST=process.env.REDIS_HOST
export const REDIS_PORT=process.env.REDIS_PORT
export const REDIS_PASSWORD=process.env.REDIS_PASSWORD
export const FRONTEND_URL=process.env.FRONTEND_URL
export const GOOGLE_AI_KEY=process.env.GOOGLE_AI_KEY