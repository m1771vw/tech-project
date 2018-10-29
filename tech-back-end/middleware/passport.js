const passport      = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt        = require('bcryptjs');
let db = require('../config/db');

passport.use(new BasicStrategy((username, password, next) => {
    console.log("IN MIDDLEWARE: QUERYING");
    console.log("Original password:" , password);
    let user = db.one('SELECT user_id, username, password, isAdmin FROM User_Login WHERE username=$1', [username])
    .then(response => {
        // console.log(err);
        console.log("User:" , user);
        console.log("Response: ", response);
        // if(err) {
        //     console.log("IN MIDDLEWARE: FOUND ERROR");
        //     return next(err, false)
        // }
        if(response !== undefined) {
            console.log("IN MIDDLEWARE: COMPARING PW");
            bcrypt.compare(password, response.password)
                .then(res => {

                // console.log(res);
                if(res) {
                    console.log("IN MIDDLEWARE: APPROVED", res);
                    next(null, response)
                } else {
                    next(null, false)
                }
            })
        } else {
            next(null, false)
        }
    }).catch(err => {
        console.log("Error:", err);
        next(null, false)
    })
        // User.findOne({ username }, function(err, user) {
        //     if (err) return next(err, false) // If find error, return an error
        //     if (!user || !user.verifyPassword(password)) return next(null, false); // If didn't find anyone, no error, user is false
        //     return next(null, user); // If found, no error, return user
        // })
    }
));

exports.isAuthenticated = passport.authenticate('basic', { session: false});