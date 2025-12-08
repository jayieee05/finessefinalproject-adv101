const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category, id } = req.query;

    // Return single product by ID
    if (id) {
      const product = await Product.findById(parseInt(id));
      if (!product) {
        return res.status(404).json({
          success: false,
          error: 'Product not found'
        });
      }
      return res.json(product);
    }

    // Return products by category
    if (category) {
      const products = await Product.findByCategory(category.toLowerCase());
      return res.json(products);
    }

    // Return all products
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while fetching products'
    });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(parseInt(req.params.id));
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while fetching the product'
    });
  }
});

module.exports = router;

