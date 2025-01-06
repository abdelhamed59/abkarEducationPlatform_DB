import express from "express"
import { allowTo, protectRoute } from "../../middleware/verifyToken.js"
import { createTest, deleteTest, testsForCourse, updateTest } from "./test.controller.js"

const testRoutes=express.Router()

testRoutes.post("/createTest/:courseId",protectRoute,allowTo("admin"),createTest)
testRoutes.get("/tests/:courseId",protectRoute,testsForCourse)
testRoutes.put("/updateTest/:testId",protectRoute,allowTo("admin"),updateTest)
testRoutes.delete("/deleteTest/:id",protectRoute,allowTo("admin"),deleteTest)

export default testRoutes