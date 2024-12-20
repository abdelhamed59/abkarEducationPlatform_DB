import bcrypt from 'bcrypt'
import AppError from '../utili/appError.js'


export const hashPassword=async(req,res,next)=>{
    if(req.body.password){
        req.body.password=bcrypt.hashSync(req.body.password, 8)
        next()
    }else{
        next(new AppError( "password should be found" , 409))
    }

}