const express = require('express');
const usersRouter = express.Router();
const UsersController = require('../controllers/usersController.js');

usersRouter.get('/', UsersController.getAll);
usersRouter.get('/:id', UsersController.getById);
usersRouter.put('/:id', UsersController.update);
usersRouter.delete('/:id', UsersController.delete);

module.exports = usersRouter;