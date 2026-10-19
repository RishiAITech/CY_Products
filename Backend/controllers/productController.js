const Product = require('../models/Product');

const createProduct = async (req, res) => {
  try {
    const { name, description, price, images, gender, category, stock } = req.body;

    // Validation
    if (!name || !price || !images || !category) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      images, // Base64 string yahan aayegi
      gender,
      category,
      stock: Number(stock),
      sizes: ['6', '7', '8', '9', '10'], // Default sizes
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Product Create Error:", error);
    res.status(500).json({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    let filter = {};
    if (req.query.gender) filter.gender = req.query.gender;
    if (req.query.category) filter.category = req.query.category;
    const products = await Product.find(filter).populate('category', 'name');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name');
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createProduct, getProducts, getProductById };