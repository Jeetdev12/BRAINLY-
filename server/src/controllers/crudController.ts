import { Response } from "express";
import { ContentModel } from "../models/contentModel";
import { LinkModel } from "../models/linkModel";
import { random } from "../utils";
import { UserModel } from "../models/userModel";
import { AuthRequest } from "../middleware/middleware";

// 🟢 Add Content
export const addContent = async (req: AuthRequest, res: Response) => {
  const { link, type } = req.body;
  const userId = req.userId;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const userInfo = await UserModel.findById(userId);
    console.log("userInfo::", userInfo);

    await ContentModel.create({
      link,
      type,
      userId,
      tags: [],
    });

    res.status(200).json({ message: "Content added successfully" });
  } catch (error: any) {
    res.status(500).json({
      message: `Content insertion failed: ${error.message}`,
    });
  }
};

// 🟢 Fetch all content
export const allcontent = async (_req: AuthRequest, res: Response) => {
  try {
    const content = await ContentModel.find();
    res.status(200).json({
      message: "Content fetched successfully",
      content,
    });
  } catch (error: any) {
    res.status(500).json({ message: `Content fetch failed: ${error.message}` });
  }
};

// 🟢 Filter by type
export const type = async (req: AuthRequest, res: Response) => {
  console.log("Entering in filter..")
  try {
    const content = await ContentModel.find({ type: 'document' })
    res.json({ content });
  } catch (error: any) {
    res.status(500).json({ message: `Error filtering content: ${error.message}` });
  }
};

// 🟢 Delete content
export const deleteContent = async (req: AuthRequest, res: Response) => {
  try {
    const { contentId } = req.body;
    const isContentExist = await ContentModel.findById(contentId);

    if (!isContentExist) {
      return res.status(404).json({ message: "Content not found" });
    }

    const result = await ContentModel.deleteOne({ _id: contentId });
    res.status(200).json({
      message: "Content deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 Share brain (generate/delete link)
export const shareBrain = async (req: AuthRequest, res: Response) => {
  try {
    const { share } = req.body;
    const userId = req.userId;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    if (share) {
      const existingLink = await LinkModel.findOne({ userId });

      if (existingLink) {
        return res.json({ hash: existingLink.hash });
      }

      const hash = random(10);
      await LinkModel.create({ userId, hash });
      res.json({ hash });
    } else {
      await LinkModel.deleteOne({ userId });
      res.status(200).json({ message: "Link removed" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 Share brain via link ID
export const shareBrainId = async (req: AuthRequest, res: Response) => {
  try {
    const hash = req.params.shareLink;
    const link = await LinkModel.findOne({ hash });

    if (!link) {
      return res.status(404).json({ message: "Invalid share link" });
    }

    const content = await ContentModel.find({ userId: link.userId });
    const username = await UserModel.findById(link.userId);

    if (!username) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ username, content });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
