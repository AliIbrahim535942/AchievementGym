import getExercises from "../controllers/exercises/getExercises.controller.js";
import { Router } from "express";
import authenticateToken from "../middleWares/authenticateToken.js";
const exerciseRouter = Router();
exerciseRouter.use(authenticateToken);
exerciseRouter.get("/getExrecises/:targetMuscle", getExercises);
export default exerciseRouter;
