const pool = require("../config/db.js");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

exports.register = async (req, res) => {
  try {
    //destructure the req.body (name, email, password)
    const { first_name, last_name, email, password } = req.body;
    //check if user already exist (if exist throw error)
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).json("user already exist");
    }

    //Bcrypt the user password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    //enter the new user inside the database
    const newUser = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [first_name, last_name, email, bcryptPassword]
    );

    //generate the empty address associated with this user
    pool.query("INSERT INTO user_addresses (user_id) VALUES ($1) RETURNING *", [
      newUser.rows[0].id,
    ]);

    //generate our jwt token
    const token = jwtGenerator(newUser.rows[0].id);

    //send response with token and user data
    res.json({ token, user: newUser.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
};

exports.login = async (req, res) => {
  try {
    //destructure req.body
    const { email, password } = req.body;

    //check if user doesn't exist, if not throw error
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json("User not found");
    }

    //check if incoming password === db password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json("Incorrect password");
    }

    //give them the jwt token
    const token = jwtGenerator(user.rows[0].id);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
  }
};

exports.edit = async (req, res) => {
  try {
    //destructure req.body
    const { currentPassword, newPassword } = req.body;
    const { id } = req.params;
  
    //check if user doesn't exist, if not throw error
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (user.rows.length === 0) {
      return res.status(401).json("User not found");
    }

    //check if password was received, if not throw error
    if (!currentPassword || !newPassword) {
      return res.status(401).json("Missing password values");
    }

    //check if incoming password === db password
    const validPassword = await bcrypt.compare(
      currentPassword,
      user.rows[0].password
    );

    if (!validPassword) {
      return res.status(401).json("Incorrect password");
    }

    //Bcrypt the user password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(newPassword, salt);

    //Enter the new password in db
    pool.query(
      "UPDATE users SET password = $1 WHERE id = $2",
      [bcryptPassword, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json(`Password modified successfully!`);
      }
    );
  } catch (err) {
    console.error(err.message);
  }
};

exports.verify = async (req, res) => {
  try {
    res.json(true); //if it passes, means authorization middleware authorized, token is valid so we return true
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
};
