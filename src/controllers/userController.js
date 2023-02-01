const db = require('../config/db.js');
const bcrypt = require('bcrypt')

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

exports.getAllUsers = (req, res) => {
  db.query('SELECT * FROM "user"', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

exports.getUserById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM "user" WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows[0])
  })
}

exports.updateUser = (req, res) => {
  const id = req.params.id;
  const { username, first_name, last_name, email } = req.body
  db.query(
    'UPDATE "user" SET username = $1, first_name = $2, last_name = $3, WHERE id = $4',
    [username, first_name, last_name, id],
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
    db.query('DELETE FROM "user" WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User deleted with ID: ${id}`)
    })
  }
  
  exports.loginUser = (req, res) => {
    const { email, password } = req.body;
  
    db.query('SELECT * FROM "user" WHERE email = $1', [email], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'An error occurred while querying the database.' });
      }
  
      if (results.rows.length === 0) {
        return res.status(401).json({ message: 'Incorrect email.' });
      }
  
      const user = results.rows[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ message: 'An error occurred while comparing the passwords.' });
        }
  
        if (!isMatch) {
          return res.status(401).json({ message: 'Incorrect password.' });
        }
  
        return res.status(200).json({ message: 'Login successful.' });
      });
    });
  };