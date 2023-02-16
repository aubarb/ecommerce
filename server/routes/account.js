const express = require("express");
const accountRouter = express.Router();
const authorization = require("../middlewares/authorization");
const accountController = require("../controllers/accountController");

accountRouter.get("/", authorization, accountController.account);

module.exports = accountRouter;
