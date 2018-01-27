var User = require('../models/user');
var bcrypt = require('bcrypt');
var ScheduleTime = require('../models/scheduleTime');
var TimeFormat = require('../models/timeFormat');
var TimeInterval = require('../models/timeInterval');
import EmailVerificationToken from '../models/emailVerificationToken';

import {generateEmailToken} from './emailUserToken';
import {generateExpirationDate} from '../utils/generateExpirationDate';

module.exports =  function validateUser(req, res) {

    req.checkBody('email', 'Enter correct email address').isEmail();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('password', 'Password cannot be less than 6 characters').isLength({min: 6});
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('passwordConfirmation', 'Passwords do not match').equals(req.body.password);

    req.getValidationResult()
    .then(response => {
      let errors = response.array();
      if(errors.length > 0) {
        res.json({
          confirmation: 'validation error',
          errors: errors
        });
      } else {
        const {email, password} = req.body;
        User.findOne({email: email}, (err, user) => {
          if(err) throw error;
          if(user) { // user is verified
            let error = {
              param: 'email',
              msg: 'There is a user with such email address', 
              value: email
            }
            errors.push(error);
            res.json({
              confirmation: 'validation error',
              errors: errors
            });
          } else { // email not found
            bcrypt.hash(password, 10, function(err, hash) {
              if(err) throw err;
              User.create({
                email: email,
                password: hash
              }, function(err, result) {
               if(err) {
                 res.json({
                   confirmation: 'failed',
                   message: err
                 });
                 return;
               }
               // create EmailVerificationToken
               let emailToken = generateEmailToken();
               let expirationDate = generateExpirationDate();
               EmailVerificationToken.create({
                 token: emailToken,
                 expirationDate: expirationDate,
                 userId: result._id
               }, (err, emailVerificationToken) => {
                 if(err) {
                   res.json({
                     confirmation: 'failed',
                     message: err
                   });
                   return;
                 }
               });
               // create user preferences
               // schedule time
               ScheduleTime.create({
                 userId: result._id
               }, function(err, scheduleTime) {
                 if(err) {
                   res.json({
                     confirmation: 'failed',
                     message: err
                   });
                   return;
                 }
               });
               // timeFormat
               TimeFormat.create({
                 userId: result._id
               }, function(err, scheduleTime) {
                 if(err) {
                   res.json({
                     confirmation: 'failed',
                     message: err
                   });
                   return;
                 }
               });
               // timeInterval
               TimeInterval.create({
                 userId: result._id
               }, function(err, scheduleTime) {
                 if(err) {
                   res.json({
                     confirmation: 'failed',
                     message: err
                   });
                   return;
                 }
               });
               res.json({
                 confirmation: 'success',
                 result: result
               });
             });
             });
          } 
        });
      }
    });
}