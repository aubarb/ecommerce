const express = require('express');
const userAddressesRouter = express.Router();
const userAddressesController = require('../controllers/userAddressesController.js');

userAddressesRouter.get('/', userAddressesController.getAllUserAddresses);
userAddressesRouter.get('/:id', userAddressesController.getUserAddressById);
userAddressesRouter.post('/', userAddressesController.createUserAddress);
userAddressesRouter.put('/:id', userAddressesController.updateUserAddress);
userAddressesRouter.delete('/:id', userAddressesController.deleteUserAddress);

module.exports = userAddressesRouter;