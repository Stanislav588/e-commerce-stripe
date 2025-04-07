import mongoose from "mongoose";
const CouponSchema = new mongoose.Schema(
  {
    code: {
      unique: true,
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Coupon", CouponSchema);
