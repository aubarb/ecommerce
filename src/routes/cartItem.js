const express = require('express');
const cartItemRouter = express.Router();
const cartItemController = require('../controllers/cartItem.js');

cartItemRouter.get('/', cartItemController.getAllCartItems);
cartItemRouter.get('/:id', cartItemController.getCartItemById);
cartItemRouter.post('/', cartItemController.createCartItem);
cartItemRouter.put('/:id', cartItemController.updateCartItem);
cartItemRouter.delete('/:id', cartItemController.deleteCartItem);

module.exports = cartItemRouter;