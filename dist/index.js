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
dotenv_1.default.config();
app.use(express_1.default.json());
const allowedOrigins = [
    'http://localhost:3000'
];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
}));
//mongodb+srv://yadumanjeet1234:aKHcmg3t94GpscHp@brainly.sdfbxnc.mongodb.net/
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
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = yield db_1.UserModel.findOne({
        username,
        password
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id
        }, `${process.env.JWT_PASSWORD}`);
        res.json({
            token
        });
    }
    else {
        res.status(403).json({
            message: "Incorrrect credentials"
        });
    }
}));
app.get("api/v1/content", (req, res) => {
    return res.status(200).json({ message: "Everything id okk" });
});
app.delete("api/v1/content", (req, res) => {
});
app.listen(3000);
