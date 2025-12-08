const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

async function initializeDatabase() {
  let connection;

  try {
    console.log('🔧 Initializing database...');

    // Connect to MySQL server (without database)
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });

    console.log('✅ Connected to MySQL server');

    // Read and execute schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Split by semicolons and execute each statement
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (const statement of statements) {
      if (statement) {
        await connection.query(statement);
      }
    }

    console.log('✅ Database schema created successfully');
    console.log('✅ Tables created: users, products, orders, order_items, cart_items');

  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run initialization if called directly
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log('\n🎉 Database initialization complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Database initialization failed:', error);
      process.exit(1);
    });
}

module.exports = { initializeDatabase };


