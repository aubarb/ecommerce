const pool = require("../config/db.js");

const CartItemsModel = {
  addToCart: async (user_id, product_id, quantity) => {
    try {
      const inCart = await pool.query(
        "SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2",
        [user_id, product_id]
      );
      const existingItem = inCart.rows[0];
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        const result = await pool.query(
          "UPDATE cart_items SET quantity = $1 WHERE user_id = $2 AND product_id = $3 RETURNING *",
          [newQuantity, user_id, product_id]
        );
        return "Product quantity updated";
      } else {
        const result = await pool.query(
          "INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
          [user_id, product_id, quantity]
        );
        return "Product added to cart";
      }
    } catch (error) {
      console.error(error);
    }
  },

  getAll: async (user_id) => {
    try {
      const result = await pool.query(
        "SELECT * FROM cart_items WHERE user_id = $1",
        [user_id]
      );
      return result.rows;
    } catch (error) {
      console.error(error);
    }
  },

  deleteAll: async (user_id) => {
    try {
      const result = await pool.query(
        "DELETE FROM cart_items WHERE user_id = $1",
        [user_id]
      );
      return "Cart emptied";
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = CartItemsModel;
