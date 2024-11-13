const express = require("express")

const {
    createBrands,
    getAllBrands,
    deleteBrandsById,
    updateBrands,
  } = require("../../controllers/admin/brands.controller.js");

  const verifyToken = require("../../middlewares/verifyToken.js");

  const checkRole = require("../../middlewares/checkRole.js");
const { singleFileUpload } = require("../../middlewares/uploadHelper.js");

  const brandRoutes = express.Router();

  brandRoutes.post("/brands", verifyToken, checkRole("0"), singleFileUpload, createBrands);
  brandRoutes.get("/brands", verifyToken, checkRole("0"),  getAllBrands);
  brandRoutes.post("/brands/:id", verifyToken, checkRole("0"), singleFileUpload, updateBrands);
  brandRoutes.get("/brands/:id", verifyToken, checkRole("0"),  deleteBrandsById);
  



  module.exports = brandRoutes;
