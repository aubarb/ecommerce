const pool = require("../config/db.js");

exports.addToCart = (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const { user_id } = req.params;
  
    // Input Validation
    if (!product_id || !quantity) {
      return res
        .status(400)
        .json("Product ID and quantity are required" );
    }
  
    pool.query(
      "SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2",
      [user_id, product_id],
      (error, result) => {
        if (error) {
          return res.status(500).json("Error getting cart items" );
        }
        const existingItem = result.rows[0];
        if (existingItem) {
          pool.query(
            "UPDATE cart_items SET quantity = $1 WHERE user_id = $2 AND product_id = $3 RETURNING *",
            [quantity, user_id, product_id],
            (error, result) => {
              if (error) {
                return res.status(500).json("Error updating cart item" );
              }
              res.status(200).json("Cart updated successfully" );
            }
          );
        } else {
          pool.query(
            "INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
            [user_id, product_id, quantity],
            (error, result) => {
              if (error) {
                return res.status(500).json("Error adding cart item" );
              }
              res
                .status(200)
                .json("Product added to cart successfully" );
            }
          );
        }
      }
    );
  } catch (error) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
};

exports.getCartItems = (req, res) => {
  try {
    
  } catch (error) {
    
  }
  const { user_id } = req.params;
  if (!user_id) {
    return res.status(400).json("Missing user ID");
  }
  pool.query(
    "SELECT * FROM cart_items WHERE user_id = $1",
    [user_id],
    (error, result) => {
      if (error) {
        return res.status(500).json("Error updating cart item" );
      }
      res.status(200).json(result.rows);
    }
  );
};
