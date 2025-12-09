const pool = require('../config/database');

class User {
  // Create a new user
  static async create(userData) {
    const { name, email, password, role = 'user' } = userData;
    const query = `
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.execute(query, [name, email, password, role]);
    return result.insertId;
  }

  // Find user by email
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await pool.execute(query, [email]);
    return rows[0] || null;
  }

  // Find user by ID
  static async findById(id) {
    const query = 'SELECT id, name, email, role, created_at FROM users WHERE id = ?';
    const [rows] = await pool.execute(query, [id]);
    return rows[0] || null;
  }

  // Update user
  static async update(id, userData) {
    const { name, email } = userData;
    const query = `
      UPDATE users 
      SET name = ?, email = ?
      WHERE id = ?
    `;
    await pool.execute(query, [name, email, id]);
    return await this.findById(id);
  }

  // Delete user
  static async delete(id) {
    const query = 'DELETE FROM users WHERE id = ?';
    await pool.execute(query, [id]);
    return true;
  }

  // Get all users (for admin purposes)
  static async findAll() {
    const query = 'SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC';
    const [rows] = await pool.execute(query);
    return rows;
  }

  // Update user role
  static async updateRole(id, role) {
    const query = 'UPDATE users SET role = ? WHERE id = ?';
    await pool.execute(query, [role, id]);
    return await this.findById(id);
  }

  // Check if user is owner
  static isOwner(user) {
    return user && user.role === 'owner';
  }
}

module.exports = User;
