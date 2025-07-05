import { error } from "console";
import mongoose from "mongoose";

export const dbCon = (req, res) => {
  try {
    mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    error: err.message;
  }
};
