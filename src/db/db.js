import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URL,{
      autoIndex: true
    })
    console.log('DB is connected')
  } catch (e) {
    console.log('Error in connecting MongoDB', e);
  }
}