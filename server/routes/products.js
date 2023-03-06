const express = require('express');
const productsRouter = express.Router();
const ProductsController = require('../controllers/productsController')

productsRouter.get('/', ProductsController.getAll);
productsRouter.get('/:id', ProductsController.getById);
productsRouter.post('/', ProductsController.create);
productsRouter.put('/:id', ProductsController.update);
productsRouter.delete('/:id', ProductsController.delete);

module.exports = productsRouter;