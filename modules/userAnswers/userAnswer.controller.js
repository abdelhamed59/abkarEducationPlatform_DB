import { questionModel } from "../../DB/models/questions.model.js";
import { userAnswerModel } from "../../DB/models/userAnswers.model.js";
import handleError from "../../middleware/handelAsyncError.js";
import AppError from "../../utili/appError.js";

const addUserAnswer = handleError(async (req, res, next) => {
    const answers = req.body.map(answer => ({
        ...answer,
        userId: req.user.id,
        testId: req.params.testId,
    }));

    for (let answer of answers) {
        const question = await questionModel.findById(answer.questionId);
        if (!question) {
            return next(new AppError("Question not found", 404));
        }
        const chosenOption = question.answers.find(Qanswer => Qanswer._id.equals(answer.answerId));
        if (!chosenOption) {
            return next(new AppError("Invalid answerId", 400));
        }

        answer.isCorrect = chosenOption.isCorrect;
        answer.answerText=chosenOption.text
        
    }

    const userAnswer = await userAnswerModel.insertMany(answers);

    res.status(201).json({
        message: "User answers added successfully",
        userAnswer,
    });
});

// Get all user answers for a specific test
 const userAnswersByTest = handleError(async (req, res, next) => {
    const { testId } = req.params;

    const answers = await userAnswerModel
        .find({userId:req.user.id,testId })
        .populate("userId", "name")
        .populate("questionId", "questionText")

    if (!answers.length) {
        return next(new AppError("No answers found for this test", 404));
    }

    res.status(200).json({
        message: " success ",
        answers,
    });
});


// clalc the result
 const calculateResult = async (req, res, next) => {
    const {testId } = req.params;
    const userId=req.user.id

    const userAnswers = await userAnswerModel
        .find({ userId, testId })
        .populate("questionId", "answers") 
    if (!userAnswers.length) {
        return next(new AppError("No answers found for this user and test", 404));
    }

    let correctAnswersCount = 0;

    userAnswers.forEach(answer => {
        const question = answer.questionId;
        const correctAnswer = question.answers.find(ans => ans.isCorrect);

        if (correctAnswer && correctAnswer._id.equals(answer.answerId)) {
            correctAnswersCount++;
        }
    });

    const totalQuestions = await questionModel.countDocuments({testId})

    const scorePercentage = (correctAnswersCount / totalQuestions) * 100;

    res.status(200).json({
        message: "Result calculated successfully",
        totalQuestions,
        correctAnswersCount,
        scorePercentage: scorePercentage.toFixed(2)+"%", 
    });
};


 const retakeTest = async (req, res, next) => {
    const { testId } = req.params;
    const userId = req.user.id;
    await userAnswerModel.deleteMany({ userId, testId });
    res.status(200).json({
      message: "You can now retake the test.",
    });
  };


export{
    addUserAnswer,
    userAnswersByTest,
    calculateResult,
    retakeTest
}