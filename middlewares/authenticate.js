var jwt = require('jsonwebtoken');
var jwtConfig = require('../config/jwtConfig');

export const isAuthenticated = (req, res, next) => {
    let token;
    if(req.cookies.jwtToken) {
        token = req.cookies.jwtToken;
    }
    if(token) {
        jwt.verify(token, jwtConfig.jwtSecret, function(err, decoded) {
            if(err) {
                res.redirect('/signin');
            }
            return next();
        });
    } else {
        res.redirect('/signin');
    }
}