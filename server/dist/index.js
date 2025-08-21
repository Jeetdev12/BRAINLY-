"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
dotenv_1.default.config();
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json());
const uri = "";
// const MONGO_URI =process.env.MONGODB_URL;
mongoose_1.default.connect(`${process.env.MONGODB_URL}`)
    .then(() => {
    console.log("✅ MongoDB connected");
    // Only start the server AFTER DB connection
})
    .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
});
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("signup route hitted..");
    try {
        const { username, password } = req.body;
        const response = yield db_1.UserModel.create({ username, password });
        return res.status(200).json({ message: "signedup successfully" });
    }
    catch (err) {
        console.error("❌ Error in signup:", err);
        return res.status(500).json({ error: err.message });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("signin....");
    const { username, password } = req.body;
    try {
        const response = yield db_1.UserModel.findOne({
            username, password
        });
        if (response) {
            const token = jsonwebtoken_1.default.sign({ _id: response._id }, `${process.env.JWT_PASSWORD}`);
            return res.status(200).json({ message: token });
        }
        else {
            return res.status(403).json({ message: "Invalid credentials" });
        }
    }
    catch (err) {
        console.log("error:", err);
        return res.status(400).json({ message: err.message });
    }
}));
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const type = req.body.type;
    console.log(link, type);
    yield db_1.ContentModel.create({
        link,
        type,
        title: req.body.title,
        //@ts-ignore
        userId: req.userId,
        tags: []
    });
    res.json({
        message: "Content added"
    });
}));
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const content = yield db_1.ContentModel.find({
        userId: userId,
    }).populate("userId", "username");
    res.json({
        content
    });
}));
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) => {
    const contentId = req.body.contentId;
    db_1.ContentModel.deleteMany({ field: contentId });
});
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    console.log("userId: req.userId", req.userId);
    if (share) {
        const existingLink = yield db_1.LinkModel.findOne({
            userId: req.userId
        });
        if (existingLink) {
            res.json({ hash: existingLink.hash });
            return;
        }
        const hash = (0, utils_1.random)(10);
        console.log("userId: req.userId", req.userId);
        yield db_1.LinkModel.create({
            userId: req.userId,
            hash: hash
        });
        res.json({ message: hash });
    }
    else {
        yield db_1.LinkModel.deleteOne({
            userId: req.userId,
        });
        res.status(200).json({ message: "link removed" });
    }
}));
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.LinkModel.findOne({ hash: hash });
    console.log("link:", link, hash);
    if (!link) {
        res.status(411).json({
            message: "SORRY INCORRECT INPUT"
        });
        return;
    }
    const content = yield db_1.ContentModel.findOne({
        userId: link.userId
    });
    const username = yield db_1.UserModel.findOne({
        _id: link.userId
    });
    if (!username) {
        res.status(411).json({
            message: "user not found , logically this should not happen "
        });
    }
    res.json({
        username: username,
        content: content
    });
}));
app.listen(3000);
