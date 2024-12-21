import express from "express"
import { allowTo, protectRoute } from "../../middleware/verifyToken.js"
import { allCourses, allenrolledCourseforUser, createCourse, deleteCourse, enrollCourse, updateCourse } from "./course.controller.js"
import { uploadSingle } from "../../utili/fileUpload.js"

const courseRoutes=express.Router()

courseRoutes.post('/createCourse',protectRoute,allowTo('admin'),uploadSingle("imageCover"),createCourse)
courseRoutes.get("/allCourses",protectRoute,allCourses)
courseRoutes.put("/updateCourse/:courseId",protectRoute,allowTo("admin"),uploadSingle("imageCover"),updateCourse)
courseRoutes.delete("/deleteCourse/:id",protectRoute,allowTo("admin"),deleteCourse)
courseRoutes.put("/enrollCourse/:courseId",protectRoute,enrollCourse)
courseRoutes.get("/allUserCourses",protectRoute,allenrolledCourseforUser)


export default courseRoutes