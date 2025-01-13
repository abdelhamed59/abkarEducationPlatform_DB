import mongoose, { Types } from "mongoose";

const Schema = new mongoose.Schema(
  {
    userId: { 
      type: Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    testId: { 
      type: Types.ObjectId, 
      ref: "Test", 
      required: true 
    },
    issuedDate: { 
      type: Date, 
      default: Date.now 
    },
    
  },
  { timestamps: true ,versionKey:false}
);

export const certificateModel = mongoose.model("Certificate", Schema);
