import mongoose from "mongoose";
import envVariables from "./dotenv_config.js";
async function connection_db() {
  try {
    await mongoose.connect(envVariables.DB_URL);
    console.log(`Connected to DB successfully`);
  } catch (err) {
    console.error(`Error connecting to DB:`, err);
  }
}

export default connection_db;
