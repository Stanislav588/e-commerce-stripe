import mongoose from "mongoose";
const CartSchema = new mongoose.Schema(
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
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    size: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    stock: { type: Number, required: true, default: 10 },
  },

  {
    timestamps: true,
  }
);
export default mongoose.model("Cart", CartSchema);
