import courseRoutes from "./course/couser.routes.js";
import userRouter from "./User/user.routes.js";
import videoRoutes from "./videos/videos.routes.js";
import watchedRoutes from "./watchedVideo/watchedVideo.routes.js";

export const Bootstrap=(app)=>{
    app.use("/api/v1/auth",userRouter);
    app.use("/api/v1/course",courseRoutes)
    app.use("/api/v1/videos",videoRoutes)
    app.use("/api/v1/watchedVideo",watchedRoutes)
}