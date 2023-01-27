const express = require('express');
const orderDetailsRouter = express.Router();
const orderDetailsController = require('../controllers/orderDetails.js');

orderDetailsRouter.get('/', orderDetailsController.getAllOrderDetails);
orderDetailsRouter.get('/:id', orderDetailsController.getOrderDetailsById);
orderDetailsRouter.post('/', orderDetailsController.createOrderDetails);
orderDetailsRouter.put('/:id', orderDetailsController.updateOrderDetails);
orderDetailsRouter.delete('/:id', orderDetailsController.deleteOrderDetails);

module.exports = orderDetailsRouter;