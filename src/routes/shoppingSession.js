const express = require('express');
const shoppingSessionRouter = express.Router();
const shoppingSessionController = require('../controllers/shoppingSession.js');

shoppingSessionRouter.get('/', shoppingSessionController.getAllShoppingSessions);
shoppingSessionRouter.get('/:id', shoppingSessionController.getShoppingSessionById);
shoppingSessionRouter.post('/', shoppingSessionController.createShoppingSession);
shoppingSessionRouter.put('/:id', shoppingSessionController.updateShoppingSession);
shoppingSessionRouter.delete('/:id', shoppingSessionController.deleteShoppingSession);

module.exports = shoppingSessionRouter;