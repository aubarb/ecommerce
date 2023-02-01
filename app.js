const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require("passport");
const session = require('express-session');
const port = 3000;
const db = require('./src/config/db.js')
const authRouter = require('./src/routes/auth.js')
const customerRouter = require('./src/routes/user.js')
const customerAddressRouter = require('./src/routes/userAddress.js')
const productRouter = require('./src/routes/product.js')
const categoryRouter = require('./src/routes/category.js')
const cartItemRouter = require('./src/routes/cart.js')
const orderItemRouter = require('./src/routes/orderItem.js')
const orderDetailsRouter = require('./src/routes/orderDetails.js')

app.use((req, res, next) => {
    req.db = db
    next()
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.query('SELECT * FROM "user" WHERE id = $1', [id], (err, results) => {
        if (err) { return done(err); }
        done(null, results.rows[0]);
    });
});

app.use('/', authRouter);
app.use('/user', customerRouter);
app.use('/user_address', customerAddressRouter);
app.use('/product', productRouter);
app.use('/category', categoryRouter);
app.use('/cart_items', cartItemRouter);
app.use('/order_items', orderItemRouter);
app.use('/order_details', orderDetailsRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

