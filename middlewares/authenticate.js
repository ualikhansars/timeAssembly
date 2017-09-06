var jwt = require('jsonwebtoken');
var jwtConfig = require('../config/jwtConfig');

module.exports = function authenticate(req, res, next) {
    const autherizationHeader = req.headers['authorization'];
    console.log('auth', autherizationHeader);
    let token;
    console.log('auhenticate');
    if(autherizationHeader) {
        token = autherizationHeader.split(' ')[1];
        console.log('token', token);

        if(token) {
            jwt.verify(token, jwtConfig.jwtSecret, function(err, decoded) {
                if(err) {
                    console.log('error');
                    res.status(401).json({
                        error: 'Failed to authenticate'
                    });
                    //res.redirect('/signin');
                }
                console.log('is token');
                //return next();
            });
        } else {
            console.log('no token');
            //return res.redirect('/signin');
            res.status(403).json({
                error: 'No token provided'
            });
        }
    }
    res.status(401).json({
        error: 'No headers'
    })
}