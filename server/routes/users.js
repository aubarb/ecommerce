const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/usersController.js');

usersRouter.get('/', usersController.getAllUsers);
usersRouter.get('/:id', usersController.getUserById);
usersRouter.put('/:id', usersController.updateUser);
usersRouter.delete('/:id', usersController.deleteUser);

module.exports = usersRouter;