import mongoose, { Types } from "mongoose";

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

schema.post("init",function(doc){
    doc.imageCover=process.env.BASE_URL+"uploads/"+doc.imageCover
})


export const courseModel=mongoose.model("Course",schema)