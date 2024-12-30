import mongoose from "mongoose";
import AppError from "./appError.js";
import multer from "multer";

const uploadFile = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            // Determine subfolder based on file type
            if (file.mimetype.startsWith("image")) {
                cb(null, "uploads/images");
            } else if (file.mimetype.startsWith("video")) {
                cb(null, "uploads/videos");
            } else {
                cb(new AppError("Invalid file type. Only images and videos are allowed!", 401), false);
            }
        },
        filename: function (req, file, cb) {
            // Generate a unique filename
            cb(null, new mongoose.Types.ObjectId() + "_" + file.originalname);
        },
    });

    function fileFilter(req, file, cb) {
        // Allow only image and video MIME types
        if (file.mimetype.startsWith("image") || file.mimetype.startsWith("video")) {
            cb(null, true);
        } else {
            cb(new AppError("Invalid file type. Only images and videos are allowed!", 401), false);
        }
    }

    const upload = multer({ storage, fileFilter });

    return upload;
};

// Export functions for different upload scenarios
export const uploadSingle = (fieldName) => uploadFile().single(fieldName); // Single file
export const uploadArray = (fieldName) => uploadFile().array(fieldName, 10); // Array of files
export const uploadFields = (fields) => uploadFile().fields(fields); // Multiple fields with different file types
