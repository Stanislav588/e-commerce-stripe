import express from "express";
import { mongoDB } from "./mongodb.js";
import UserModel from "./models/UserModel.js";
import multer from "multer";
import path from "path";

import {
  productValidation,
  registerValidation,
} from "./validations/validations.js";
import dotenv from "dotenv";
import cors from "cors";

import { logOut, login, register } from "./controllers/auth.js";
import {
  createProduct,
  getAllProducts,
  getProductByGender,
  getProductById,
} from "./controllers/product.js";
import cookieParser from "cookie-parser";
import {
  addProduct,
  cleanCart,
  deleteProduct,
  getCartProduct,
} from "./controllers/cart.js";
import { authCheck } from "./utils/authCheck.js";
import {
  addProductToWishList,
  deleteFromWishList,
  getProductsFromWishList,
} from "./controllers/wishlist.js";

import { createCheckOutSession } from "./controllers/stripe.js";
const app = express();
dotenv.config();
app.use(cookieParser());
mongoDB;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4500",
    credentials: true,
  })
);
const PORT = process.env.PORT || 3000;

app.use("/uploads", express.static("uploads"));

app.get("/auth/me", async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(403).json({
        message: "User not found",
      });
    }

    res.json({
      user,
    });
  } catch (error) {
    res.status(403).json({
      message: error.message,
    });
  }
});
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

app.get("/products/:_id", getProductById);
const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "Failed to download an image" });
    }

    res.json({
      message: "File downloaded",
      image_url: `http://localhost:${PORT}/uploads/${req.file.filename}`,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});
app.post("/product/add", productValidation, createProduct);
app.post("/auth/register", registerValidation, register);
app.post("/auth/login", login);

app.post("/cart/add", authCheck, addProduct);
app.get("/cart", authCheck, getCartProduct);
app.get("/logout", authCheck, logOut);
app.post("/create-session", authCheck, createCheckOutSession);
app.post("/wishlist/add", authCheck, addProductToWishList);
app.delete("/wishlist/remove/:id", authCheck, deleteFromWishList);
app.get("/wishlist", authCheck, getProductsFromWishList);
app.delete("/products/remove/:id", authCheck, deleteProduct);
app.delete("/cart/clean", authCheck, cleanCart);
app.get("/products", getProductByGender);
app.get("/all", getAllProducts);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
