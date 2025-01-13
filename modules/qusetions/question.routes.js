import express from "express"
import { allowTo, protectRoute } from "../../middleware/verifyToken.js"
import { addQestion, deleteQuestion, questionForTest, updateQuestion } from "./question.controller.js"

const questionRoutes=express.Router()

questionRoutes.post("/addQuestion/:testId",protectRoute,allowTo("admin"),addQestion)
questionRoutes.get("/questions/:testId",protectRoute,questionForTest)
questionRoutes.put("/updateQuestion/:questionId",protectRoute,allowTo("admin"),updateQuestion)
questionRoutes.delete("/deleteQuestion/:id",protectRoute,allowTo("admin"),deleteQuestion)


export default questionRoutes