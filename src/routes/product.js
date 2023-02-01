const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productController.js')

productRouter.get('/', productController.getAllProducts);
productRouter.get('/:id', productController.getProductById);
productRouter.post('/', productController.createProduct);
productRouter.put('/:id', productController.updateProduct);
productRouter.delete('/:id', productController.deleteProduct);

module.exports = productRouter;