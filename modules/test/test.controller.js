import { testModel } from "../../DB/models/test.model.js";
import handleError from "../../middleware/handelAsyncError.js";
import { deleteOne } from "../../middleware/handler.js";
import AppError from "../../utili/appError.js";

const createTest=handleError(async(req,res,next)=>{
    let{courseId}=req.params
    req.body.createdBy=req.user.id
    req.body.courseId=courseId
    let test=await testModel.insertMany(req.body)
    res.status(201).json({message:"success",test})
})

const testsForCourse=handleError(async(req,res,next)=>{
    let{courseId}=req.params
    
    let tests=await testModel.find({courseId})
    if(!tests) return next(new AppError("not found tests for this cousre",404))
        res.status(200).json({message:"success",tests})
})
const updateTest=handleError(async(req,res,next)=>{
    let{testId}=req.params;
    let test=await testModel.findByIdAndUpdate(testId,req.body,{new:true})
    res.status(200).json({message:"success",test})
})


const deleteTest = deleteOne(testModel)






export{
    createTest,
    testsForCourse,
    updateTest,
    deleteTest
}