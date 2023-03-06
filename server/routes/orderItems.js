const express = require('express');
const orderItemsRouter = express.Router();
const OrderItemsController = require('../controllers/orderItemsController.js');

orderItemsRouter.get('/', OrderItemsController.getAll);
orderItemsRouter.get('/:id', OrderItemsController.getById);
orderItemsRouter.post('/', OrderItemsController.create);

module.exports = orderItemsRouter;