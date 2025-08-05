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
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors"));
app.use(express_1.default.json());
const allowedOrigins = [
    'http://localhost:3000'
];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
}));
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("signup route hitted..");
    // zod validation , hash password
    const username = req.body.username;
    const password = req.body.password;
    yield db_1.UserModel.create({
        username: username,
        password: password
    });
    return res.status(200).json({ message: "Sign up successful.." });
}));
app.post("api/v1/signin", (req, res) => {
    return res.status(200).json({ message: "Everything id okk" });
});
app.get("api/v1/content", (req, res) => {
    return res.status(200).json({ message: "Everything id okk" });
});
app.delete("api/v1/content", (req, res) => {
});
app.listen(3000);
