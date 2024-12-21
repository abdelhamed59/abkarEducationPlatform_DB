import { courseModel } from "../../DB/models/course.model.js";
import { userModel } from "../../DB/models/user.model.js";
import handleError from "../../middleware/handelAsyncError.js";
import { deleteOne } from "../../middleware/handler.js";
import AppError from "../../utili/appError.js";


const createCourse=handleError(async(req,res,next)=>{
    req.body.createdBy=req.user.id
    req.body.imageCover = req.file.filename
    console.log(req.file);
    
     let course=await courseModel.insertMany(req.body)
     res.status(201).json({message:"course created successfully",course})
})

const allCourses=handleError(async(req,res,next)=>{
    let courses=await courseModel.find().populate("createdBy","-_id name email phone")
    res.status(200).json({message:"success",courses})
})

const updateCourse = handleError(async (req, res, next) => {
    let { courseId } = req.params
    if (req.file) req.body.imageCover = req.file.filename

    const course = await courseModel.findByIdAndUpdate({_id:courseId}, req.body, { new: true })
    res.status(200).json({ message: "success", course })
})

const deleteCourse = deleteOne(courseModel)

const enrollCourse=handleError(async(req,res,next)=>{
    let {courseId}=req.params
    const course=await courseModel.findOneAndUpdate(
        { _id:courseId },
        {$addToSet:{enroll:req.user.id}},
        { new: true, runValidators: true }
    );
    if(!course) return next(new AppError("course not found or deleted",404))
        const user=await userModel.findOneAndUpdate(
            { _id:req.user.id },
            {$addToSet:{coursesEnrolled:courseId}},
            { new: true, runValidators: true }
        ).select("-_id coursesEnrolled")
    res.status(200).json({message:"success",course,user})
})



const allenrolledCourseforUser=handleError(async(req,res,next)=>{
    let courses=await courseModel.find({enroll:req.user.id}).populate("createdBy","-_id name email phone")
    res.status(200).json({message:"success",courses})
})





export{
    createCourse,
    allCourses,
    updateCourse,
    deleteCourse,
    enrollCourse,
    allenrolledCourseforUser
}