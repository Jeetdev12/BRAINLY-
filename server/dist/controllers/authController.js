"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.signin = exports.signup = void 0;
const userModel_1 = require("../models/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password)
            return res.status(400).json({ message: "All fields are required" });
        const existing = await userModel_1.UserModel.findOne({ email });
        if (existing)
            return res.status(409).json({ message: "Email already registered" });
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        await userModel_1.UserModel.create({ username, email, password: hashedPassword });
        return res.status(201).json({ message: "Signed up successfully" });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
exports.signup = signup;
const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: "Email and password required" });
        const user = await userModel_1.UserModel.findOne({ email });
        if (!user)
            return res.status(403).json({ message: "Invalid credentials" });
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(403).json({ message: "Invalid credentials" });
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, `${process.env.JWT_PASSWORD}`, { expiresIn: "7d" } // token expires in 7 days
        );
        return res.status(200).json({ token });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.signin = signin;
// PUT /api/v1/user/update
const updateUser = async (req, res) => {
    const { username, email, password } = req.body;
    const update = {};
    if (username)
        update.username = username;
    if (email)
        update.email = email;
    if (password)
        update.password = await bcrypt_1.default.hash(password, 10);
    await userModel_1.UserModel.findByIdAndUpdate(req.userId, update);
    res.json({ message: "Profile updated" });
};
exports.updateUser = updateUser;
