import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import jwt from "jsonwebtoken"


export const signup = async (req:Request, res:Response) => {
  console.log("signup route hitted..");

  try {
    const { username,email, password } = req.body;
    const response = await UserModel.create({ username, password,email });

    return res.status(200).json({ message: "signedup successfully" })
  } catch (err: any) {
    console.error("❌ Error in signup:", err);
    return res.status(500).json({ error: err.message });
  }
}


export const signin = async (req:Request,res:Response)=>{

    {
    
      console.log("signin....")
    
      const { username, password ,email} = req.body;
      try {
        const response: any = await UserModel.findOne({
          email
        })
        if (response) {
          const token = jwt.sign({ _id: response._id }, `${process.env.JWT_PASSWORD}`)
          return res.status(200).json({ message: token });
        } else {
          return res.status(403).json({ message: "Invalid credentials",
            response:response
           })
        }
      } catch (err: any) {
        console.log("error:", err)
        return res.status(400).json({ message: err.message })
      }
    
    
    
    }
}


