import express from "express";
import { protectRoute } from "../../middleware/verifyToken.js";
import { addUserAnswer, calculateResult, retakeTest, userAnswersByTest } from "./userAnswer.controller.js";

const userAnswerRouter = express.Router();

userAnswerRouter.post("/answers/:testId",protectRoute, addUserAnswer); 
userAnswerRouter.get("/userAnswers/:testId",protectRoute, userAnswersByTest); 
userAnswerRouter.get("/result/:testId",protectRoute,calculateResult)
userAnswerRouter.delete("/retakeTest/:testId",protectRoute,retakeTest)


export default userAnswerRouter;
