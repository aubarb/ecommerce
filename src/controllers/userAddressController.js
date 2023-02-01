const db = require('../config/db.js');

exports.getAllUserAddresses = (req, res) => {
  db.query('SELECT * FROM user_address', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

exports.getUserAddressById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM user_address WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows[0])
  })
}

exports.createUserAddress = (req, res) => {
  const { id, user_id, address_line1, address_line2, city, postal_code, country	 } = req.body
  db.query(
    'INSERT INTO user_address (id, user_id, address_line1, address_line2, city, postal_code, country) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
    [id, user_id, address_line1, address_line2, city, postal_code, country], 
    (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`User Address created`)
  })
}

exports.updateUserAddress = (req, res) => {
  const id = req.params.id;
  const { user_id, address_line1, address_line2, city, postal_code, country } = req.body
  db.query(
    'UPDATE user_address SET user_id = $1, address_line1 = $2, address_line2 = $3, city = $4, postal_code = $5, country = $6 WHERE id = $7',
    [user_id, address_line1, address_line2, city, postal_code, country, id],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User Address modified with ID: ${id}`)
    }
  )
}

exports.deleteUserAddress = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM user_address WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`User Address deleted with ID: ${id}`)
  })
}