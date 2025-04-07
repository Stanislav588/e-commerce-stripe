import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
export const register = async (req, res) => {
  const hash = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(hash, salt);
  try {
    const doc = new UserModel({
      fullName: req.body.fullName,
      email: req.body.email,
      password: passwordHash,
      avatar: req.body.avatar,
    });
    const user = await doc.save();
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15min",
      }
    );

    const { password, ...userData } = user._doc;
    return res.status(201).json({
      ...userData,
      token,
      message: "User created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to create user",
    });
  }
};
export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isValidPassword) {
      return res.status(400).json({
        message: "Wrong login or password",
      });
    }
    const accessToken = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
    const { password, ...userData } = user._doc;
    return res.status(201).json({
      ...userData,
      accessToken,
      message: "User logged in successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const logOut = async (req, res) => {
  try {
    res.clearCookie("access_token", {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.clearCookie("refresh_token", {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    return res.status(200).json({
      message: "Cookies cleared successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to log out",
      error: error.message,
    });
  }
};
