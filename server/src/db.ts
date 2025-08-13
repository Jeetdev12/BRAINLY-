
import mongoose,{  model, Schema } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();




const UserSchema = new Schema({
    username:{type:String, unique:true, required:true},
    password:{type:String,required:true}
})


export const UserModel = model("user",UserSchema)

const ContentSchema = new Schema({
  title:String,
  link:String,
  tags:[{type:mongoose.Types.ObjectId, ref:'Tags'}],
  userId:{type:mongoose.Types.ObjectId,ref:'user',required:true}
})

export const ContentModel = model("content",ContentSchema)

const LinkSchema = new Schema({
  hash:String, 
  userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true}
  
})

export const LinkModel = model("Links", LinkSchema)
