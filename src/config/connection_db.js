import mongoose from "mongoose";
async function connection_db() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(`Connected to DB successfully`);
  } catch (err) {
    console.error(`Error connecting to DB:`, err);
  }
}

export default connection_db;
