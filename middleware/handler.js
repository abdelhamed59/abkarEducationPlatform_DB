import handleError from "./handelAsyncError.js"

   export const deleteOne=(model)=>{
    return  handleError(async (req, res, next) => {
        let { id } = req.params
        const item = await model.findByIdAndDelete(id)
        item || res.status(200).json({ message: "item not found " })
        !item || res.status(200).json({ message: "success", item })
    
    })
   }