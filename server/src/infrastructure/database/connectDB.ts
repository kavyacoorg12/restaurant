import mongoose from "mongoose";

export async function connectDB()
{
  const MONGO_URL=process.env.MONGO_URL
    if (!MONGO_URL) {
    throw new Error("MONGO_URI environment variable is not set");
  }
  try{
       await mongoose.connect(MONGO_URL);
       console.log("Mongodb connected")
  }catch(err)
  {
    console.log(err)
  }
}