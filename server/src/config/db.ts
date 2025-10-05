import mongoose from "mongoose";


const dbConnect = ()=>{

    
mongoose.connect(`${process.env.MONGODB_URL}`)
  .then(() => {
    console.log("✅ MongoDB connected");

    // Only start the server AFTER DB connection
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
}

export default dbConnect;