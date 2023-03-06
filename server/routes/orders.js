const express = require('express');
const ordersRouter = express.Router();
const OrdersController = require('../controllers/ordersController');

ordersRouter.get('/', OrdersController.getAll);
ordersRouter.get('/:id', OrdersController.getById);
ordersRouter.post('/', OrdersController.create)

module.exports = ordersRouter;

