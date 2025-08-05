import  express from "express"
const app = express();
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { UserModel } from "./db";
import cors from "cors";


 app.use(express.json())

const allowedOrigins = [
    'http://localhost:3000'
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

 mongoose.connect(process.env.MONGODB_URL!)

app.post("/api/v1/signup",async(req,res)=>{
  
  console.log("signup route hitted..")
    

    // zod validation , hash password
    const username = req.body.username;
    const password = req.body.password;

  await  UserModel.create({
        username:username,
        password:password
    })

    return res.status(200).json({message:"Sign up successful.."})

})

app.post("api/v1/signin",(req,res)=>{

  return res.status(200).json({message:"Everything id okk"})
    
})

app.get("api/v1/content",(req,res)=>{
  return res.status(200).json({message:"Everything id okk"})
     
})

app.delete("api/v1/content",(req,res)=>{
    
})

app.listen(3000)


