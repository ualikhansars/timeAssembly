var jwt = require('jsonwebtoken');
var jwtConfig = require('../config/jwtConfig');

export const isCurrentUser = (req, res, next) => {
    let token;
    if(req.cookies.jwtToken) {
        token = req.cookies.jwtToken;
    }
    if(token) {
        jwt.verify(token, jwtConfig.jwtSecret, function(err, decoded) {
            if(err) {
                throw err;
            } 
            let userId = decoded.id;
            let taskUser = req.body.userId;
            console.log('req.body', req.body);
            if(userId === taskUser) {
                
            } else {
                
            }
        });
    } else {
        throw err;
    }
}