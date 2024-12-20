import mongoose, { Types } from "mongoose";

const schema =  mongoose.Schema({
  userId: { 
    type: Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  videoId: { 
    type: Types.ObjectId, 
    ref: "Video", 
    required: true 
  },
  watchedAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const watchedModel = mongoose.model("WatchedVideo", schema);
