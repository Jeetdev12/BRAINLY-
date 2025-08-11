"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userMiddleware = (req, res, next) => {
    const header = req.headers["authorization"];
    try {
        const decoded = jsonwebtoken_1.default.verify(header, `${process.env.JWT_PASSWORD}`);
        console.log("token", header, decoded, `${process.env.JWT_PASSWORD}`);
        if (decoded) {
            console.log(decoded._id);
            if (typeof decoded === "string") {
                res.status(403).json({
                    message: "You are not logged in"
                });
                return;
            }
            //@ts-ignore
            req.userId = decoded._id;
            next();
        }
        else {
            res.status(403).json({
                message: "You are not logged in"
            });
        }
    }
    catch (err) {
        res.json(403).json({ message: err.message });
    }
};
exports.userMiddleware = userMiddleware;
