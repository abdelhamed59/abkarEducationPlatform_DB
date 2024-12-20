import AppError from "../utili/appError.js"

const handleError = (fn) => {
    return (req, res, next) => {
        fn(req,res,next).catch(err => next(new AppError(err,422)));
    }
}

export default handleError