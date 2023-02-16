const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" }); //We need the secret for jwt

module.exports = (req, res, next) => {
  try {
    const jwtToken = req.header("token");
    if (!jwtToken) {
      return res.status(403).json("Not authorized");
    }

    const payload = jwt.verify(jwtToken, process.env.jwtSecret); // If verified, returns the decoded JSON object, i.e. payload that we can use to access specific routes

    req.user = payload.user;
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("Not authorized");
  }
  next();
};
