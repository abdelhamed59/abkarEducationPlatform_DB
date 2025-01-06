import mongoose, { Types } from "mongoose";
const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    createdBy: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    courseId: {
        type: Types.ObjectId,
        ref: "Course"
    }
}, {
    timestamps: true,
    versionKey: false
});


export const testModel=mongoose.model("Test",schema)