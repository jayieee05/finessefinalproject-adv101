# Database Setup Guide

This guide will help you set up the MySQL database for the Finesse project.

## Prerequisites

- MySQL Server installed and running
- Node.js and npm installed

## Setup Steps

### 1. Configure Environment Variables

Copy the `.env.example` file to `.env` in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file and update the database credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=finesse_db
```

### 2. Initialize Database Schema

Run the initialization script to create the database and tables:

```bash
node database/init.js
```

This will:
- Create the `finesse_db` database (if it doesn't exist)
- Create all necessary tables:
  - `users` - User accounts
  - `products` - Product catalog
  - `orders` - Customer orders
  - `order_items` - Items in each order
  - `cart_items` - Persistent cart items (optional)

### 3. Seed Products (Optional)

If you want to populate the database with sample products:

```bash
node database/seed.js
```

This will add 20 sample products to your database.

## Database Schema

### Users Table
- `id` - Primary key (auto-increment)
- `name` - User's full name
- `email` - Unique email address
- `password` - Hashed password
- `created_at` - Account creation timestamp
- `updated_at` - Last update timestamp

### Products Table
- `id` - Primary key (auto-increment)
- `name` - Product name
- `image` - Product image path
- `price` - Formatted price string
- `price_value` - Numeric price value
- `category` - Product category (rings, bracelets, earrings, necklaces)
- `description` - Product description
- `rating` - Average rating
- `review_count` - Number of reviews
- `material` - Material type
- `tags` - JSON array of tags
- `sizes` - JSON array of available sizes
- `default_size` - Default size
- `stock` - Available stock quantity
- `is_active` - Whether product is active
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Orders Table
- `id` - Primary key (auto-increment)
- `user_id` - Foreign key to users table
- `order_number` - Unique order number
- `total_amount` - Total order amount
- `status` - Order status (pending, processing, shipped, delivered, cancelled)
- `shipping_*` - Shipping information fields
- `payment_*` - Payment information fields
- `payment_status` - Payment status (pending, paid, failed, refunded)
- `created_at` - Order creation timestamp
- `updated_at` - Last update timestamp

### Order Items Table
- `id` - Primary key (auto-increment)
- `order_id` - Foreign key to orders table
- `product_id` - Foreign key to products table
- `product_name` - Snapshot of product name at time of order
- `product_image` - Snapshot of product image at time of order
- `quantity` - Quantity ordered
- `price` - Price at time of order
- `size` - Selected size
- `material` - Selected material
- `created_at` - Creation timestamp

### Cart Items Table
- `id` - Primary key (auto-increment)
- `user_id` - Foreign key to users table
- `product_id` - Foreign key to products table
- `quantity` - Quantity in cart
- `size` - Selected size
- `material` - Selected material
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

## Manual Setup (Alternative)

If you prefer to set up the database manually:

1. Create the database:
```sql
CREATE DATABASE finesse_db;
```

2. Run the SQL schema file:
```bash
mysql -u root -p finesse_db < database/schema.sql
```

## Troubleshooting

### Connection Errors
- Ensure MySQL server is running
- Verify database credentials in `.env`
- Check that the database user has proper permissions

### Table Already Exists
- The initialization script will skip creating tables that already exist
- To start fresh, drop the database and re-run the init script

### Port Conflicts
- Default MySQL port is 3306
- If using a different port, add it to the connection string in `config/database.js`

## Models

The project includes the following database models:

- `models/User.js` - User operations
- `models/Product.js` - Product operations
- `models/Order.js` - Order operations

These models provide methods for CRUD operations and are used throughout the application.


