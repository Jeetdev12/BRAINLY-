import mongoose, { Schema, model } from "mongoose"




const ContentSchema = new Schema({
  title:String,
  link:String,
  type:String,
  tags:[{type:mongoose.Types.ObjectId, ref:'Tags'}],
  userId:{type:mongoose.Types.ObjectId,ref:'user',required:true}
},{ timestamps: true })

export const ContentModel = model("content",ContentSchema)