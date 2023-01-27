const db = require('../config/db.js');

exports.getAllShoppingSessions = (req, res) => {
  db.query('SELECT * FROM shopping_session', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

exports.getShoppingSessionById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM shopping_session WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows[0])
  })
}

exports.createShoppingSession = (req, res) => {
  const { id, user_id, total } = req.body
  db.query('INSERT INTO shopping_session (id, user_id, total) VALUES ($1, $2, $3)', [id, user_id, total], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Shopping session created`)
  })
}

exports.updateShoppingSession = (req, res) => {
    const id = req.params.id;
    const { user_id, total } = req.body
    db.query(
      'UPDATE shopping_session SET user_id = $1, total = $2 WHERE id = $3',
      [user_id, total, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Shopping session modified with ID: ${id}`)
    })
}

  exports.deleteShoppingSession = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM shopping_session WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Shopping session deleted with ID: ${id}`)
    })
}