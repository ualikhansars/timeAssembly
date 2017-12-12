var jwt = require('jsonwebtoken');
var jwtConfig = require('../config/jwtConfig');

module.exports = function authenticate(req, res, next) {
    const autherizationHeader = req.headers['Authorization'];
    console.log('authHeader', autherizationHeader);
    let token;
    console.log('auhenticate');
    if(autherizationHeader) {
        token = autherizationHeader.split(' ')[1];
        console.log('token', token);

        if(token) {
            jwt.verify(token, jwtConfig.jwtSecret, function(err, decoded) {
                if(err) {
                    console.log('error');
                    res.redirect('/signin');
                }
                console.log('is token');
                next();
            });
        } else {
            res.redirect('/signin');
        }
    } else {
        res.redirect('/signin');
    }
}