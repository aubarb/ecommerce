const express = require('express');
const orderItemsRouter = express.Router();
const orderItemsController = require('../controllers/orderItemsController.js');

orderItemsRouter.get('/', orderItemsController.getAllOrderItems);
orderItemsRouter.get('/:id', orderItemsController.getOrderItemById);
orderItemsRouter.post('/', orderItemsController.createOrderItem);
orderItemsRouter.put('/:id', orderItemsController.updateOrderItem);
orderItemsRouter.delete('/:id', orderItemsController.deleteOrderItem);

module.exports = orderItemsRouter;