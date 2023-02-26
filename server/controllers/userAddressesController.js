const pool = require("../config/db.js");

exports.getAllUserAddresses = (req, res) => {
  const { user_id } = req.query;
  if (user_id) {
    pool.query(
      "SELECT * FROM user_addresses WHERE user_id = $1",
      [user_id],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json(results.rows[0]);
      }
    );
  } else {
    pool.query("SELECT * FROM user_addresses", (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  }
};

exports.getUserAddressById = (req, res) => {
  const id = req.params.id;
  pool.query(
    "SELECT * FROM user_addresses WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows[0]);
    }
  );
};

exports.createUserAddress = (req, res) => {
  const { user_id, address_line1, address_line2, city, postal_code, country } =
    req.body;
  pool.query(
    "INSERT INTO user_addresses (user_id, address_line1, address_line2, city, postal_code, country) VALUES ($1, $2, $3, $4, $5, $6)",
    [user_id, address_line1, address_line2, city, postal_code, country],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json(`User Address created`);
    }
  );
};

exports.updateUserAddress = (req, res) => {
  const id = req.params.id;
  const { address_line1, address_line2, city, postal_code, country } = req.body;
  pool.query(
    "UPDATE user_addresses SET address_line1 = $1, address_line2 = $2, city = $3, postal_code = $4, country = $5 WHERE id = $6",
    [address_line1, address_line2, city, postal_code, country, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(`User Address edited`);
    }
  );
};

exports.deleteUserAddress = (req, res) => {
  const id = req.params.id;
  pool.query(
    "DELETE FROM user_addresses WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(`User Address deleted`);
    }
  );
};
