const express = require('express');
const router = express.Router();
const { createCategory, getCategories } = require('../controllers/categoryController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, admin, createCategory) // Sirf admin add kar sakta hai
  .get(getCategories);                  // Sabhi dekh sakte hain

module.exports = router;