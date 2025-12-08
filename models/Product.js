const pool = require('../config/database');

class Product {
  // Create a new product
  static async create(productData) {
    const {
      name,
      image,
      price,
      priceValue,
      category,
      description,
      rating = 0,
      reviewCount = 0,
      material = 'Gold',
      tags = [],
      sizes = [],
      defaultSize,
      stock = 0
    } = productData;

    const query = `
      INSERT INTO products (
        name, image, price, price_value, category, description,
        rating, review_count, material, tags, sizes, default_size, stock
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(query, [
      name,
      image,
      price,
      priceValue,
      category,
      description,
      rating,
      reviewCount,
      material,
      JSON.stringify(tags),
      JSON.stringify(sizes),
      defaultSize,
      stock
    ]);

    return result.insertId;
  }

  // Find product by ID
  static async findById(id) {
    const query = 'SELECT * FROM products WHERE id = ? AND is_active = TRUE';
    const [rows] = await pool.execute(query, [id]);
    if (rows[0]) {
      return this.formatProduct(rows[0]);
    }
    return null;
  }

  // Find all products
  static async findAll() {
    const query = 'SELECT * FROM products WHERE is_active = TRUE ORDER BY id ASC';
    const [rows] = await pool.execute(query);
    return rows.map(product => this.formatProduct(product));
  }

  // Find products by category
  static async findByCategory(category) {
    const query = 'SELECT * FROM products WHERE category = ? AND is_active = TRUE ORDER BY id ASC';
    const [rows] = await pool.execute(query, [category]);
    return rows.map(product => this.formatProduct(product));
  }

  // Update product
  static async update(id, productData) {
    const {
      name,
      image,
      price,
      priceValue,
      category,
      description,
      rating,
      reviewCount,
      material,
      tags,
      sizes,
      defaultSize,
      stock,
      isActive
    } = productData;

    const updates = [];
    const values = [];

    if (name !== undefined) { updates.push('name = ?'); values.push(name); }
    if (image !== undefined) { updates.push('image = ?'); values.push(image); }
    if (price !== undefined) { updates.push('price = ?'); values.push(price); }
    if (priceValue !== undefined) { updates.push('price_value = ?'); values.push(priceValue); }
    if (category !== undefined) { updates.push('category = ?'); values.push(category); }
    if (description !== undefined) { updates.push('description = ?'); values.push(description); }
    if (rating !== undefined) { updates.push('rating = ?'); values.push(rating); }
    if (reviewCount !== undefined) { updates.push('review_count = ?'); values.push(reviewCount); }
    if (material !== undefined) { updates.push('material = ?'); values.push(material); }
    if (tags !== undefined) { updates.push('tags = ?'); values.push(JSON.stringify(tags)); }
    if (sizes !== undefined) { updates.push('sizes = ?'); values.push(JSON.stringify(sizes)); }
    if (defaultSize !== undefined) { updates.push('default_size = ?'); values.push(defaultSize); }
    if (stock !== undefined) { updates.push('stock = ?'); values.push(stock); }
    if (isActive !== undefined) { updates.push('is_active = ?'); values.push(isActive); }

    if (updates.length === 0) return await this.findById(id);

    values.push(id);
    const query = `UPDATE products SET ${updates.join(', ')} WHERE id = ?`;
    await pool.execute(query, values);

    return await this.findById(id);
  }

  // Delete product (soft delete)
  static async delete(id) {
    const query = 'UPDATE products SET is_active = FALSE WHERE id = ?';
    await pool.execute(query, [id]);
    return true;
  }

  // Format product data (parse JSON fields)
  static formatProduct(product) {
    return {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      priceValue: parseFloat(product.price_value),
      category: product.category,
      description: product.description,
      rating: parseFloat(product.rating) || 0,
      reviewCount: product.review_count || 0,
      material: product.material || 'Gold',
      tags: product.tags ? (typeof product.tags === 'string' ? JSON.parse(product.tags) : product.tags) : [],
      sizes: product.sizes ? (typeof product.sizes === 'string' ? JSON.parse(product.sizes) : product.sizes) : [],
      defaultSize: product.default_size,
      stock: product.stock || 0
    };
  }
}

module.exports = Product;
