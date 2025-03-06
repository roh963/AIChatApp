import dotenv from "dotenv"
dotenv.config();
import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import morgan from "morgan"
import connect from  "./db/db.js"
import projectRoutes from "./routes/project.routes.js"
import userRoutes from "./routes/user.routes.js"
import aiRoutes from "./routes/ai.routes.js"
import { FRONTEND_URL } from "./const.js";
connect();

const app = express();


app.use(cors({
    origin: FRONTEND_URL, 
    credentials: true, 
}));
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/projects", projectRoutes);
app.use("/ai",aiRoutes)
app.get("/", (req, res) => {
    res.send('hello world');
})

export default app;