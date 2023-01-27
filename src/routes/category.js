const express = require('express');
const categoryRouter = express.Router();
const categoryController = require('../controllers/category.js');

categoryRouter.get('/', categoryController.getAllCategories);
categoryRouter.get('/:id', categoryController.getCategoryById);
categoryRouter.post('/', categoryController.createCategory);
categoryRouter.put('/:id', categoryController.updateCategory);
categoryRouter.delete('/:id', categoryController.deleteCategory);

module.exports = categoryRouter;