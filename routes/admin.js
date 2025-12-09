const express = require('express');
const router = express.Router();
const { requireOwner } = require('../middleware/owner');
const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const pool = require('../config/database');

// Get dashboard statistics
router.get('/dashboard/stats', requireOwner, async (req, res) => {
  try {
    // Get total users
    const [userCount] = await pool.execute('SELECT COUNT(*) as count FROM users WHERE role = "user"');
    
    // Get total orders
    const [orderCount] = await pool.execute('SELECT COUNT(*) as count FROM orders');
    
    // Get total revenue
    const [revenue] = await pool.execute('SELECT SUM(total_amount) as total FROM orders WHERE payment_status = "paid"');
    
    // Get total products
    const [productCount] = await pool.execute('SELECT COUNT(*) as count FROM products WHERE is_active = TRUE');
    
    // Get recent orders (last 5)
    const [recentOrdersData] = await pool.execute(
      'SELECT o.*, u.name as user_name, u.email as user_email FROM orders o LEFT JOIN users u ON o.user_id = u.id ORDER BY o.created_at DESC LIMIT 5'
    );

    res.json({
      success: true,
      stats: {
        totalUsers: userCount[0].count,
        totalOrders: orderCount[0].count,
        totalRevenue: parseFloat(revenue[0].total || 0),
        totalProducts: productCount[0].count,
        recentOrders: recentOrdersData
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while fetching dashboard statistics'
    });
  }
});

// Get all users (admin view)
router.get('/users', requireOwner, async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({
      success: true,
      users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while fetching users'
    });
  }
});

// Delete an order - MUST be defined before GET /orders to avoid route conflicts
router.delete('/orders/:id', requireOwner, async (req, res) => {
  try {
    console.log('DELETE /admin/orders/:id - Request received');
    console.log('Request params:', req.params);
    console.log('Request method:', req.method);
    console.log('Request URL:', req.url);
    
    const orderId = parseInt(req.params.id);
    
    console.log('Delete order request - ID:', orderId, 'Type:', typeof orderId);
    
    if (isNaN(orderId) || orderId <= 0) {
      console.error('Invalid order ID:', req.params.id);
      return res.status(400).json({
        success: false,
        error: 'Invalid order ID'
      });
    }

    // Check if order exists before deleting
    const existingOrder = await Order.findById(orderId);
    if (!existingOrder) {
      console.error('Order not found:', orderId);
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    console.log('Order found, proceeding with deletion...');
    await Order.delete(orderId);
    
    console.log('Order deleted successfully:', orderId);
    res.json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting order:', error);
    console.error('Error stack:', error.stack);
    const statusCode = error.message.includes('not found') ? 404 : 500;
    res.status(statusCode).json({
      success: false,
      error: error.message || 'An error occurred while deleting the order'
    });
  }
});

// Update order status
router.put('/orders/:id/status', requireOwner, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.updateStatus(parseInt(req.params.id), status);
    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while updating order status'
    });
  }
});

// Get all orders (admin view) - Defined after DELETE to avoid route conflicts
router.get('/orders', requireOwner, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    
    let query = `
      SELECT o.*, u.name as user_name, u.email as user_email 
      FROM orders o 
      LEFT JOIN users u ON o.user_id = u.id
    `;
    const params = [];
    
    if (status) {
      query += ' WHERE o.status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY o.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const [orders] = await pool.execute(query, params);
    
    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM orders';
    const countParams = [];
    if (status) {
      countQuery += ' WHERE status = ?';
      countParams.push(status);
    }
    const [countResult] = await pool.execute(countQuery, countParams);
    
    res.json({
      success: true,
      orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: countResult[0].total,
        pages: Math.ceil(countResult[0].total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while fetching orders'
    });
  }
});

// Update order status
router.put('/orders/:id/status', requireOwner, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.updateStatus(parseInt(req.params.id), status);
    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while updating order status'
    });
  }
});

// Get all orders (admin view) - Defined after DELETE to avoid route conflicts
router.get('/orders', requireOwner, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    
    let query = `
      SELECT o.*, u.name as user_name, u.email as user_email 
      FROM orders o 
      LEFT JOIN users u ON o.user_id = u.id
    `;
    const params = [];
    
    if (status) {
      query += ' WHERE o.status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY o.created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);
    
    const [orders] = await pool.execute(query, params);
    
    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM orders';
    const countParams = [];
    if (status) {
      countQuery += ' WHERE status = ?';
      countParams.push(status);
    }
    const [countResult] = await pool.execute(countQuery, countParams);
    
    res.json({
      success: true,
      orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: countResult[0].total,
        pages: Math.ceil(countResult[0].total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while fetching orders'
    });
  }
});

// Update user role
router.put('/users/:id/role', requireOwner, async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'owner'].includes(role)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid role'
      });
    }
    const user = await User.updateRole(parseInt(req.params.id), role);
    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while updating user role'
    });
  }
});

module.exports = router;
