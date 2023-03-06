const pool = require("../config/db.js");

const OrdersModel = {

  create: async (user_id, total, payment_id) => {
    try {
      const result = await pool.query(
        "INSERT INTO orders (user_id, total, payment_id) VALUES ($1, $2, $3) RETURNING id",
        [user_id, total, payment_id]
      );
      return result.rows[0].id;
    } catch (error) {
      console.error(error.message);
    }
  },
  
  getAll: async (user_id) => {
    try {
      const result = await pool.query("SELECT * FROM orders WHERE user_id = $1", [
        user_id,
      ]);
      return result.rows;
    } catch (error) {
      console.error(error.message);
    }
  },
  
  getById: async (id) => {
    try {
      const result = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
      return result.rows[0];
    } catch (error) {
      console.error(error.message);
    }
  },
}

module.exports = OrdersModel


