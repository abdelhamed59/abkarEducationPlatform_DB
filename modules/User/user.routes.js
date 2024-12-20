import express from "express"
import { checkEmail } from "../../middleware/checkEmail.js"
import { hashPassword } from "../../middleware/hashPassword.js"
import {  changePassword, confirmPassword, getOTP, resetPassword, signIn, signUp, updateData, userData } from "./user.controller.js"
import checkPassword from "../../middleware/checkPassword.js"
import { protectRoute } from "../../middleware/verifyToken.js"
import passport from 'passport';
import jwt from "jsonwebtoken"


const userRouter=express.Router()

userRouter.post("/signUp",checkEmail,hashPassword,signUp)
userRouter.post("/signIn",signIn)
userRouter.put("/changePassword",protectRoute,checkPassword,changePassword)
userRouter.get("/forgetPassword",getOTP)
userRouter.post("/resetPassword",resetPassword)
userRouter.get("/userData",protectRoute,userData)
userRouter.post("/confirmPassword",protectRoute,confirmPassword)
userRouter.put("/updateData",protectRoute,checkEmail,updateData)



userRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
userRouter.get('/google/callback',passport.authenticate('google', { failureRedirect: '/' }), 
(req, res) => {
    try {
      if (!req.user) {
        return res.status(400).json({ message: 'Authentication failed' });
      }

      // Generate JWT token for the authenticated user
      const token = jwt.sign(
        { id: req.user._id, role: req.user.role, email: req.user.email },
        process.env.SECRET_KEY
      );

      res.status(200).json({message:"success",token});
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  
});
  
  
  












export default userRouter