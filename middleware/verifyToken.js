import jwt from 'jsonwebtoken'
import handleError from './handelAsyncError.js';
import { userModel } from '../DB/models/user.model.js';
import AppError from '../utili/appError.js';

const protectRoute =handleError(async(req, res, next) => {
    const authtoken = req.header('Authorization');
    if (!authtoken) {
        return next(new AppError("Token not provided", 401));
    }
     const token = authtoken.replace('Bearer ', '');
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) return next(new AppError("token error", 401))
        let user = await userModel.findById(decoded.id)
        if (!user) return next(new AppError("user not found ", 404))
            if(user.changePasswordAt){
                let changePasswordTime = parseInt(user.changePasswordAt.getTime() / 1000)
                if (changePasswordTime > decoded.iat) return next(new AppError("invalid token ", 404))
            }
        req.user = decoded
        next()
    })
})

const allowTo=(...roles)=>{
    return handleError(async(req,res,next)=>{
        if(!roles.includes(req.user.role)) return next(new AppError("Not Authrize ", 403))
            next()
    })
    
}
export {
    protectRoute,
  allowTo  
} 