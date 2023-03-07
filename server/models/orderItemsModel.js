const pool = require("../config/db.js");

const OrderItemsModel = {
  getAll: async (order_id) => {
    try {
      const result = await pool.query("SELECT * FROM order_items WHERE order_id = $1", [order_id]);
      return result.rows;
    } catch (error) {
      console.error(error.message);
    }
  },

  create: async (order_id, product_id, quantity) => {
    try {
      const result = await  pool.query(
        "INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
        [order_id, product_id, quantity]);
      return `Order item created`;
    } catch (error) {
      console.error(error.message);
    }
  },
};

module.exports = OrderItemsModel;
