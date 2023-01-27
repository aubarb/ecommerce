const express = require('express');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');
const userController = require('../controllers/user.js');
const db = require('../config/db.js');
const authRouter = express.Router();

authRouter.post('/register', userController.createUser);

authRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    },
    function(email, password, done) {
        db.query('SELECT * FROM "user" WHERE email = $1', [email], (err, results) => {
            if (err) { return done(err); }
            if (results.rows.length === 0 ) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            const user = results.rows[0];
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) { return done(err); }
                if (!isMatch) {
                    return done(null, false, { message: 'Incorrect password. '});
                }
                return done(null, user);
            })
        })
    }
))

module.exports = authRouter;

