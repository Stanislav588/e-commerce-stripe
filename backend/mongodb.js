import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const mongoDB = mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Mongo DB OK"))
  .catch((err) => console.log(err.message));
