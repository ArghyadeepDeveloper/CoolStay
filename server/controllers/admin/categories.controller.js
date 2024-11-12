const CategoryModel = require("../../models/categories.model.js"); // adjust path if necessary

async function createCategory(req, res) {
  try {
    console.log(req.user);
    // Extracting `name` and `subCategories` from the request body
    const { name, subCategories } = req.body;

    if(!name || !subCategories){
        return res.status(400).json({message:"please insert all data!"})
    }
    // Transforming subCategories array to match schema structure
    const subcategoryObjects = subCategories.map((subcatName) => (
        {
      name: subcatName,
    }
));
    //[{_id: asdasd, name:"hal-seeve"}, {_id: iuohiu, name:"full-sleeve"}, {name:"sewater"}]

    // Creating a new category with subcategories
    const newCategory = new CategoryModel({
      name,
      subcategories: subcategoryObjects,
    });

    // Saving the new category to the database
    const savedCategory = await newCategory.save();

    // Sending a success response
    res.status(201).json({
      message: "Category created successfully",
      data: savedCategory,
    });
  } catch (error) {
    // Sending an error response
    res.status(500).json({
      message: "Failed to create category",
      error: error.message,
    });
  }
}

async function getAllCategories(req, res) {
  try {
    const allCategories = await CategoryModel.find();
    res.status(200).json({
      message: "Categories retrieved successfully",
      data: allCategories,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve categories",
      error: error.message,
    });
  }
}

async function deleteCategoryById(req, res) {
  try {
    const { id } = req.params;
    console.log(req.params)
    console.log(id)
    const deletedCategory = await CategoryModel.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete category",
      error: error.message,
    });
  }
}

async function addSubCategory(req, res) {
  try {
    const { subcategories } = req.body;
    const subCategoryId = req.params.categoryId;

    console.log(subcategories,subCategoryId)
    // Check if both categoryId and subcategories are provided
    if (!subCategoryId || !subcategories) {
      return res.status(400).json({ message: "Category ID and subcategory name are required." });
    }

    // const category = await CategoryModel.findById(subCategoryId);
    // if (!category) {
    //   return res.status(404).json({ message: "Category not found." });
    // }

    // // Check if subcategory already exists
    // const subcategoryExists = category.subcategories.some(
    //   (subcat) => subcat.name === subcategories
    // );

    // if (subcategoryExists) {
    //   return res.status(400).json({ message: "Subcategory name already exists." });
    // }

    // // Add new subcategory if it doesn't exist
    // category.subcategories.push({ name: subcategories });
    // const updatedCategory = await category.save();

    const updatedCategory = await CategoryModel.findOneAndUpdate(
      { _id: subCategoryId, "subcategories.name": { $ne: subcategories } }, // Ensure subcategory doesn't exist
      { $push: { subcategories: { name: subcategories } } }, // Add subcategory
      { new: true } // Return the updated category
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Duplicate subcategory entry." });
    }

    res.status(200).json({
      message: "Subcategory added successfully",
      data: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add subcategory",
      error: error.message,
    });
  }
}

module.exports = { createCategory, getAllCategories, deleteCategoryById, addSubCategory};
