import express from "express"
const app = express();
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { ContentModel, UserModel } from "./db";
import cors from "cors";
import dotenv from 'dotenv';
import { userMiddleware } from "./middleware";
dotenv.config();

app.use(express.json())

const allowedOrigins = [
  'http://localhost:3000'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));



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
  } catch (err: any) {
    console.log("error:", err)
    return res.status(400).json({ message: err.message })
  }



})

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const link = req.body.link;
  const type = req.body.type;
  await ContentModel.create({
    link,
    type,
    title: req.body.title,
    //@ts-ignore
    userId: req.userId,
    tags: []
  })

  res.json({
    message: "Content added"
  })

})

app.get("/api/v1/content", userMiddleware, async (req: {userId: any;
}, res: any) => {

  const userId = req.userId;
  const content = await ContentModel.find({
    userId: userId,
  }).populate("userId","username")

  res.json({
    content
  })
})

app.delete("/api/v1/content", (req, res) => {

})

app.listen(3000)


