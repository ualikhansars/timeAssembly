var jwt = require('jsonwebtoken');
var jwtConfig = require('../config/jwtConfig');

export const authenticate = (req, res, next) => {
    //const autherizationHeader = req.headers['Authorization'];
    //console.log('authHeader', autherizationHeader);
    let token;
    if(req.cookies.jwtToken) {
        token = req.cookies.jwtToken;
    }
    //console.log('auhenticate');
    if(token) {
        jwt.verify(token, jwtConfig.jwtSecret, function(err, decoded) {
            if(err) {
                res.redirect('/login');
            }
            console.log('user is authenticated');
            return next();
        });
    } else {
        console.log('user is not authenticated');
        res.redirect('/login');
    }

}