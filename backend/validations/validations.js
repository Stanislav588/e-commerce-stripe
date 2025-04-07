import { body } from "express-validator";
export const registerValidation = [
  body("fullName", "Name is required").isLength({ min: 3 }).isString(),
  body("email", "Email is required").isEmail().isString(),
  body("password", "Password must be at least 5 characters long")
    .isLength({ min: 5 })
    .isString(),
  body("avatar").optional().isString(),
];
export const productValidation = [
  body("brand")
    .notEmpty()
    .withMessage("Brand is required")
    .isString()
    .withMessage("Brand must be a string"),
  body("model")
    .notEmpty()
    .withMessage("Model is required")
    .isString()
    .withMessage("Model must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("description must be a string"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number"),
  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .withMessage("Category must be a string"),
  body("discount")
    .optional()
    .isNumeric()
    .withMessage("Discount must be a number"),
  body("img").isString().withMessage("Images must be a string"),
  body("optionalImg")
    .optional()
    .isString()
    .isArray()
    .withMessage("Optional images must be an array"),
  body("details")
    .notEmpty()
    .withMessage("Details are required")
    .isArray()
    .withMessage("Details must be an array"),
  body("material")
    .optional()
    .isArray()
    .withMessage("Material must be an array"),
  body("size").isNumeric().withMessage("Size must be a string or number"),
  body("color")
    .notEmpty()
    .withMessage("Color is required")
    .isArray()
    .withMessage("Color must be an array"),
  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isString()
    .withMessage("Gender must be a string"),
  body("reviews")
    .optional()
    .notEmpty()
    .isNumeric()
    .withMessage("Reviews must be a number"),
  body("rating")
    .optional()
    .isNumeric()
    .isLength({ min: 0, max: 5 })
    .withMessage("Rating must be a number"),
  body("stock").optional().isNumeric().withMessage("Stock must be a number"),
];
