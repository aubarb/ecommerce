const db = require('../config/db.js');

exports.getAllPaymentDetails = (req, res) => {
  db.query('SELECT * FROM payment_details', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

exports.getPaymentDetailsById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM payment_details WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows[0])
  })
}

exports.createPaymentDetails = (req, res) => {
  const { id, order_id, amount, provider, status } = req.body
  db.query('INSERT INTO payment_details (id, order_id, amount, provider, status) VALUES ($1, $2, $3, $4, $5)', [id, order_id, amount, provider, status], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`Payment details created`)
  })
}

exports.updatePaymentDetails = (req, res) => {
  const id = req.params.id;
  const { order_id, amount, provider, status } = req.body
  db.query(
    'UPDATE payment_details SET order_id = $1, amount = $2, provider = $3, status = $4 WHERE id = $5',
    [order_id, amount, provider, status, id],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Payment details modified with ID: ${id}`)
    }
  )
}

exports.deletePaymentDetails = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM payment_details WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Payment details deleted with ID: ${id}`)
  })
}
