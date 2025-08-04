import  express from "express"
const app = express();
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { UserModel } from "./db";

 app.use(express.json())

 // Handle unmatched routes
app.use((req, res) => {
  console.warn(`❌ 404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: "Route not found" });
});


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
    
})

app.get("api/v1/content",(req,res)=>{
    
})

app.delete("api/v1/content",(req,res)=>{
    
})

app.listen(3000)


