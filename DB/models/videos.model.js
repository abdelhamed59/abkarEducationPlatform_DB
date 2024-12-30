import mongoose, { Types } from "mongoose";

const schema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true
    },
    videoUrl: {
        type: String,
        require: true
    },
    course: {
        type: Types.ObjectId,
        ref: "Course"
    },
    createdBy: {
        type: Types.ObjectId,
        ref: "User"
    }
},{
    timestamps:true,
    versionKey:false
})
schema.post("init", function (doc) {
    if (doc.videoUrl && !doc.videoUrl.startsWith("https")) {
        doc.videoUrl = `${process.env.BASE_URL}/uploads/videos/${doc.videoUrl}`;
    }
});


export const videoModel=mongoose.model("Video",schema)