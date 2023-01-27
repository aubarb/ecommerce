const express = require('express');
const orderItemRouter = express.Router();
const orderItemController = require('../controllers/orderItem.js');

orderItemRouter.get('/', orderItemController.getAllOrderItems);
orderItemRouter.get('/:id', orderItemController.getOrderItemById);
orderItemRouter.post('/', orderItemController.createOrderItem);
orderItemRouter.put('/:id', orderItemController.updateOrderItem);
orderItemRouter.delete('/:id', orderItemController.deleteOrderItem);

module.exports = orderItemRouter;