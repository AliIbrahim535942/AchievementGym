import { Router } from "express";
import authenticateToken from "../middleWares/authenticateToken";
//  Controller
import getExercises from "../controllers/exercises/getExercises.controller";
import getProgressExercises from "../controllers/exercises/getProgressExrcises.controller";
//  Validation Schemas

const exerciseRouter = Router();
exerciseRouter.use(authenticateToken);
exerciseRouter.get("/getExrecises/:targetMuscle", getExercises);
exerciseRouter.get("/getProgressExercises/:memberId", getProgressExercises);
export default exerciseRouter;
