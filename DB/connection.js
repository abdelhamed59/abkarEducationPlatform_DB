import mongoose from "mongoose";
const connection = () => {
    mongoose.connect("mongodb://localhost:27017/abkar")
        .then(console.log("connect to mongoose"))
        .catch(err=>console.log(err))
}

export default connection;