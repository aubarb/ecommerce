const express = require('express');
const cartItemsRouter = express.Router();
const cartItemsController = require('../controllers/cartItemsController.js');

cartItemsRouter.post('/:user_id', cartItemsController.addToCart);
cartItemsRouter.get('/:user_id', cartItemsController.getCartItems);

module.exports = cartItemsRouter;