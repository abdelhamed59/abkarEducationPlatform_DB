import express from "express"
import { allowTo, protectRoute } from "../../middleware/verifyToken.js"
import { addVideo, allvideos, deleteVideo, updateVideo } from "./videos.controller.js"
import { uploadSingle } from "../../utili/fileUpload.js"


const videoRoutes=express.Router()

videoRoutes.post("/addVideo/:courseId",protectRoute,allowTo("admin"),uploadSingle("videoUrl"),addVideo)
videoRoutes.get("/allVideos/:courseId",protectRoute,allvideos)
videoRoutes.put("/updateVideo/:videoId",protectRoute,allowTo("admin"),uploadSingle("videoUrl"),updateVideo)
videoRoutes.delete("/deleteVideo/:id",protectRoute,allowTo("admin"),deleteVideo)


export default videoRoutes;