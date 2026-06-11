import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import { setServers } from "node:dns/promises";

setServers(["1.1.1.1", "8.8.8.8"]);

const dbConnect = ()=>{
 
  console.log("dbConnect:",process.env.MONGO_URI)
    
mongoose.connect(`${process.env.MONGO_URI}`)
  .then((response) => {
    console.log("✅ MongoDB connected");

    // Only start the server AFTER DB connection
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err);
  });
}

export default dbConnect;