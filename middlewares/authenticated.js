var jwt = require('jsonwebtoken');
var jwtConfig = require('../config/jwtConfig');

import User from '../models/user';

export const isAuthenticated = (req, res, next) => {
    let token;
    if(req.cookies.jwtToken) {
        token = req.cookies.jwtToken;
    }
    if(token) {
        jwt.verify(token, jwtConfig.jwtSecret, function(err, decoded) {
            if(err) {
                throw err;
            }
            let id = decoded.id;
            User.findById(id, (err, user) => {
                if(err) throw err;
                let active = user.active;
                if(active) {
                    // user is verified
                    return next();
                } else {
                    // user's email not verified
                    res.redirect('/signin');
                }
            });
        });
    } else {
        res.redirect('/signin');
    }
}

export const notAuthenticated = (req, res, next) => {
    let token;
    if(req.cookies.jwtToken) {
        token = req.cookies.jwtToken;
    }
    if(token) {
        jwt.verify(token, jwtConfig.jwtSecret, function(err, decoded) {
            if(err) {
                throw err;
            }
            let id = decoded.id;
            User.findById(id, (err, user) => {
                if(err) throw err;
                let active = user.active;
                if(active) {
                    // user is verified
                    res.redirect('/');
                } else {
                    // user's email not verified
                    return next();
                }
            });
        });
    } else {
        return next();
    }
}