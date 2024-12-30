import { videoModel } from "../../DB/models/videos.model.js";
import handleError from "../../middleware/handelAsyncError.js";
import { deleteOne } from "../../middleware/handler.js";


const addVideo = handleError(async (req, res, next) => {
    let { courseId } = req.params
    req.body.createdBy = req.user.id
    req.body.course = courseId
if(req.file){
    req.body.videoUrl = req.file.filename
} else{
    req.body.videoUrl 
}  

    let video = await videoModel.insertMany(req.body)
    res.status(201).json({ message: "video add successfully", video })
})

const allvideos=handleError(async(req,res,next)=>{
    let { courseId } = req.params
    let videos=await videoModel.find({course:courseId}).populate("course","-_id title description imageCover")
    res.status(200).json({message:"success",videos})
})



const updateVideo = handleError(async (req, res, next) => {
    let { videoId } = req.params
    if (req.file) req.body.videoUrl = req.file.filename

    const video = await videoModel.findByIdAndUpdate({_id:videoId}, req.body, { new: true })
    res.status(200).json({ message: "success", video })
})


const deleteVideo = deleteOne(videoModel)




export {
    addVideo,
    allvideos,
    updateVideo,
    deleteVideo
}