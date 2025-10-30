import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/db";
import routes from "./routes/routes";


dotenv.config();
const app = express();

const startServer = async () => {
  console.log("✅ Routes type:", typeof routes);
  await dbConnect()

  // ✅ Simple and safe CORS setup
  app.use(
    cors({
      origin: [
        `${process.env.ORIGIN_URL}`,
        "http://localhost:5173",
        "https://brainly-fawn.vercel.app",
      ],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      credentials: true,
    })
  );

  // ✅ Handle preflight manually for safety (important for Render)
  app.options("/any", cors());

  app.use(express.json());
  app.use("/api/v1", routes);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
};

startServer();
