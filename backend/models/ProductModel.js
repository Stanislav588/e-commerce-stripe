import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    details: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    img: {
      type: String,
      required: true,
    },
    optionalImg: {
      type: [String],
    },
    color: {
      type: [String],
      required: true,
    },

    material: {
      type: [String],
    },
    gender: {
      type: String,
      required: true,
    },
    reviews: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reviews",
    },
    rating: {
      type: Number,
      default: 0,
    },
    stock: { type: Number, default: 10 },
  },

  {
    timestamps: true,
  }
);
export default mongoose.model("Product", ProductSchema);
