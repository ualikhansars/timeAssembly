import { error } from 'util';
import { request } from 'https';

var jwt = require('jsonwebtoken');
var jwtConfig = require('../config/jwtConfig');

// prevent update task and slot by other users
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
            let resource = req.params.resource;
            let userId = decoded.id;
            let taskUser = req.body.userId;
            if(resource === 'task' || resource === 'slot') {
                if(userId === taskUser) {
                    next();
                } 
            } else {
                return res.send({ error: 'cannot update user via application' });; // cannot update user via application
            }
        });
    } else {
        return res.send({ error: 'No token found' });
    }
}

// prevent remove task and slot by other users
export const deleteByCurrentUser = (req, res, next) => {
    let token;
    if(req.cookies.jwtToken) {
        token = req.cookies.jwtToken;
    }
    if(token) {
        jwt.verify(token, jwtConfig.jwtSecret, function(err, decoded) {
            if(err) {
                throw err;
            } 
            let resource = req.params.resource;
            let userId = decoded.id;
            let taskUser = req.query.userId;
            if(resource === 'task' || resource === 'slot') {
                if(userId === taskUser) {
                    next();
                } 
            } else {
                return res.send({ error: 'cannot delete user via application' });; // cannot delete user via application
            }
        });
    } else {
        return res.send({ error: 'No token found' });
    }
}

