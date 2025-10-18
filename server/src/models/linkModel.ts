
import mongoose,{  model, Schema } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


const LinkSchema = new Schema({
  hash:String, 
  share:Boolean,
  userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true}
  
})

export const LinkModel = model("Links", LinkSchema)
