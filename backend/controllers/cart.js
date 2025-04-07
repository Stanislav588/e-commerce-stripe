import CartModel from "../models/CartModel.js";
import ProductModel from "../models/ProductModel.js";
export const addProduct = async (req, res) => {
  try {
    const { productId, size } = req.body;
    const userId = req.userId;
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cartItem = await CartModel.findOne({
      user: userId,
      product: productId,
      size: size,
    });
    if (!size || size === 0) {
      return res.status(403).json({
        message: "Invalid size",
      });
    }

    if (cartItem) {
      cartItem.quantity += 1;

      await cartItem.save();
      return res.status(200).json({
        message: "Product size and  quantity updated in cart",
        cartItem,
      });
    } else {
      const doc = new CartModel({
        user: userId,
        product: productId,
        size: size,
      });

      await doc.save();
      return res
        .status(200)
        .json({ message: "Product added to cart successfully", cartItem: doc });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getCartProduct = async (req, res) => {
  try {
    const cart = await CartModel.find({ user: req.userId }).populate("product");

    if (!cart) {
      return res.status(403).json({
        message: "Cart is empty",
      });
    }
    res.json(cart);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get cart product",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const cartItem = req.params.id;
    const userId = req.userId;
    const product = await CartModel.findOneAndDelete({
      _id: cartItem,
      user: userId,
    });

    if (!product) {
      return res.status(400).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete product",
    });
  }
};

export const cleanCart = async (req, res) => {
  try {
    const user = req.userId;
    const cartProducts = await CartModel.deleteMany({ user: user });
    if (!cartProducts) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }
    return res.status(200).json({
      message: "Cart cleaned successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to clean cart",
    });
  }
};
