
import mongoose,{  model, Schema } from "mongoose";

 mongoose.connect("mongodb+srv://yadumanjeet1234:p9cV6uQR4gRECnBq@cluster0.lobm4lv.mongodb.net/")


const UserSchema = new Schema({
    username:{type:String, unique:true, required:true},
    password:{type:String,required:true}
})







export const UserModel =  mongoose.model("user",UserSchema)