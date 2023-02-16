const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/db.js");
const port = 5000;

//Importing routers
const usersRouter = require("./routes/users.js");
const userAddressesRouter = require("./routes/userAddresses.js");
const productsRouter = require("./routes/products.js");
const categoriesRouter = require("./routes/categories.js");
const cartItemsRouter = require("./routes/cartItems.js");
const orderItemsRouter = require("./routes/orderItems.js");
const ordersRouter = require("./routes/orders.js");
const jwtAuthRouter = require("./routes/jwtAuth.js");
const accountRouter = require("./routes/account");

//middlewares
app.use((req, res, next) => {
  req.db = db;
  next();
});
app.use(express.json()); //enable us to access req.body
express.urlencoded({ extended: true }); // parse incoming request payloads with url-encoded data
app.use(cors()); //allow requests from a different domain to access the API

//Routes
app.use("/users", usersRouter);
app.use("/user_addresses", userAddressesRouter);
app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use("/cart_items", cartItemsRouter);
app.use("/order_items", orderItemsRouter);
app.use("/orders", ordersRouter);
app.use("/auth", jwtAuthRouter);
app.use("/account", accountRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});