"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const routes_1 = __importDefault(require("./routes/routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const startServer = async () => {
    console.log("✅ Routes type:", typeof routes_1.default);
    await (0, db_1.default)();
    // ✅ Simple and safe CORS setup
    app.use((0, cors_1.default)({
        origin: [
            "http://localhost:5173",
            "https://brainly-fawn.vercel.app",
        ],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        credentials: true,
    }));
    // ✅ Handle preflight manually for safety (important for Render)
    app.options("*", (0, cors_1.default)());
    app.use(express_1.default.json());
    app.use("/api/v1", routes_1.default);
    app.get("/", (req, res) => {
        res.send("Server running fine!");
    });
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
};
startServer();
