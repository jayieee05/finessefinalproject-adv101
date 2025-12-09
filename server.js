const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const adminRoutes = require('./routes/admin');
const { authenticateToken } = require('./middleware/auth');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/admin', adminRoutes);

// Debug: Log all admin routes
console.log('Admin routes registered:');
console.log('  DELETE /api/admin/orders/:id');
console.log('  PUT /api/admin/orders/:id/status');
console.log('  GET /api/admin/orders');

// Protected route example - verify token works
app.get('/api/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

