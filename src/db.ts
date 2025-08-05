
import mongoose,{  model, Schema } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


 mongoose.connect(process.env.MONGODB_URL!)




const UserSchema = new Schema({
    username:{type:String, unique:true, required:true},
    password:{type:String,required:true}
})







export const UserModel =  mongoose.model("user",UserSchema)