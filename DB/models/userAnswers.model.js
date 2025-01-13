import mongoose, { Types } from "mongoose";

const Schema = new mongoose.Schema({
    userId: { 
        type: Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    testId: { 
        type: Types.ObjectId, 
        ref: "Test", 
        required: true 
    },
    questionId: { 
        type: Types.ObjectId, 
        ref: "Question", 
        required: true 
    },
    answerId: { 
        type: Types.ObjectId, 
        required: true 
    },
    answerText:String,
    isCorrect: { 
        type: Boolean 
    },
},{
    versionKey:false,
    timestamps:true
});




export const userAnswerModel = mongoose.model("UserAnswer", Schema);
