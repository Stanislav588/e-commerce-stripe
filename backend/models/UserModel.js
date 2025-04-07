import mongoose from "mongoose";
const UserModel = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("User", UserModel);
