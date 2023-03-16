const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/db.js");

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
const checkoutRouter = require("./routes/checkout.js");
const CheckoutController = require("./controllers/checkoutController.js");
const bodyParser = require('body-parser');

//middlewares
app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use(cors()); //allow requests from a different domain to access the API
app.use('/webhook/stripe', bodyParser.raw({type: 'application/json'}), CheckoutController.process) // Have to put it here else issue with the parsing.
app.use(express.json()); //enable us to access req.body
express.urlencoded({ extended: true }); // parse incoming request payloads with url-encoded data

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
app.use("/checkout", checkoutRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
