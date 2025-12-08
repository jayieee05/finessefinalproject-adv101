const pool = require('../config/database');

class Cart {
  // Get cart items for a user
  static async getCartItems(userId) {
    const query = `
      SELECT 
        ci.id,
        ci.user_id,
        ci.product_id,
        ci.quantity,
        ci.size,
        ci.material,
        p.name,
        p.image,
        p.price,
        p.price_value,
        p.category
      FROM cart_items ci
      INNER JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ? AND p.is_active = TRUE
      ORDER BY ci.created_at DESC
    `;
    const [rows] = await pool.execute(query, [userId]);
    return rows.map(item => ({
      id: item.product_id,
      productId: item.product_id,
      name: item.name,
      image: item.image,
      price: item.price,
      priceValue: parseFloat(item.price_value),
      quantity: item.quantity,
      size: item.size,
      material: item.material,
      category: item.category
    }));
  }

  // Add item to cart
  static async addItem(userId, itemData) {
    const { productId, quantity = 1, size = null, material = 'Gold' } = itemData;

    // Check if item already exists
    const existingQuery = `
      SELECT id, quantity FROM cart_items 
      WHERE user_id = ? AND product_id = ? AND size = ? AND material = ?
    `;
    const [existing] = await pool.execute(existingQuery, [userId, productId, size, material]);

    if (existing.length > 0) {
      // Update quantity
      const newQuantity = existing[0].quantity + quantity;
      const updateQuery = `
        UPDATE cart_items 
        SET quantity = ?, updated_at = NOW()
        WHERE id = ?
      `;
      await pool.execute(updateQuery, [newQuantity, existing[0].id]);
      return existing[0].id;
    } else {
      // Insert new item
      const insertQuery = `
        INSERT INTO cart_items (user_id, product_id, quantity, size, material)
        VALUES (?, ?, ?, ?, ?)
      `;
      const [result] = await pool.execute(insertQuery, [userId, productId, quantity, size, material]);
      return result.insertId;
    }
  }

  // Update cart item quantity
  static async updateQuantity(userId, itemId, quantity, size = null, material = 'Gold') {
    if (quantity <= 0) {
      return await this.removeItem(userId, itemId, size, material);
    }

    const query = `
      UPDATE cart_items 
      SET quantity = ?, updated_at = NOW()
      WHERE user_id = ? AND product_id = ? AND size = ? AND material = ?
    `;
    await pool.execute(query, [quantity, userId, itemId, size, material]);
    return true;
  }

  // Remove item from cart
  static async removeItem(userId, itemId, size = null, material = 'Gold') {
    const query = `
      DELETE FROM cart_items 
      WHERE user_id = ? AND product_id = ? AND size = ? AND material = ?
    `;
    await pool.execute(query, [userId, itemId, size, material]);
    return true;
  }

  // Clear cart for user
  static async clearCart(userId) {
    const query = 'DELETE FROM cart_items WHERE user_id = ?';
    await pool.execute(query, [userId]);
    return true;
  }
}

module.exports = Cart;

