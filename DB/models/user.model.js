import mongoose, { Types } from "mongoose";

const schema=mongoose.Schema({
    name:{
        type:String,
        minLength:[3,'name may be wrong'],
        require:true
    },
    fatherName:{
        type:String,
        minLength:[3,'name may be wrong'],
        require:true
    },
    googleId: {
        type: String,
        unique: true,
      },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    coursesEnrolled:[{
type:Types.ObjectId,
ref:"Course"
    }],
    role:{
        type:String,
        enum:['user','admin'],
        default:"user"
    },
    changePasswordAt:Date,
    OTP:String
},{
    timestamps:true,
    versionKey:false
})

export const userModel=mongoose.model("User",schema)