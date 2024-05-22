import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    autoId:{
        type:Number,
        default: 0
    },
    name : {
        type:String,
        default: ""
    },
    email:{
        type:String,
        default: ""
    },
    password:{
        type:String,
        default: ""
    },
    userType:{
        type:Number,
        default: 2    //1 for Admin and 2 for User
    },
    status:{
        type:Boolean,
        default: true
    },
    createdAt:{
        type:Date,
        default: Date.now()
    }
})

const userModel=mongoose.model("user",userSchema);

export default userModel;