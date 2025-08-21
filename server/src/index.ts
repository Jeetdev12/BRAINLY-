import express from "express"
const app = express();
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { ContentModel, LinkModel, UserModel } from "./db";
import cors from "cors";
import dotenv from 'dotenv';
import { userMiddleware } from "./middleware";
import { random } from "./utils";
dotenv.config();

app.use(cors({
  origin: ["http://localhost:5173","http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json())







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
  // console.log(link, type)
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

app.get("/api/v1/content", userMiddleware, async (req: {
  userId: any;
}, res: any) => {

  const userId = req.userId;
  const content = await ContentModel.find({
    userId: userId,
  }).populate("userId", "username")

  res.json({
    content
  })
})

app.delete("/api/v1/content", userMiddleware, (req, res) => {

  const contentId = req.body.contentId
  ContentModel.deleteMany({ field: contentId })
})

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
  const share = req.body.share;
  console.log("userId: req.userId", req.userId)

  if (share) {
    const existingLink = await LinkModel.findOne({
      userId: req.userId
    })

    if (existingLink) {
      res.json({ hash: existingLink.hash })
      return;
    }

    const hash = random(10);
    console.log("userId: req.userId", req.userId)
    await LinkModel.create(
      {
        userId: req.userId,
        hash: hash
      }
    )
    res.json({ message: hash })
  } else {
    await LinkModel.deleteOne({
      userId: req.userId,
    })
    res.status(200).json({ message: "link removed" })
  }
})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink
  const link: any = await LinkModel.findOne(
    { hash: hash }
  )
  console.log("link:", link, hash)
  if (!link) {
    res.status(411).json({
      message: "SORRY INCORRECT INPUT"
    })
    return;
  }

  const content = await ContentModel.findOne({
    userId: link.userId
  })
  const username = await UserModel.findOne({
    _id: link.userId
  })

  if (!username) {
    res.status(411).json({
      message: "user not found , logically this should not happen "
    })
  }
  res.json({
    username: username,
    content: content
  })

})

app.listen(3000)
