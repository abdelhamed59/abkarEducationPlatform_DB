import { questionModel } from "../../DB/models/questions.model.js";
import handleError from "../../middleware/handelAsyncError.js";
import { deleteOne } from "../../middleware/handler.js";
import AppError from "../../utili/appError.js";



const addQestion=handleError(async(req,res,next)=>{
    let{testId}=req.params
    req.body.testId=testId
    let question=await questionModel.insertMany(req.body)
    res.status(201).json({message:"success",question})
})


const questionForTest=handleError(async(req,res,next)=>{
    let{testId}=req.params
    
    let questions=await questionModel.find({testId})
    if(!questions) return next(new AppError("not found questions  for this test",404))
        res.status(200).json({message:"success",questions})
})


const updateQuestion = handleError(async (req, res, next) => {
    let { questionId } = req.params;
    let { questionText, answers } = req.body;

    if (!Array.isArray(answers) || answers.length < 3) {
       return next(new AppError("Answers must be an array with at least three options.",400))
    }

    const correctAnswersCount = answers.filter(answer => answer.isCorrect === true).length;
    if (correctAnswersCount !== 1) {
      return  next(new AppError("Exactly one answer must be marked as correct.",400))
    }

    const question = await questionModel.findByIdAndUpdate(
        questionId,
        { questionText, answers },
        { new: true, runValidators: true } 
    );

    if (!question.length) {
       return next(new AppError("Question not found." ,404))
    }

    res.status(200).json({ message: "Question updated successfully.", question });
});


const deleteQuestion=deleteOne(questionModel)



export{
    addQestion,
    questionForTest,
    updateQuestion,
    deleteQuestion
}