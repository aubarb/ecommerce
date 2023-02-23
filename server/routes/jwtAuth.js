const express = require("express");
const jwtAuthRouter = express.Router();
const authorization = require("../middlewares/authorization");
const validInfo = require("../middlewares/validInfo")
const authController = require("../controllers/authController");

//register route
jwtAuthRouter.post("/register", validInfo, authController.register);

//login route
jwtAuthRouter.post("/login", validInfo, authController.login);

//edit route
jwtAuthRouter.put("/edit/:id", authController.edit);

//verify user route
jwtAuthRouter.get("/verify", authorization, authController.verify);

module.exports = jwtAuthRouter;
