import certificateRoutes from "./certification/certificate.routes.js";
import courseRoutes from "./course/couser.routes.js";
import questionRoutes from "./qusetions/question.routes.js";
import testRoutes from "./test/test.routes.js";
import userRouter from "./User/user.routes.js";
import userAnswerRouter from "./userAnswers/userAnswer.routes.js";
import videoRoutes from "./videos/videos.routes.js";
import watchedRoutes from "./watchedVideo/watchedVideo.routes.js";

export const Bootstrap=(app)=>{
    app.use("/api/v1/auth",userRouter);
    app.use("/api/v1/course",courseRoutes)
    app.use("/api/v1/videos",videoRoutes)
    app.use("/api/v1/watchedVideo",watchedRoutes)
    app.use("/api/v1/test",testRoutes)
    app.use("/api/v1/question",questionRoutes)
    app.use("/api/v1/userAnswer",userAnswerRouter)
    app.use("/api/v1/certificate",certificateRoutes)
}