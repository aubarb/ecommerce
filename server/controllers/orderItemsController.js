const pool = require("../config/db.js");
const OrderItemsModel = require("../models/orderItemsModel.js");

const OrderItemsController = {

  getAll: async (req, res) => {
    try {
      const result =await OrderItemsModel.getAll();
      return res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  
  getById: async (req, res) => {
    try {
      const {id} = req.params;
      const result =  await OrderItemsModel.getById(id);
      return res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  
  create: async (req, res) => {
    try {
      const { order_id, product_id, quantity } = req.body;
      const result = await OrderItemsModel.create(order_id, product_id, quantity)
      return res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};

module.exports = OrderItemsController;

