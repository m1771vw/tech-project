var jwt = require('jsonwebtoken');

let db = require('../config/db');
require('dotenv').load();

module.exports = {
    isAuthorized: (req, res, next) => {
        // console.log("Trying to authorize:", req.headers['authorization'])
        let token = req.headers['authorization'];
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        token = token.split(' ')[1];
        // console.log("Token: ", token);
  
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
          if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        //   console.log("Decoded: ", decoded);
        let user = db.one('SELECT user_id, username, password, isAdmin FROM User_Login WHERE username=$1', [decoded.id])
        .then((response) => {
            // console.log("Response: ", response);
            next(null, response);
        }).catch(err => {
            console.log("Error: ", err);
            next(null, false)
        })

        })
    }
        
}