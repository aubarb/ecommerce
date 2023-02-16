const express = require('express');
const productsRouter = express.Router();
const productsController = require('../controllers/productsController.js')

productsRouter.get('/', productsController.getAllProducts);
productsRouter.get('/:id', productsController.getProductById);
productsRouter.post('/', productsController.createProduct);
productsRouter.put('/:id', productsController.updateProduct);
productsRouter.delete('/:id', productsController.deleteProduct);

module.exports = productsRouter;