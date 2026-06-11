import { Response } from "express"
import { ContentModel } from "../models/contentModel"
import { LinkModel } from "../models/linkModel"
import { random } from "../utils"
import { UserModel } from "../models/userModel"
import { AuthRequest } from "../middleware/middleware"

export const addContent = async (req: AuthRequest, res: Response) => {
  const { link, type, title, content } = req.body
  const userId = req.userId

  if (!userId) return res.status(401).json({ message: "Unauthorized" })
  if (!title?.trim()) return res.status(400).json({ message: "Title is required" })

  const isTextType = type === "notes" || type === "quote"

  if (!isTextType && !link?.trim())
    return res.status(400).json({ message: "Link is required for this type" })

  if (isTextType && !content?.trim())
    return res.status(400).json({ message: "Content is required" })

  try {
    const payload: any = { title, type, userId, tags: [] }
    if (isTextType) payload.content = content
    else payload.link = link

    await ContentModel.create(payload)
    res.status(200).json({ message: "Content added successfully" })
  } catch (error: any) {
    res.status(500).json({ message: `Content insertion failed: ${error.message}` })
  }
}

export const allcontent = async (req: AuthRequest, res: Response) => {
  try {
    const content = await ContentModel.find({ userId: req.userId })
    res.status(200).json({ message: "Content fetched successfully", content })
  } catch (error: any) {
    res.status(500).json({ message: `Content fetch failed: ${error.message}` })
  }
}

export const filterByType = async (req: AuthRequest, res: Response) => {
  try {
    const { type } = req.query
    const content = await ContentModel.find({ type, userId: req.userId })
    res.status(200).json({ success: true, content })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const deleteContent = async (req: AuthRequest, res: Response) => {
  try {
    const { contentId } = req.body

    const exists = await ContentModel.findOne({ _id: contentId, userId: req.userId })
    if (!exists) return res.status(404).json({ message: "Content not found or unauthorized" })

    await ContentModel.deleteOne({ _id: contentId, userId: req.userId })
    res.status(200).json({ message: "Content deleted successfully" })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const shareBrain = async (req: AuthRequest, res: Response) => {
  try {
    const { share } = req.body
    const userId = req.userId

    if (!userId) return res.status(401).json({ message: "Access denied" })

    if (share) {
      const existingLink = await LinkModel.findOne({ userId })
      if (existingLink) return res.json({ hash: existingLink.hash }) // reuse existing

      const hash = random(10)
      await LinkModel.create({ userId, hash, share: true })
      return res.json({ hash })
    } else {
      await LinkModel.deleteOne({ userId })
      return res.status(200).json({ message: "Link removed" })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const shareBrainId = async (req: AuthRequest, res: Response) => {
  try {
    const hash = req.params.shareLink
    const link = await LinkModel.findOne({ hash })

    if (!link) return res.status(404).json({ message: "Invalid share link" })

    const content = await ContentModel.find({ userId: link.userId })
    const user = await UserModel.findById(link.userId).select("username")

    if (!user) return res.status(404).json({ message: "User not found" })

    res.json({ username: user.username, content })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}