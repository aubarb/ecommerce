const CartItemsModel = require("../models/cartItemsModel");

const CartItemsController = {
  addToCart: async (req, res) => {
    const { product_id, quantity } = req.body;
    const { user_id } = req.params;
    if (!product_id || !quantity)
      return res.status(400).json("Product ID and quantity are required");
    try {
      const result = await CartItemsModel.addToCart(
        user_id,
        product_id,
        quantity
      );
      if (result) {
        res.status(200).json("Product added to cart successfully");
      } else {
        res.status(500).json("Error adding cart item");
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json("Server Error");
    }
  },

  getAll: async (req, res) => {
    try {
      const { user_id } = req.params;
      if (!user_id) return res.status(400).json("Missing user ID");
      const cartItems = await CartItemsModel.getAll(user_id);
      if (cartItems) {
        res.status(200).json(cartItems);
      } else {
        res.status(500).json("Error getting cart items");
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json("Server Error");
    }
  },
};

module.exports = CartItemsController;
