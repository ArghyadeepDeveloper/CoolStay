const mongoose = require('mongoose');



const BrandsSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    logoUrl: {
      type: String, // Store logo image URL if needed
      default: null,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
        required: true,
      },
  }, {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  });

const BrandsModel = mongoose.model('Brands', BrandsSchema);

module.exports = BrandsModel;
