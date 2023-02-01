const express = require('express');
const userAddressRouter = express.Router();
const userAddressController = require('../controllers/userAddressController.js');

userAddressRouter.get('/', userAddressController.getAllUserAddresses);
userAddressRouter.get('/:id', userAddressController.getUserAddressById);
userAddressRouter.post('/', userAddressController.createUserAddress);
userAddressRouter.put('/:id', userAddressController.updateUserAddress);
userAddressRouter.delete('/:id', userAddressController.deleteUserAddress);

module.exports = userAddressRouter;