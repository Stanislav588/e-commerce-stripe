import ProductModel from "../models/ProductModel.js";
export const createProduct = async (req, res) => {
  const { image } = req.body;
  try {
    const doc = new ProductModel({
      ...req.body,
      image,
    });
    if (!doc) {
      return res.json({
        message: "Product not found",
      });
    }
    const product = await doc.save();

    res.json(product);
    return res.status(201).json({
      message: "Product added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const user = await ProductModel.find();
    if (!user) {
      return res.json({
        message: "Product not found",
      });
    }
    res.json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get products",
    });
  }
};
export const getProductByGender = async (req, res) => {
  const { gender, category } = req.query;
  try {
    const product = await ProductModel.find({
      gender: gender,
      category: category,
    });
    if (!product || product.length === 0) {
      return res.status(500).json({
        message: "Product with this gender not found",
      });
    }

    return res
      .status(200)
      .json({ message: "Genre found successfully", product });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get products by gender",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const productId = await ProductModel.findById(req.params);
    if (!productId) {
      return res.status(403).json({
        message: "Product id not found",
      });
    }
    return res.status(201).json({
      ...productId._doc,
      message: "Product found successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get product",
    });
  }
};
