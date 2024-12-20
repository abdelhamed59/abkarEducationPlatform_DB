import { userModel } from '../DB/models/user.model.js'
import AppError from '../utili/appError.js'
import bcrypt from 'bcrypt'


const checkPassword=async(req,res,next)=>{
let{oldPassword}=req.body
const user=await userModel.findById({_id:req.user.id})
if(!bcrypt.compareSync(oldPassword,user.password)){
    next(new AppError( "invalid password" , 401))

}else{
    next()
}
}

export default checkPassword