const ProductsModel = require('../models/productsModel')

const ProductsController = {
  getAll: async (req, res) => {
    try {
      const result = await ProductsModel.getAll();
      return res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await ProductsModel.getById(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  create: async (req, res) => {
    const product = req.body;
    try {
      const result = await ProductsModel.create(product);
      return res.status(200).json(result);
    } catch (error) {
      if (error.constraint === "products_category_id_fkey") {
        return res.status(400).json({ message: "Invalid category_id" });
      }
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const product = req.body;
    try {
      const result = await ProductsModel.update(id, product)
      return res.status(200).json(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await ProductsModel.delete(id);
      return res.status(200).json(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
}

module.exports = ProductsController;








