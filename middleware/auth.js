const jwt = require('jsonwebtoken');
const { users } = require('../data/users');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      error: 'Access denied. No token provided.' 
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Find user and attach to request
    const user = users.find(u => u.id === decoded.id);
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: 'User not found' 
      });
    }

    // Attach user to request object (without password)
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
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
      error: 'Invalid token' 
    });
  }
};

module.exports = { authenticateToken };

