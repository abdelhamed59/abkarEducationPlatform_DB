import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({
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
    chosenAnswer: { 
      type: String, 
      required: true 
    }, 
    isCorrect: { type: Boolean }, 
  });
  
  export const userAnswerModel = mongoose.model("UserAnswer", schema);
  