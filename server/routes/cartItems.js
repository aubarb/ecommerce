const express = require('express');
const cartItemsRouter = express.Router();
const cartItemsController = require('../controllers/cartItemsController.js');

cartItemsRouter.post('/', cartItemsController.addToCart);
cartItemsRouter.get('/', cartItemsController.getCartItems);
cartItemsRouter.put('/', cartItemsController.updateCartItems);

module.exports = cartItemsRouter;