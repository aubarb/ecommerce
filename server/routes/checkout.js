const express = require("express");
const checkoutRouter = express.Router();
const CheckoutController = require("../controllers/checkoutController");

checkoutRouter.post("/", CheckoutController.initiate);

module.exports = checkoutRouter;
