import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";
import routes from "./routes/routes.js";

dotenv.config();
const app = express();

const startServer = async () => {
  await dbConnect();

  // ✅ Simple and safe CORS setup
  app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "https://brainly-fawn.vercel.app",
      ],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      credentials: true,
    })
  );

  // ✅ Handle preflight manually for safety (important for Render)
  app.options("*", cors());

  app.use(express.json());
  app.use("/api/v1", routes);

  app.get("/", (req, res) => {
    res.send("Server running fine!");
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
};

startServer();
