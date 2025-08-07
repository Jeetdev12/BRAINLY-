import express from "express"
const app = express();
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { UserModel } from "./db";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

app.use(express.json())

const allowedOrigins = [
  'http://localhost:3000'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

//mongodb+srv://yadumanjeet1234:aKHcmg3t94GpscHp@brainly.sdfbxnc.mongodb.net/


const uri = "";

// const MONGO_URI =process.env.MONGODB_URL;

mongoose.connect(`${process.env.MONGODB_URL}`)
  .then(() => {
    console.log("✅ MongoDB connected");

    // Only start the server AFTER DB connection
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });


app.post("/api/v1/signup", async (req, res) => {
  console.log("signup route hitted..");

  try {
    const { username, password } = req.body;
    const response = await UserModel.create({ username, password });

    return res.status(200).json({ message: "signedup successfully" })
  } catch (err: any) {
    console.error("❌ Error in signup:", err);
    return res.status(500).json({ error: err.message });
  }
});


app.post("/api/v1/signin", async (req, res) => {

  console.log("signin....")

  const { username, password } = req.body;
  try {
    const response: any = await UserModel.findOne({
      username, password
    })
    if (response) {
      const token = jwt.sign({ _id: response._id }, `${process.env.JWT_PASSWORD}`)
      return res.status(200).json({ message: token });
    } else {
      return res.status(403).json({ message: "Invalid credentials" })
    }
  } catch (err:any) {
    console.log("error:", err)
    return res.status(400).json({message:err.message})
  }



})

app.get("/api/v1/content", (req, res) => {
  return res.status(200).json({ message: "Everything id okk" })

})

app.delete("/api/v1/content", (req, res) => {

})

app.listen(3000)


