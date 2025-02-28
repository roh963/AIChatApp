import dotenv from "dotenv"
dotenv.config();
import express from "express"
import morgan from "morgan"
import connect from  "./db/db.js"
import userRoutes from "./routes/user.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import { FRONTEND_URL } from "./const.js";

import projectRoutes from "./routes/project.routes.js"
connect();

const app = express();
console.log(FRONTEND_URL);
// app.use(cors({
//     origin: FRONTEND_URL, // Your frontend URL
//     credentials: true, // Allow cookies and authentication headers
//   }));
app.use(cors("*"))
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/projects", projectRoutes);
app.get("/", (req, res) => {
    res.send('hello world');
})

export default app;