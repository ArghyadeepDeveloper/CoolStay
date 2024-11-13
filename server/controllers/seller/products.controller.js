const ProductModel = require("../../models/products.models.js");
const mongoose = require('mongoose');

// Create a new product
async function createProduct(req, res) {
  try {
    const {
      name, description, price, stock, brand, category,
      status, sku, weight, tags: tagsArray
    } = req.body;

    // Validate that `brand` and `category` are valid ObjectIds
    if (!mongoose.Types.ObjectId.isValid(brand) || !mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ message: "Invalid brand or category ID." });
    }

    // Convert brand and category to ObjectId
    const brandId = new mongoose.Types.ObjectId(brand);
    const categoryId = new mongoose.Types.ObjectId(category);

    // Handle tags, if tags were sent as a single string, convert it to an array
    const tags = Array.isArray(tagsArray) ? tagsArray : [tagsArray];

    // Handle images
    const images = req.files.map(file => ({
      url: file.path,
      altText: file.originalname
    }));

    const dimensions = {
      length: req.body["dimensions[length]"],
      width: req.body["dimensions[width]"],
      height: req.body["dimensions[height]"]
    };
    // Create new product
    const newProduct = new ProductModel({
      name,
      description,
      price,
      stock,
      brand: brandId, // Using converted ObjectId
      category: categoryId,
      images,
      status,
      sku,
      weight,
      dimensions,
      tags
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ message: "Product created successfully", data: savedProduct });
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error: error.message });
  }
}

// Get all products
async function getAllProducts(req, res) {
  try {
    const products = await ProductModel.find().populate("brand category");
    res.status(200).json({ message: "Products fetched successfully", data: products });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
}

// Get product by ID
async function getProductById(req, res) {
  try {
    const product = await ProductModel.findById(req.params.id).populate("brand category");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ data: product });
  } catch (error) {
    res.status(500).json({ message: "Failed to get product", error: error.message });
  }
}

// Update product by ID
async function updateProductById(req, res) {
  try {
    const updates = req.body;
    const images = req.files?.map(file => ({
      url: file.path,
      altText: file.originalname
    }));

    if (images && images.length > 0) {
      updates.images = images;
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product updated successfully", data: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error: error.message });
  }
}

// Delete product by ID
async function deleteProductById(req, res) {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
