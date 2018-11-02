const passport      = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt        = require('bcryptjs');
let db = require('../config/db');

passport.use(new BasicStrategy((username, password, next) => {
    console.log("IN MIDDLEWARE: QUERYING OG PW:", password);
    let user = db.one('SELECT user_id, username, password, isAdmin FROM User_Login WHERE username=$1', [username])
    .then(response => {
        if(response !== undefined) {
            console.log("IN MIDDLEWARE: COMPARING PW");
            bcrypt.compare(password, response.password)
                .then(res => {
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
    }
));

exports.isAuthenticated = passport.authenticate('basic', { session: false});