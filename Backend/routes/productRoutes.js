const express = require('express');
const router = express.Router();
const { createProduct, getProducts, getProductById } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, admin, createProduct) // Sirf admin add kar sakta hai
  .get(getProducts);                   // Sabhi dekh sakte hain

router.route('/:id')
  .get(getProductById);

module.exports = router;