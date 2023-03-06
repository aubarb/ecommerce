const express = require('express');
const categoriesRouter = express.Router();
const CategoriesController = require('../controllers/categoriesController.js');

categoriesRouter.get('/', CategoriesController.getAll);
categoriesRouter.get('/:id', CategoriesController.getById);
categoriesRouter.post('/', CategoriesController.create);
categoriesRouter.put('/:id', CategoriesController.update);
categoriesRouter.delete('/:id', CategoriesController.delete);

module.exports = categoriesRouter;