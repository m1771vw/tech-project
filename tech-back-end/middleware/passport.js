// const passport      = require('passport');
// const BasicStrategy = require('passport-http').BasicStrategy;
// const User          = require('../models/user');
// const bcrypt        = require('bcryptjs');

// passport.use(new BasicStrategy(
//     function(username, password, next) {
//         User.findOne({ username }, function(err, user) {
//             if (err) return next(err, false) // If find error, return an error
//             if (!user || !user.verifyPassword(password)) return next(null, false); // If didn't find anyone, no error, user is false
//             return next(null, user); // If found, no error, return user
//         })
//     }
// ));

// exports.isAuthenticated = passport.authenticate('basic', { session: false});