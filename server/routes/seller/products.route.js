const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../../controllers/seller/products.controller.js");

const verifyToken = require("../../middlewares/verifyToken.js");
const checkRole = require("../../middlewares/checkRole.js");
const { multipleFileUpload } = require("../../middlewares/uploadHelper.js");

const productRoutes = express.Router();

// Routes for product management
productRoutes.post("/products", verifyToken, checkRole("0"), multipleFileUpload, createProduct); // Allow up to 5 images
productRoutes.get("/products", verifyToken, checkRole("0"), getAllProducts);
productRoutes.get("/products/:id", verifyToken, checkRole("0"), getProductById);
productRoutes.put("/products/:id", verifyToken, checkRole("0"), multipleFileUpload, updateProductById);
productRoutes.delete("/products/:id", verifyToken, checkRole("0"), deleteProductById);

module.exports = productRoutes;
