const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// Create connection pool for better performance
// Note: Pool creation doesn't throw errors immediately, only when used
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'finesse_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  // Add connection timeout to prevent hanging
  connectTimeout: 10000
});

// Test database connection (non-blocking)
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('⚠️  Make sure MySQL is running and database credentials are correct in .env file');
    return false;
  }
}

// Initialize database connection on module load (non-blocking, won't crash app)
testConnection().catch(() => {
  // Silently handle connection errors on startup
  // The app can still run, but database operations will fail
});

module.exports = pool;
