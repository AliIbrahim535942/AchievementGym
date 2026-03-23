import mongoose from "mongoose";
import envVariables from "./dotenv_config";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(envVariables.DB_URL, {
    
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Connection failed:", error);
    process.exit(1); 
  }
};
export default connectDB;