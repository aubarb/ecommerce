module.exports = function (req, res, next) {
  const { first_name, last_name, email, password } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  } //checking if it matches a regular expression pattern for a valid email address format

  if (req.path === "/register") {
    if (![first_name, last_name, password].every(Boolean)) {
      //checks for every el of the array if truthy
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  }
  next();
};
