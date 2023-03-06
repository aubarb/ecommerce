const OrdersModel = require("../models/ordersModel");

const OrdersController = {

  create: async (req, res) => {
    try {
      const { user_id, total, payment_id } = req.body
      const result = await OrdersModel.create(user_id, total, payment_id)
      if (result) {
        res.status(200).json("Order created");
      } else {
        res.status(500).json("Error creating order");
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  
  getAll: async (req, res) => {
    try {
      const {user_id} = req.body;
      const orders = await OrdersModel.getAll(user_id);
      if (orders) {
        res.status(200).json(orders);
      } else {
        res.status(500).json("Error getting orders");
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  
  getById: async (req, res) => {
    try {
      const {id} = req.params;
      const order = await OrdersModel.getById(id);
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(500).json("Error getting order");
      }
    } catch (error) {
      res.status(500).json(error.message); 
    }
  },
};

module.exports = OrdersController;
