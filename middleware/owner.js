const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Middleware to check if user is owner
const requireOwner = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Access denied. No token provided.'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Find user and check role
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'User not found'
      });
    }

    // Check if user is owner
    if (user.role !== 'owner') {
      return res.status(403).json({
        success: false,
        error: 'Access denied. Owner privileges required.'
      });
    }

    // Attach user to request object
    req.user = {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      role: user.role || 'user',
      createdAt: user.created_at
    };

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Token expired. Please login again.'
      });
    }
    return res.status(403).json({
      success: false,
      error: 'Invalid token or access denied.'
    });
  }
};

module.exports = { requireOwner };

