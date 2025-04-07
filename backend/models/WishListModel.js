import mongoose from "mongoose";
const WishListModel = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },

  {
    timestamps: true,
  }
);
export default mongoose.model("WishList", WishListModel);
