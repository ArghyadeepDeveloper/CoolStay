const mongoose = require('mongoose');

const SubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  subcategories: [SubcategorySchema]  // Embedding Subcategory schema as an array
});

const CategoryModel = mongoose.model('Category', CategorySchema);

module.exports = CategoryModel;
