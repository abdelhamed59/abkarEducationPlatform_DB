import courseRoutes from "./course/couser.routes.js";
import userRouter from "./User/user.routes.js";

export const Bootstrap=(app)=>{
    app.use("/api/v1/auth",userRouter);
    app.use("/api/v1/course",courseRoutes)
}