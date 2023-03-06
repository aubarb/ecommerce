const UsersModel = require("../models/usersModel");

const UsersController = {
  getAll: async (req, res) => {
    try {
      const result = await UsersModel.getAll();
      return res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  getById: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await UsersModel.getById(id);
      return res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name } = req.body;
    if (!first_name || !last_name)
      return res.status(400).json("Missing required field(s)");
    try {
      const result = await UsersModel.update(id, first_name, last_name);
      return res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  delete: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await UsersModel.delete(id);
      return res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};

module.exports = UsersController;