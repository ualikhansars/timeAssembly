var jwt = require('jsonwebtoken');
var jwtConfig = require('../config/jwtConfig');

// prevent update task and slot by different user
export const updateByCurrentUser = (req, res, next) => {
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
            if(userId === taskUser) {
                next();
            } else {
                throw err;
            }
        });
    } else {
        throw err;
    }
}