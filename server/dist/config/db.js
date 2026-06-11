"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const promises_1 = require("node:dns/promises");
(0, promises_1.setServers)(["1.1.1.1", "8.8.8.8"]);
const dbConnect = () => {
    console.log("dbConnect:", process.env.MONGO_URI);
    mongoose_1.default.connect(`${process.env.MONGO_URI}`)
        .then((response) => {
        console.log("✅ MongoDB connected");
        // Only start the server AFTER DB connection
    })
        .catch((err) => {
        console.error(" MongoDB connection error:", err);
    });
};
exports.default = dbConnect;
