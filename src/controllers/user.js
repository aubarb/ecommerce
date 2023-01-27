const db = require('../config/db.js');
const bcrypt = require('bcrypt')

exports.getAllUsers = (req, res) => {
  db.query('SELECT * FROM user', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

exports.getUserById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM user WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows[0])
  })
}

exports.createUser = (req, res) => {
  const { id, username, first_name, last_name, email, password } = req.body
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      res.status(500).send(err.message);
    }
    db.query(
      'INSERT INTO "user" (id, username, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5, $6)',
      [id, username, first_name, last_name, email, hash], 
      (error, results) => {
      if (error) {
        if (error.code === '23505') {
          res.status(409).send('Email already exists')
        } else {
          throw error
        }
      }
      res.status(201).send(`User created`)
    });
  });
}

exports.updateUser = (req, res) => {
  const id = req.params.id;
  const { username, first_name, last_name, email } = req.body
  db.query(
    'UPDATE user SET username = $1, first_name = $2, last_name = $3, email = $4 WHERE id = $5',
    [username, first_name, last_name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM user WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`User deleted with ID: ${id}`)
  })
}