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
module.exports = { createCategory, getAllCategories, deleteCategoryById};
