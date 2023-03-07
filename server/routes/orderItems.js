const express = require('express');
const orderItemsRouter = express.Router();
const OrderItemsController = require('../controllers/orderItemsController.js');

orderItemsRouter.get('/:order_id', OrderItemsController.getAll);
orderItemsRouter.post('/', OrderItemsController.create);

module.exports = orderItemsRouter;