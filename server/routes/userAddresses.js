const express = require('express');
const userAddressesRouter = express.Router();
const UserAddressesController = require('../controllers/userAddressesController.js');

userAddressesRouter.get('/', UserAddressesController.getAll);
userAddressesRouter.get('/:id', UserAddressesController.getById);
userAddressesRouter.post('/', UserAddressesController.create);
userAddressesRouter.put('/:id', UserAddressesController.update);
userAddressesRouter.delete('/:id', UserAddressesController.delete);

module.exports = userAddressesRouter;