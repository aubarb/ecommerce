const express = require('express');
const cartItemRouter = express.Router();
const cartItemController = require('../controllers/cartItemsController.js');

cartItemRouter.post('/', cartItemController.addToCart);
cartItemRouter.get('/', cartItemController.getCart);
cartItemRouter.put('/', cartItemController.updateCart);

module.exports = cartItemRouter;