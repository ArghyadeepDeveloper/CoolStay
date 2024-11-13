const BrandsModel = require('../../models/brands.model.js');

// Create a new brand
async function createBrands(req, res) {
  try {
    const { name, description, status = 'active' } = req.body;
    console.log(req.body)
    // Check if name is provided
    if (!name) {
      return res.status(400).json({ message: "Brand name is required." });
    }
    const  logoUrl  = req.file.filename; // `profilePicUrl` should be in the request body
    console.log(logoUrl)
    if (!logoUrl) {
      return res.status(400).json({ message: "Logo URL is required" });
    }
    // Create new brand
    const newBrand = new BrandsModel({
      name,
      description,
      logoUrl,
      status,
    });

    const savedBrand = await newBrand.save();

    res.status(201).json({
      message: "Brand created successfully",
      data: savedBrand,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create brand",
      error: error.message,
    });
  }
}

// Get all brands
async function getAllBrands(req, res) {
  try {
    const brands = await BrandsModel.find();
    res.status(200).json({
      message: "Brands retrieved successfully",
      data: brands,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve brands",
      error: error.message,
    });
  }
}

// Delete a brand by ID
async function deleteBrandsById(req, res) {
  try {
    const brandId = req.params.id;

    // Delete brand by ID
    const deletedBrand = await BrandsModel.findByIdAndDelete(brandId);

    if (!deletedBrand) {
      return res.status(404).json({ message: "Brand not found." });
    }

    res.status(200).json({
      message: "Brand deleted successfully",
      data: deletedBrand,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete brand",
      error: error.message,
    });
  }
}

async function updateBrands(req, res) {
    try {
        console.log(req.params)
      const { id } = req.params; // Brand ID from URL parameters
      const { name, description, status } = req.body; // Data to update from request body
      const logoUrl = req.file ? req.file.filename : undefined; // Check if a new logo was uploaded
  
      // Find the existing brand by ID
      const brand = await BrandsModel.findById(id);
      console.log(brand)
      if (!brand) {
        return res.status(404).json({ message: "Brand not found." });
      }
  
      // Check if the updated name is unique (only if name is being changed)
      if (name && name !== brand.name) {
        const existingBrandWithName = await BrandsModel.findOne({ name });
        if (existingBrandWithName) {
          return res.status(400).json({ message: "Brand name already exists. Please choose a unique name." });
        }
      }
  
      // Update fields if they are provided
      if (name) brand.name = name;
      if (description) brand.description = description;
      if (status) brand.status = status;
      if (logoUrl) brand.logoUrl = logoUrl;
  
      const updatedBrand = await brand.save();
  
      res.status(200).json({
        message: "Brand updated successfully",
        data: updatedBrand,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to update brand",
        error: error.message,
      });
    }
  }
  
  
module.exports = {
  createBrands,
  getAllBrands,
  deleteBrandsById,
  updateBrands
};
