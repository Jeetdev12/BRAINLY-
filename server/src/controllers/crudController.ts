import { Response } from "express";
import { ContentModel } from "../models/contentModel";
import { LinkModel } from "../models/linkModel";
import { random } from "../utils";
import { UserModel } from "../models/userModel";
import { AuthRequest } from "../middleware/middleware";

// Add Content
// export const addContent = async (req: AuthRequest, res: Response) => {
//   const { link, type } = req.body;
//   const userId = req.userId;

//   if (!userId) return res.status(401).json({ message: "Unauthorized" });

//   try {
//     const userInfo = await UserModel.findById(userId);
//     console.log("userInfo::", userInfo);

//     await ContentModel.create({
//       link,
//       type,
//       userId,
//       tags: [],
//     });

//     res.status(200).json({ message: "Content added successfully" });
//   } catch (error: any) {
//     res.status(500).json({
//       message: `Content insertion failed: ${error.message}`,
//     });
//   }
// };

// Add Content
export const addContent = async (req: AuthRequest, res: Response) => {
  const { link, type, title, content } = req.body; // <-- added title & content
  const userId = req.userId;

  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    // Validate input based on type
    if (!title?.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (type !== "notes" && !link?.trim()) {
      return res.status(400).json({ message: "Link is required for this type" });
    }

    if (type === "notes" && !content?.trim()) {
      return res.status(400).json({ message: "Content is required for notes" });
    }

    const payload: any = {
      title,
      type,
      userId,
      tags: [],
    };

    // Add appropriate field depending on content type
    if (type === "notes") {
      payload.content = content;
    } else {
      payload.link = link;
    }

    await ContentModel.create(payload);

    res.status(200).json({ message: "✅ Content added successfully!" });
  } catch (error: any) {
    console.error("Add Content Error:", error);
    res.status(500).json({
      message: `Content insertion failed: ${error.message}`,
    });
  }
};


//  Fetch all content
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

//  Filter by type
export const type = async (req: AuthRequest, res: Response) => {

  try {
    console.log("Req info in type : ", req)
    const { type } = req.query;
    const content = await ContentModel.find({ type })
    res.status(200).json({
       success: true,
        content, 
        message: `${type} content fetched successfully`
      });

  } catch (error: any) {
    res.status(500).json({ success: false,
       message: `Error filtering content: ${error.message}`
       });
  }
};

//  Delete content
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

//  Share brain (generate/delete link)
export const shareBrain = async (req: AuthRequest, res: Response) => {
  try {
    const { share } = req.body;
    const userId = req.userId;

    if (!userId) return res.status(401).json({ message: "Access denied" });

    if (share) {
      const existingLink = await LinkModel.findOne({ userId });

      if (!existingLink) {
        return res.json({
          message: "Link is wrong "
        });
      }

      const hash = random(10);
      await LinkModel.create({ userId, hash, share: true });
      res.json({ hash });
    } else {
      await LinkModel.deleteOne({ userId });
      res.status(200).json({ message: "Link removed" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//  Share brain via link ID
export const shareBrainId = async (req: AuthRequest, res: Response) => {
  try {
    const hash = req.params.shareLink;
    const link = await LinkModel.findOne({ hash, });

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
