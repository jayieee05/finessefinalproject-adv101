const pool = require('../config/database');

class Order {
  // Generate unique order number
  static generateOrderNumber() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}-${random}`;
  }

  // Create a new order
  static async create(orderData) {
    const {
      userId,
      totalAmount,
      shippingInfo,
      paymentInfo,
      items
    } = orderData;

    const orderNumber = this.generateOrderNumber();
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      // Insert order
      const orderQuery = `
        INSERT INTO orders (
          user_id, order_number, total_amount,
          shipping_full_name, shipping_email, shipping_phone,
          shipping_address, shipping_city, shipping_postal_code, shipping_country,
          payment_method, payment_gcash_number, payment_gcash_name
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      // Validate required fields
      if (!userId || isNaN(userId)) {
        throw new Error('Invalid user ID');
      }

      if (!shippingInfo || !shippingInfo.fullName || !shippingInfo.email || !shippingInfo.address || !shippingInfo.city) {
        throw new Error('Missing required shipping information');
      }

      if (!items || !Array.isArray(items) || items.length === 0) {
        throw new Error('Order must contain at least one item');
      }

      const parsedTotal = parseFloat(totalAmount);
      if (!parsedTotal || parsedTotal <= 0) {
        throw new Error('Invalid order total amount');
      }

      const [orderResult] = await connection.execute(orderQuery, [
        userId,
        orderNumber,
        parsedTotal,
        shippingInfo.fullName,
        shippingInfo.email,
        shippingInfo.phone || null,
        shippingInfo.address,
        shippingInfo.city,
        shippingInfo.postalCode || null,
        shippingInfo.country || 'Philippines',
        paymentInfo.paymentMethod || 'gcash',
        paymentInfo.gcashNumber || null,
        paymentInfo.gcashName || null
      ]);

      const orderId = orderResult.insertId;

      // Insert order items
      const itemQuery = `
        INSERT INTO order_items (
          order_id, product_id, product_name, product_image,
          quantity, price, size, material
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      for (const item of items) {
        // Ensure price is a number, not a string
        let itemPrice = item.priceValue;
        if (!itemPrice && item.price) {
          // If priceValue doesn't exist, try to extract from price string
          if (typeof item.price === 'string') {
            // Remove currency symbols and commas, then parse
            itemPrice = parseFloat(item.price.replace(/[₱,]/g, '')) || 0;
          } else {
            itemPrice = parseFloat(item.price) || 0;
          }
        }
        
        if (!itemPrice || itemPrice <= 0) {
          throw new Error(`Invalid price for item: ${item.name || item.id}`);
        }

        await connection.execute(itemQuery, [
          orderId,
          item.productId || item.id,
          item.name || 'Unknown Product',
          item.image || '',
          item.quantity || 1,
          itemPrice,
          item.size || null,
          item.material || 'Gold'
        ]);
      }

      await connection.commit();

      // Get the created order (don't fail if this fails, order is already created)
      try {
        const createdOrder = await this.findById(orderId);
        return createdOrder;
      } catch (findError) {
        console.error('Error fetching created order, but order was created:', findError);
        // Return basic order info if findById fails
        return {
          id: orderId,
          order_number: orderNumber,
          user_id: userId,
          total_amount: totalAmount,
          status: 'pending',
          payment_status: 'pending',
          items: items.map(item => ({
            productId: item.productId || item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.priceValue || item.price
          }))
        };
      }
    } catch (error) {
      await connection.rollback();
      console.error('Order creation transaction error:', error);
      console.error('Error message:', error.message);
      console.error('Error code:', error.code);
      throw error;
    } finally {
      connection.release();
    }
  }

  // Find order by ID
  static async findById(id) {
    try {
      // First get the order
      const orderQuery = 'SELECT * FROM orders WHERE id = ?';
      const [orderRows] = await pool.execute(orderQuery, [id]);
      
      if (!orderRows[0]) {
        return null;
      }

      // Then get order items
      const itemsQuery = `
        SELECT 
          id,
          product_id as productId,
          product_name as productName,
          product_image as productImage,
          quantity,
          price,
          size,
          material
        FROM order_items
        WHERE order_id = ?
      `;
      const [itemRows] = await pool.execute(itemsQuery, [id]);

      // Combine order and items
      const order = {
        ...orderRows[0],
        items: itemRows || []
      };

      return this.formatOrder(order);
    } catch (error) {
      console.error('Error in findById:', error);
      throw error;
    }
  }

  // Find order by order number
  static async findByOrderNumber(orderNumber) {
    try {
      // First get the order
      const orderQuery = 'SELECT * FROM orders WHERE order_number = ?';
      const [orderRows] = await pool.execute(orderQuery, [orderNumber]);
      
      if (!orderRows[0]) {
        return null;
      }

      // Then get order items
      const itemsQuery = `
        SELECT 
          id,
          product_id as productId,
          product_name as productName,
          product_image as productImage,
          quantity,
          price,
          size,
          material
        FROM order_items
        WHERE order_id = ?
      `;
      const [itemRows] = await pool.execute(itemsQuery, [orderRows[0].id]);

      // Combine order and items
      const order = {
        ...orderRows[0],
        items: itemRows || []
      };

      return this.formatOrder(order);
    } catch (error) {
      console.error('Error in findByOrderNumber:', error);
      throw error;
    }
  }

  // Find orders by user ID
  static async findByUserId(userId) {
    try {
      // Get all orders for user
      const ordersQuery = 'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC';
      const [orderRows] = await pool.execute(ordersQuery, [userId]);

      if (orderRows.length === 0) {
        return [];
      }

      // Get all order IDs
      const orderIds = orderRows.map(o => o.id);

      // Get all order items for these orders
      const placeholders = orderIds.map(() => '?').join(',');
      const itemsQuery = `
        SELECT 
          order_id,
          id,
          product_id as productId,
          product_name as productName,
          product_image as productImage,
          quantity,
          price,
          size,
          material
        FROM order_items
        WHERE order_id IN (${placeholders})
      `;
      const [itemRows] = await pool.execute(itemsQuery, orderIds);

      // Group items by order_id
      const itemsByOrder = {};
      itemRows.forEach(item => {
        if (!itemsByOrder[item.order_id]) {
          itemsByOrder[item.order_id] = [];
        }
        itemsByOrder[item.order_id].push({
          id: item.id,
          productId: item.productId,
          productName: item.productName,
          productImage: item.productImage,
          quantity: item.quantity,
          price: item.price,
          size: item.size,
          material: item.material
        });
      });

      // Combine orders with their items
      return orderRows.map(order => {
        const orderWithItems = {
          ...order,
          items: itemsByOrder[order.id] || []
        };
        return this.formatOrder(orderWithItems);
      });
    } catch (error) {
      console.error('Error in findByUserId:', error);
      throw error;
    }
  }

  // Update order status
  static async updateStatus(id, status) {
    const query = 'UPDATE orders SET status = ? WHERE id = ?';
    await pool.execute(query, [status, id]);
    return await this.findById(id);
  }

  // Update payment status
  static async updatePaymentStatus(id, paymentStatus) {
    const query = 'UPDATE orders SET payment_status = ? WHERE id = ?';
    await pool.execute(query, [paymentStatus, id]);
    return await this.findById(id);
  }

  // Format order data (parse JSON items)
  static formatOrder(order) {
    try {
      let items = [];
      if (order.items) {
        // If items is already an array, use it; otherwise parse JSON
        if (Array.isArray(order.items)) {
          items = order.items;
        } else if (typeof order.items === 'string') {
          items = JSON.parse(order.items);
        }
      }
      
      return {
        ...order,
        items: items
      };
    } catch (error) {
      console.error('Error formatting order:', error);
      return {
        ...order,
        items: []
      };
    }
  }
}

module.exports = Order;
