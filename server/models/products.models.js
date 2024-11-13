const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brands',
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  images: [
    {
      url: {
        type: String,
        required: true,
      },
      altText: {
        type: String,
        default: '',
      },
    },
  ],
  status: {
    type: String,
    enum: ['active', 'inactive', 'out of stock'],
    default: 'active',
  },
  sku: {
    type: String,
    unique: true,
    required: true,
  },
  weight: {
    type: Number,
    default: 0,
  },
  dimensions: {
    length: { type: Number, default: 0 },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
  },
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;
