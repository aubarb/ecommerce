const CategoriesModel = require("../models/categoriesModel");

const CategoriesController = {
  getAll: async (req, res) => {
    try {
      const categories = await CategoriesModel.getAll();
      if (categories.length === 0) {
        return res.status(404).send("No categories");
      }
      return res.status(200).json(categories);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await CategoriesModel.getById(id);
      if (!category) {
        return res.status(404).send("Category not found");
      }
      return res.status(200).json(category);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  
  create: async (req, res) => {
    try {
      const { name, description } = req.body;
      const result = await CategoriesModel.create(name, description);
      return res.status(201).send(result);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const category = await CategoriesModel.update(id, name, description);
      if (!category) {
        return res.status(404).send("Category not found");
      }
      return res
        .status(200)
        .json(`Category with ID: ${id} has been updated successfully`);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const categoryToDelete = await CategoriesModel.delete(id);
      if (!categoryToDelete) {
        return res.status(404).send("Category not found");
      }
      return res.status(200).send(`Category with id: ${id} deleted`);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};

module.exports = CategoriesController