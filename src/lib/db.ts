import mongoose from "mongoose";

export async function connectDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing uri in env");
  }
  await mongoose.connect(uri);
}
