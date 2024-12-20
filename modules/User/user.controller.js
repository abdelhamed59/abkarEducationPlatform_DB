import { userModel } from "../../DB/models/user.model.js";
import handleError from "../../middleware/handelAsyncError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import sendEmail from "../../utili/sendEmail.js";
import AppError from "../../utili/appError.js";
import GoogleStrategy from "passport-google-oauth20"
import passport from "passport";



const signUp=handleError(async(req,res,next)=>{
    const user=await userModel.insertMany(req.body)
    
    if (user) {
        const token = jwt.sign({ id: user[0]._id, role: user[0].role, name: user[0].name ,email:user[0].email}, process.env.SECRET_KEY)
        res.status(201).json({ message: "success", token })
    } else {
        next(new AppError( "faild signUP", 404))
    }
})

const signIn = handleError(async (req, res, next) => {
    let{email,password}=req.body
    const user = await userModel.findOne({email})
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user._id, role: user.role, name: user.name ,email:user.email}, process.env.SECRET_KEY)
        res.status(200).json({ message: "success", token })
    } else {
        next(new AppError( "invalid email or password", 404))
    }

})


const changePassword = handleError(async (req, res) => {
    req.body.newPassword = bcrypt.hashSync(req.body.newPassword, 8)
    const user = await userModel.findByIdAndUpdate({ _id: req.user.id }, { password: req.body.newPassword ,changePasswordAt:Date.now()})
    res.status(200).json({ message: "password updated" })
})

const getOTP = handleError(async (req, res,next) => {
    let { email } = req.body;
    const code = Math.floor(100000 + Math.random() * 900000);
    const user = await userModel.findOne({ email })
    if (!user) {
        next(new AppError( "accunt not found" , 404))
    } else {
        user.OTP = code;
        sendEmail(code, email)
        await user.save()
        res.status(200).json({ message: "check your email for OTP" })

    }

})
const resetPassword = handleError(async (req, res,next) => {
    let { OTP, newPassword } = req.body;
    const user = await userModel.findOne({ OTP })
    if (!user) {
        next(new AppError("invalid OTP", 404))
    } else {

        user.password = bcrypt.hashSync(newPassword, 8)
        user.OTP = undefined
        await user.save()
        res.status(200).json({ message: "success please signIn" })

    }

})

const userData=handleError(async(req,res,next)=>{
    const user=await userModel.findById(req.user.id).select("name email age phone fatherName -_id")
    res.status(200).json({message:"success",user})

})

const confirmPassword=handleError(async(req,res,next)=>{
    let{password}=req.body
    const user=await userModel.findById({_id:req.user.id})
    if(!bcrypt.compareSync(password,user.password)){
        next(new AppError( "invalid password" , 401))
    
    }else{
        res.status(200).json({message:"success"})
    }
})

const updateData = handleError(async (req, res) => {
    let{name,fatherName,email,phone,age}=req.body

    const user = await userModel.findByIdAndUpdate({ _id: req.user.id },{name,fatherName,email,phone,age},{new:true}).select("-_id name age email phone fatherName")
    res.status(200).json({ message: "data updated" ,user})
})





passport.use(new GoogleStrategy.Strategy({
  clientID: process.env.GOOGLE_CLIENT_ID,  // Make sure this is in your .env file
  clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Also in your .env file
  callbackURL: "http://localhost:3000/api/v1/auth/google/callback", // Ensure this is the correct callback URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if the user exists in your DB using the Google ID
    let user = await userModel.findOne({ googleId: profile.id });
    
    if (!user) {
      // If the user does not exist, create a new user
      user = await userModel.create({
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        fatherName:profile.name.familyName,
      });
    } 

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// Serialize and deserialize user data (e.g., user ID)
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});





   

  





export{
    signUp,
    signIn,
    changePassword,
    getOTP,
    resetPassword,
    confirmPassword,
    userData,
    updateData,
}