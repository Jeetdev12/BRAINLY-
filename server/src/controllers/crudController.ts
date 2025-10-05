import { Request, Response } from "express";
import { ContentModel } from "../models/contentModel";
import { LinkModel } from "../models/linkModel";
import { random } from "../utils";
import { UserModel } from "../models/userModel";
import { AuthRequest } from "../middleware/middleware";


export const content = async (req:AuthRequest, res:Response) => {
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

}


export const type =async (req:AuthRequest,res:Response)=>{
      const type = req.params.type
      const content = await ContentModel.find({
        type: type,
      }).populate("userId", "username")
      console.log("filter content:", content)
      res.json({
        content
      })
}

export const deleteContent = async (req:AuthRequest, res:Response) => {
  try {
    const contentId = req.body.contentId;

    const result = await ContentModel.deleteMany({ _id: contentId });

    res.status(200).json({
      message: "Content Deleted successfully.",
      deletedCount: result.deletedCount,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const shareBrain = async (req:AuthRequest, res:Response) => {
  const share = req.body.share;
  console.log("share brain userId: req.userId", req.userId)

  if (share) {
    const existingLink: any = await LinkModel.findOne({
      userId: req.userId
    })


    console.log('Ex:',existingLink)
    if (existingLink) {
      res.json({ hash: existingLink?.hash })
      return;
    }

    const hash = random(10);
    console.log("userId: req.userId", req.userId, existingLink?.hash)
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
}

export const shareBrainId = async (req:AuthRequest, res:Response) => {
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

}