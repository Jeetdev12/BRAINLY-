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
exports.signin = exports.signup = void 0;
const userModel_1 = require("../models/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("signup route hitted..");
    try {
        const { username, email, password } = req.body;
        const response = yield userModel_1.UserModel.create({ username, password, email });
        return res.status(200).json({ message: "signedup successfully" });
    }
    catch (err) {
        console.error("❌ Error in signup:", err);
        return res.status(500).json({ error: err.message });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    {
        console.log("signin....");
        const { username, password, email } = req.body;
        try {
            const response = yield userModel_1.UserModel.findOne({
                email
            });
            if (response) {
                const token = jsonwebtoken_1.default.sign({ _id: response._id }, `${process.env.JWT_PASSWORD}`);
                return res.status(200).json({ message: token });
            }
            else {
                return res.status(403).json({ message: "Invalid credentials",
                    response: response
                });
            }
        }
        catch (err) {
            console.log("error:", err);
            return res.status(400).json({ message: err.message });
        }
    }
});
exports.signin = signin;
