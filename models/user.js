import mongoose from "mongoose";
import validator from 'validator';

const userSchema=mongoose.Schema({
  name:{
    type:String,
    required:[true,'the name is required'],
  },
  email:{
    type:String,
    required:[true,'the name is required'],
    unique:true,
    validate:{
      validator:validator.isEmail,
      message:"Please Enter a valid Email"
    }
  },
  password:{
    type:String,
    required:[true,'password is required']
  },
  confirmpassword:{
    type:String,
  },
  createdAt:{type:Date,default:Date.now}
})

export const userModel=mongoose.model("user",userSchema)