import mongoose from "mongoose"
import AppError from "./appError.js";
import multer from "multer";

const uploadFile=()=>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
          cb(null,new mongoose.Types.ObjectId+"_"+ file.originalname )
          
        }
      });

      function fileFilter (req, file, cb) {
      if(file.mimetype.startsWith("image")){
        cb(null, true)
        console.log(file);

      }else{
        cb(new AppError("invalid upload image",401), false)
      }
      
      }
      
      const upload = multer({ storage,fileFilter })

      return upload
}

export const uploadSingle=(fieldName)=>uploadFile().single(fieldName)
export const uploadArray=(fieldName)=>uploadFile().array(fieldName,10)
export const uploadFields=(fieldName)=>uploadFile().fields(fieldName)