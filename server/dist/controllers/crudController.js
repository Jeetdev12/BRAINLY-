"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shareBrainId = exports.shareBrain = exports.deleteContent = exports.filterByType = exports.allcontent = exports.addContent = void 0;
const contentModel_1 = require("../models/contentModel");
const linkModel_1 = require("../models/linkModel");
const utils_1 = require("../utils");
const userModel_1 = require("../models/userModel");
const addContent = async (req, res) => {
    const { link, type, title, content } = req.body;
    const userId = req.userId;
    if (!userId)
        return res.status(401).json({ message: "Unauthorized" });
    if (!title?.trim())
        return res.status(400).json({ message: "Title is required" });
    const isTextType = type === "notes" || type === "quote";
    if (!isTextType && !link?.trim())
        return res.status(400).json({ message: "Link is required for this type" });
    if (isTextType && !content?.trim())
        return res.status(400).json({ message: "Content is required" });
    try {
        const payload = { title, type, userId, tags: [] };
        if (isTextType)
            payload.content = content;
        else
            payload.link = link;
        await contentModel_1.ContentModel.create(payload);
        res.status(200).json({ message: "Content added successfully" });
    }
    catch (error) {
        res.status(500).json({ message: `Content insertion failed: ${error.message}` });
    }
};
exports.addContent = addContent;
const allcontent = async (req, res) => {
    try {
        const content = await contentModel_1.ContentModel.find({ userId: req.userId });
        res.status(200).json({ message: "Content fetched successfully", content });
    }
    catch (error) {
        res.status(500).json({ message: `Content fetch failed: ${error.message}` });
    }
};
exports.allcontent = allcontent;
const filterByType = async (req, res) => {
    try {
        const { type } = req.query;
        const content = await contentModel_1.ContentModel.find({ type, userId: req.userId });
        res.status(200).json({ success: true, content });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.filterByType = filterByType;
const deleteContent = async (req, res) => {
    try {
        const { contentId } = req.body;
        const exists = await contentModel_1.ContentModel.findOne({ _id: contentId, userId: req.userId });
        if (!exists)
            return res.status(404).json({ message: "Content not found or unauthorized" });
        await contentModel_1.ContentModel.deleteOne({ _id: contentId, userId: req.userId });
        res.status(200).json({ message: "Content deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteContent = deleteContent;
const shareBrain = async (req, res) => {
    try {
        const { share } = req.body;
        const userId = req.userId;
        if (!userId)
            return res.status(401).json({ message: "Access denied" });
        if (share) {
            const existingLink = await linkModel_1.LinkModel.findOne({ userId });
            if (existingLink)
                return res.json({ hash: existingLink.hash }); // reuse existing
            const hash = (0, utils_1.random)(10);
            await linkModel_1.LinkModel.create({ userId, hash, share: true });
            return res.json({ hash });
        }
        else {
            await linkModel_1.LinkModel.deleteOne({ userId });
            return res.status(200).json({ message: "Link removed" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.shareBrain = shareBrain;
const shareBrainId = async (req, res) => {
    try {
        const hash = req.params.shareLink;
        const link = await linkModel_1.LinkModel.findOne({ hash });
        if (!link)
            return res.status(404).json({ message: "Invalid share link" });
        const content = await contentModel_1.ContentModel.find({ userId: link.userId });
        const user = await userModel_1.UserModel.findById(link.userId).select("username");
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json({ username: user.username, content });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.shareBrainId = shareBrainId;
