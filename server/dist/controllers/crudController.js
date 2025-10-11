"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shareBrainId = exports.shareBrain = exports.deleteContent = exports.type = exports.allcontent = exports.addContent = void 0;
const contentModel_1 = require("../models/contentModel");
const linkModel_1 = require("../models/linkModel");
const utils_1 = require("../utils");
const userModel_1 = require("../models/userModel");
// 🟢 Add Content
const addContent = async (req, res) => {
    const { link, type } = req.body;
    const userId = req.userId;
    if (!userId)
        return res.status(401).json({ message: "Unauthorized" });
    try {
        const userInfo = await userModel_1.UserModel.findById(userId);
        console.log("userInfo::", userInfo);
        await contentModel_1.ContentModel.create({
            link,
            type,
            userId,
            tags: [],
        });
        res.status(200).json({ message: "Content added successfully" });
    }
    catch (error) {
        res.status(500).json({
            message: `Content insertion failed: ${error.message}`,
        });
    }
};
exports.addContent = addContent;
// 🟢 Fetch all content
const allcontent = async (_req, res) => {
    try {
        const content = await contentModel_1.ContentModel.find();
        res.status(200).json({
            message: "Content fetched successfully",
            content,
        });
    }
    catch (error) {
        res.status(500).json({ message: `Content fetch failed: ${error.message}` });
    }
};
exports.allcontent = allcontent;
// 🟢 Filter by type
const type = async (req, res) => {
    console.log("Entering in filter..");
    try {
        const content = await contentModel_1.ContentModel.find({ type: req.params.type });
        res.json({ content });
    }
    catch (error) {
        res.status(500).json({ message: `Error filtering content: ${error.message}` });
    }
};
exports.type = type;
// 🟢 Delete content
const deleteContent = async (req, res) => {
    try {
        const { contentId } = req.body;
        const isContentExist = await contentModel_1.ContentModel.findById(contentId);
        if (!isContentExist) {
            return res.status(404).json({ message: "Content not found" });
        }
        const result = await contentModel_1.ContentModel.deleteOne({ _id: contentId });
        res.status(200).json({
            message: "Content deleted successfully",
            deletedCount: result.deletedCount,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteContent = deleteContent;
// 🟢 Share brain (generate/delete link)
const shareBrain = async (req, res) => {
    try {
        const { share } = req.body;
        const userId = req.userId;
        if (!userId)
            return res.status(401).json({ message: "Unauthorized" });
        if (share) {
            const existingLink = await linkModel_1.LinkModel.findOne({ userId });
            if (existingLink) {
                return res.json({ hash: existingLink.hash });
            }
            const hash = (0, utils_1.random)(10);
            await linkModel_1.LinkModel.create({ userId, hash });
            res.json({ hash });
        }
        else {
            await linkModel_1.LinkModel.deleteOne({ userId });
            res.status(200).json({ message: "Link removed" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.shareBrain = shareBrain;
// 🟢 Share brain via link ID
const shareBrainId = async (req, res) => {
    try {
        const hash = req.params.shareLink;
        const link = await linkModel_1.LinkModel.findOne({ hash });
        if (!link) {
            return res.status(404).json({ message: "Invalid share link" });
        }
        const content = await contentModel_1.ContentModel.find({ userId: link.userId });
        const username = await userModel_1.UserModel.findById(link.userId);
        if (!username) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ username, content });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.shareBrainId = shareBrainId;
