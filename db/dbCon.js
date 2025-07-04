
import { error } from "console";
import mongoose  from "mongoose";

export const dbCon=(req,res)=>{
   try{
    mongoose.connect("mongodb://localhost:27017/ecomApi")

   }catch(err){
     error:err.message
   }
}
