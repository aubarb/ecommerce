const express = require("express");
const stripeWebhookRoutes = express.Router();
const bodyParser = require("body-parser");
const StripeController = require("../controllers/stripeController");

stripeWebhookRoutes.post("/", bodyParser.raw({ type: "application/json" }), StripeController);

module.exports = stripeWebhookRoutes;
