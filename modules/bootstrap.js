import userRouter from "./User/user.routes.js";

export const Bootstrap=(app)=>{
    app.use("/api/v1/auth",userRouter);
}