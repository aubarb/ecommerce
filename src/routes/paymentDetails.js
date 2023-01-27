const express = require('express');
const paymentDetailsRouter = express.Router();
const paymentDetailsController = require('../controllers/paymentDetails.js');

paymentDetailsRouter.get('/', paymentDetailsController.getAllPaymentDetails);
paymentDetailsRouter.get('/:id', paymentDetailsController.getPaymentDetailsById);
paymentDetailsRouter.post('/', paymentDetailsController.createPaymentDetails);
paymentDetailsRouter.put('/:id', paymentDetailsController.updatePaymentDetails);
paymentDetailsRouter.delete('/:id', paymentDetailsController.deletePaymentDetails);

module.exports = paymentDetailsRouter;