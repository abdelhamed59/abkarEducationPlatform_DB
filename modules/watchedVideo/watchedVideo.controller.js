import { videoModel } from "../../DB/models/videos.model.js";
import { watchedModel } from "../../DB/models/watchedVideo.model.js";
import handleError from "../../middleware/handelAsyncError.js";


const watchedVideo=handleError(async(req,res,next)=>{
    let{videoId}=req.params
    req.body.userId=req.user.id
    req.body.videoId=videoId
    let video=await watchedModel.find({videoId})
    if(video) return res.status(302).json({message:"video found"})
        let watched=await watchedModel.insertMany(req.body)
        res.status(201).json({message:"success",watched})
    
    
})

const allWatchedVideos=handleError(async(req,res,next)=>{
    let watchedVideos=await watchedModel.find({userId:req.user.id})
    res.status(200).json({message:"success",watchedVideos})
})

const progress = handleError(async (req, res, next) => {
    const { courseId } = req.params;

    const videos = await videoModel.find({ course: courseId },"_id")
    
    if (!videos.length) {
        return res.status(404).json({ message: "No videos found for this course", progressCount: 0 });
    }

    const videoIds = videos.map(video => video._id);
    const watched = await watchedModel.find({
        userId: req.user.id,
        videoId: { $in: videoIds },
    });

    const progressCount = (watched.length / videos.length) * 100;

    res.status(200).json({ message: "Success", progressCount });
});




export{
    watchedVideo,
    allWatchedVideos,
    progress
}