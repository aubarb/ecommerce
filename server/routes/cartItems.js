const express = require('express');
const cartItemsRouter = express.Router();
const CartItemsController = require('../controllers/cartItemsController.js');

cartItemsRouter.post('/:user_id', CartItemsController.addToCart);
cartItemsRouter.get('/:user_id', CartItemsController.getAll);

module.exports = cartItemsRouter;