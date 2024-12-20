import AppError from "../utili/appError.js";

export const validation=(schema)=>{
    return(req,res,next)=>{
        let filters={}
        if(req.file ){
            filters={image:req.file,...req.body,...req.query,...req.params}
        }else if(req.files){
            filters={...req.files,...req.body,...req.query,...req.params}
        }else{
            filters={...req.body,...req.query,...req.params}
        }
        let validation=schema.validate(filters,{abortEarly:false});
        if(validation.error?.details){
            let errorMessage=validation.error?.details.map(ele=>ele.message)
                next(new AppError(errorMessage,422))
            
        }else{
            next()
        }
    }
   
}