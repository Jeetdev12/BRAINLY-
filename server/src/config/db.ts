import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


const dbConnect = ()=>{
 
  console.log("dbConnect:",process.env.MONGODB_URL)
    
mongoose.connect(`${process.env.MONGODB_URL}`)
  .then((response) => {
    console.log("✅ MongoDB connected");

    // Only start the server AFTER DB connection
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
}

export default dbConnect;