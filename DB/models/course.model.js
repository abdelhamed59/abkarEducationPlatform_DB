import mongoose, { Types, version } from "mongoose";

const schema=mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    imageCover:String,
    enroll:[{
        type:Types.ObjectId,
        ref:"User"
    }],
    createdBy:{
        type:Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true,
    versionKey:false
})


export const courseModel=mongoose.model("Course",schema)