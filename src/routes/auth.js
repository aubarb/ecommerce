const express = require('express');
const bcrypt = require('bcrypt');
const userController = require('../controllers/userController.js');
const db = require('../config/db.js');
const authRouter = express.Router();

authRouter.post('/register', userController.createUser);
authRouter.post('/login', userController.loginUser);


module.exports = authRouter;

