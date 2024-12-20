import mongoose, { Types } from "mongoose";

const schema = mongoose.Schema({
    testId: {
        type: Types.ObjectId,
        ref: "Test",
        required: true
    },
    questionText: { type: String, required: true },
    answers: [
        {
            text: { type: String, required: true },
            isCorrect: { type: Boolean, default: false },
        },
    ],
},{
    timestamps:true,
    versionKey:false
})

export const questionModel=mongoose.model("Question",schema)


















/*
this data that i`ll write in postman
{
  "testId": "6487a2b9f9c919678abc1234", 
  "questions": [
    {
      "questionText": "What is the capital of France?",
      "options": [
        { "text": "Paris", "isCorrect": true },
        { "text": "London", "isCorrect": false },
        { "text": "Berlin", "isCorrect": false },
        { "text": "Madrid", "isCorrect": false }
      ]
    },
    {
      "questionText": "Which language is used for web development?",
      "options": [
        { "text": "JavaScript", "isCorrect": true },
        { "text": "Python", "isCorrect": false },
        { "text": "C++", "isCorrect": false },
        { "text": "Java", "isCorrect": false }
      ]
    }
  ]
}

*/ 