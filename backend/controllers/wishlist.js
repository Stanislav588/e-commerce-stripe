import WishListModel from "../models/WishListModel.js";
import ProductModel from "../models/ProductModel.js";
export const addProductToWishList = async (req, res) => {
  const { productId } = req.body;
  const userId = req.userId;
  try {
    const products = await ProductModel.findById(productId);
    if (!products) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    let isAddedProduct = await WishListModel.findOne({
      product: productId,
      user: userId,
    });
    if (isAddedProduct) {
      return res.status(409).json({
        message: "Product is allready added",
      });
    } else {
      const doc = new WishListModel({
        product: productId,
        user: userId,
      });
      await doc.save();
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getProductsFromWishList = async (req, res) => {
  try {
    const products = await WishListModel.find({ user: req.userId }).populate(
      "product"
    );
    if (products.length === 0) {
      return res.status(403).json({
        message: "Product not found",
      });
    }

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteFromWishList = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.userId;
    const product = await WishListModel.findOneAndDelete({
      user: userId,
      product: productId,
    });
    if (!product) {
      return res.status(403).json({
        message: "Product not found",
      });
    }
    return res.status(200).json({
      message: "Product removed from wishlist",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
