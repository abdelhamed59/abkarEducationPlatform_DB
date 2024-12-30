import express from "express"
import { allowTo, protectRoute } from "../../middleware/verifyToken.js"
import { allWatchedVideos, progress, watchedVideo } from "./watchedVideo.controller.js"


const watchedRoutes=express.Router()

watchedRoutes.post("/addToWatchedVideo/:videoId",protectRoute,watchedVideo)
watchedRoutes.get("/allWatched",protectRoute,allWatchedVideos)
watchedRoutes.get("/progress/:courseId",protectRoute,progress)



export default watchedRoutes;