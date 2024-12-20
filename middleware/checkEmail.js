import { userModel } from "../DB/models/user.model.js"
import AppError from "../utili/appError.js"

const checkEmail=async(req,res,next)=>{
    let{email}=req.body
    const user= await userModel.findOne({email})
    if(user){
        next(new AppError( "u already register" , 409))
    }else{
        next()
    }

}


export{
    checkEmail
}