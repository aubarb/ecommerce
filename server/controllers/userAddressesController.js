const UserAddressesModel = require("../models/userAddressModel");

const UserAddressesController = {
  
  getAll: async (req, res) => {
    const { user_id } = req.query;
    try {
      const result = await UserAddressesModel.getAll(user_id);
      return res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await UserAddressesModel.getById(id);
      return res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  create: async (req, res) => {
    const {
      user_id,
      address_line1,
      address_line2,
      city,
      postal_code,
      country,
    } = req.body;
    try {
      const result = await UserAddressesModel.create(
        user_id,
        address_line1,
        address_line2,
        city,
        postal_code,
        country
      );
      return res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { address_line1, address_line2, city, postal_code, country } =
      req.body;
    try {
      const result = await UserAddressesModel.update(
        id,
        address_line1,
        address_line2,
        city,
        postal_code,
        country
      );
      return res.status(200).json(`User Address edited`);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await UserAddressesModel.delete(id);
      return result;
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};

module.exports = UserAddressesController;
