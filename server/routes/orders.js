const express = require('express');
const ordersRouter = express.Router();
const ordersController = require('../controllers/ordersController.js');

ordersRouter.get('/', ordersController.getAllOrders);
ordersRouter.get('/:id', ordersController.getOrderById);
ordersRouter.post('/', ordersController.createOrder);
ordersRouter.put('/:id', ordersController.updateOrder);
ordersRouter.delete('/:id', ordersController.deleteOrder);

module.exports = ordersRouter;