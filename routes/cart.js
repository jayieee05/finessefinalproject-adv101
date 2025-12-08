const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const { authenticateToken } = require('../middleware/auth');

// Get user's cart
router.get('/', authenticateToken, async (req, res) => {
  try {
    const cartItems = await Cart.getCartItems(parseInt(req.user.id));
    res.json({
      success: true,
      items: cartItems
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while fetching cart'
    });
  }
});

// Add item to cart
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { productId, quantity = 1, size = null, material = 'Gold' } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        error: 'Product ID is required'
      });
    }

    await Cart.addItem(parseInt(req.user.id), {
      productId: parseInt(productId),
      quantity: parseInt(quantity),
      size,
      material
    });

    const cartItems = await Cart.getCartItems(parseInt(req.user.id));
    res.json({
      success: true,
      items: cartItems
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while adding item to cart'
    });
  }
});

// Update cart item quantity
router.put('/update', authenticateToken, async (req, res) => {
  try {
    const { productId, quantity, size = null, material = 'Gold' } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Product ID and quantity are required'
      });
    }

    await Cart.updateQuantity(
      parseInt(req.user.id),
      parseInt(productId),
      parseInt(quantity),
      size,
      material
    );

    const cartItems = await Cart.getCartItems(parseInt(req.user.id));
    res.json({
      success: true,
      items: cartItems
    });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while updating cart'
    });
  }
});

// Remove item from cart
router.delete('/remove', authenticateToken, async (req, res) => {
  try {
    const { productId, size = null, material = 'Gold' } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        error: 'Product ID is required'
      });
    }

    await Cart.removeItem(
      parseInt(req.user.id),
      parseInt(productId),
      size,
      material
    );

    const cartItems = await Cart.getCartItems(parseInt(req.user.id));
    res.json({
      success: true,
      items: cartItems
    });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while removing item from cart'
    });
  }
});

// Clear cart
router.delete('/clear', authenticateToken, async (req, res) => {
  try {
    await Cart.clearCart(parseInt(req.user.id));
    res.json({
      success: true,
      items: []
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while clearing cart'
    });
  }
});

module.exports = router;

