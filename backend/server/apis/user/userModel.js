import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    autoId:{
        type:Number,
        default: 0
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'customer',
        default: "" // Default empty string
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