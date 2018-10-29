var jwt = require('jsonwebtoken');
var config = require('../config/config');
let db = require('../config/db');

module.exports = {
    isAuthorized: (req, res, next) => {
        console.log("Trying to authorize:", req.headers['authorization'])
        let token = req.headers['authorization'];
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        token = token.split(' ')[1];
        console.log("Token: ", token);
  
        jwt.verify(token, config.secret, function(err, decoded) {
          if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
          console.log("Decoded: ", decoded);
        let user = db.one('SELECT user_id, username, password, isAdmin FROM User_Login WHERE username=$1', [decoded.id])
        .then((response) => {
            console.log("Response: ", response);
            next(null, response);
        }).catch(err => {
            console.log("Error: ", err);
            next(null, false)
        })

        //   User.findById(decoded.id, 
        //   { password: 0 }, // projection
        //   function (err, user) {
        //     if (err) return res.status(500).send("There was a problem finding the user.");
        //     if (!user) return res.status(404).send("No user found.");
        //     // res.status(200).send(user); Comment this out!
        //     next(user); // add this line
        //   });
        })
    }
        
}