import { Router } from "express";
import * as aiController from "../controller/ai.controller.js"
import { authUser } from './../middleware/auth.middleware.js';

const router = Router();

router.get("/get-resul",authUser ,aiController.getResult);

export default router;