const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number }, 
images: [{ type: String, required: true }], 
  brand: { type: String, default: 'CY Products' },
  
  // Men, Women, Kids filter ke liye
  gender: { 
    type: String, 
    required: true, 
    enum: ['Men', 'Women', 'Kids', 'Unisex'] 
  },
  
  // Category wise filter ke liye
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  },
  
  sizes: [{ type: String }], 
  stock: { type: Number, required: true, default: 0 },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);