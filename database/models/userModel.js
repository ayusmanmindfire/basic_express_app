import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        unique: true,
        require: true
    },
    phone:{
        type:String,
        unique:true,
        require: true
    }
})

const userModel=new mongoose.model("User", userSchema);

export default userModel;