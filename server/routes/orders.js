const express = require('express');
const ordersRouter = express.Router();
const OrdersController = require('../controllers/ordersController');

ordersRouter.get('/:user_id', OrdersController.getAll);
ordersRouter.get('/:id', OrdersController.getById);
ordersRouter.post('/', OrdersController.create)

module.exports = ordersRouter;

