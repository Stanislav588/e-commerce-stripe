import jwt from "jsonwebtoken";

export const authCheck = (req, res, next) => {
  const token = req.cookies.access_token;

  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded._id;
      next();
    } else {
      return res.status(403).json({
        message: "No access",
      });
    }
  } catch (error) {
    res.status(403).json({
      message: error.message,
    });
  }
};
