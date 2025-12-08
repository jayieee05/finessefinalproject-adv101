const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { authenticateToken } = require('../middleware/auth');

// Create a new order
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { shippingInfo, paymentInfo, items, totalAmount } = req.body;

    // Validation
    if (!shippingInfo || !paymentInfo || !items || !totalAmount) {
      return res.status(400).json({
        success: false,
        error: 'Missing required order information'
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Order must contain at least one item'
      });
    }

    // Validate user ID
    const userId = parseInt(req.user.id);
    if (!userId || isNaN(userId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid user ID'
      });
    }

    // Log incoming data for debugging
    console.log('Creating order for user:', req.user.id);
    console.log('Order data:', {
      userId: parseInt(req.user.id),
      totalAmount: parseFloat(totalAmount),
      itemsCount: items.length,
      shippingInfo: {
        fullName: shippingInfo.fullName,
        email: shippingInfo.email,
        city: shippingInfo.city
      }
    });

    // Create order
    const order = await Order.create({
      userId: userId,
      totalAmount: parseFloat(totalAmount),
      shippingInfo,
      paymentInfo,
      items
    });

    console.log('Order created successfully:', order.order_number || order.id);

    res.status(201).json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Order creation error:', error);
    console.error('Error details:', error.message);
    console.error('Error code:', error.code);
    console.error('Stack trace:', error.stack);
    
    // Provide more helpful error messages
    let errorMessage = 'An error occurred while creating the order';
    if (error.code === 'ER_NO_SUCH_TABLE') {
      errorMessage = 'Database tables not found. Please run: npm run db:init';
    } else if (error.code === 'ER_BAD_FIELD_ERROR') {
      errorMessage = 'Database schema mismatch. Please check your database.';
    } else if (error.message) {
      errorMessage = error.message;
    }

    res.status(500).json({
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Get all orders for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.findByUserId(parseInt(req.user.id));
    res.json({
      success: true,
      orders
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while fetching orders'
    });
  }
});

// Get a specific order by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findById(parseInt(req.params.id));

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    // Verify the order belongs to the user
    if (order.user_id !== parseInt(req.user.id)) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while fetching the order'
    });
  }
});

// Get order by order number
router.get('/number/:orderNumber', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findByOrderNumber(req.params.orderNumber);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    // Verify the order belongs to the user
    if (order.user_id !== parseInt(req.user.id)) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while fetching the order'
    });
  }
});

module.exports = router;

