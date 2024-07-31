import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri, {
      dbName: "Mordle",
    });
    console.log("Connected to MongoDB Atlas");
  } catch (e) {
    console.error("Error connecting to MongoDB Atlas", e);
  }
};

export default connectToDatabase;
