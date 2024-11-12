
const express = require("express")
const {
  createCategory,
  getAllCategories,
  deleteCategoryById,
  addSubCategory
} = require("../../controllers/admin/categories.controller.js");
const verifyToken = require("../../middlewares/verifyToken.js");
const checkRole = require("../../middlewares/checkRole.js");

const categoryRoutes = express.Router();

categoryRoutes.post("/category", verifyToken, checkRole("0"),  createCategory);
categoryRoutes.get("/category", verifyToken, checkRole("0"),  getAllCategories);
categoryRoutes.get("/category/:id", verifyToken, checkRole("0"),  deleteCategoryById);
categoryRoutes.post("/category/sub-categories/:categoryId", verifyToken, checkRole("0"),  addSubCategory);

module.exports = categoryRoutes;
