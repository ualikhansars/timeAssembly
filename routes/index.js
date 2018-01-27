var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var jwtConfig = require('../config/jwtConfig');
var bcrypt = require('bcrypt');
import {user} from '../config/account';
import {url} from '../config/url';
// import {transporter} from '../utils/sendMail';
import EmailVerificationToken from '../models/emailVerificationToken';
import ResetPasswordToken from '../models/resetPasswordToken';
import User from '../models/user';

import {generateEmailToken} from '../utils/emailUserToken';
import {generateExpirationDate} from '../utils/generateExpirationDate';
import {getCurrentDate} from '../utils/getCurrentDate';
import {isDueDate} from '../utils/checkDate';
import {
  isAuthenticated,
  notAuthenticated
} from '../middlewares/authenticated';

/* GET home page. */
router.get('/', isAuthenticated, function(req, res, next) {
  res.render('index', { title: 'TimeAssembly' });
});

router.get('/checkEmail', function(req, res, next) {
  res.render('checkEmail', { title: 'checkEmail' });
});

router.get('/credits', function(req, res, next) {
  res.render('credits', { title: 'Credits' });
});

router.get('/emailSend', notAuthenticated, function(req, res, next) {
  res.render('emailSend', {title: 'enter email'});
});

router.get('/emailVerified', notAuthenticated, function(req, res, next) {
  res.render('emailVerified', {title: 'email is verified'});
});

router.get('/passwordChanged', notAuthenticated, function(req, res, next) {
  res.render('passwordChanged', {title: 'password is changed'});
});

router.get('/signin', notAuthenticated, function(req, res, next) {
  res.render('signin', { title: 'Signin' });
});

router.get('/signup', notAuthenticated, function(req, res, next) {
  res.render('signup', { title: 'Signup' });
});

router.get('/logout', function(req, res, next) {
  res.redirect('/signin');
});

router.post('/sendEmailVerificationToken', (req, res, next) => {
  let userId = req.body.userId;
  let userEmail = req.body.userEmail;
  console.log('userId', userId);
  EmailVerificationToken.findOne({userId: userId}, (err, emailToken) => {
    if(err) throw new Error(err);
    console.log('emailToken', emailToken);
    let host = req.get('host');
    let protocol = req.protocol;
    let token = emailToken.token;
    let link = protocol + "://" + host + "/verifyEmail?emailToken=" + token;
    console.log('link', link);
    let mailOptions = {
      from: user, // sender address
      to: userEmail, // list of receivers
      subject: 'Please confirm your Email account', // Subject line
      text: 'Email confirmation', // plain text body
      html: `<p>Welcome new timeAssembly user</p><br> 
      <p>Please Confirm your email address</p>
      <p>Please Click on the link to verify your email.</p>
      <br><a href="${link}">Click here to verify</a>" 
      <p>Thanks.</p>
      <p>Time Assembly Team.</p>
      <br><br>
      <p>If you received this email by mistake, simply delete it.</p>
      
      ` 
    };
    // transporter.sendMail(mailOptions, (err, res) => {
    //   if(err) {
    //     throw error;
    //   }
    //   res.render('send');
    // })
  });
});

router.get('/emailVerificationPage', (req, res, next) => {
  res.render('emailVerificationPage', {});
});

router.get('/verifyEmail', (req, res, next) => {
  let protocol = req.protocol;
  let host =  req.get('host');
  console.log(req.protocol + ':/' + req.get('host'));
  if((protocol + '://' + host) == url) {
    //console.log("Domain is matched. Information is from Authentic email");
    // get Token By id
    let emailToken = req.query.emailToken;
    EmailVerificationToken.findOne({token: emailToken}, (err, token) => {
      if(err) throw new Error(err);
      // token found
      let userId = token.userId;
      // find user by token' userId
      User.findByIdAndUpdate(userId, {active: true}, {new: true}, (err, user) => {
        if(err) throw new Error(err);
        // now user is active
        // remove the token
        EmailVerificationToken.findOneAndRemove({token: emailToken}, (err, token) => {
          if(err) throw new Error(err);
          res.redirect('/emailVerified');
        });
      });
    });
  } 
});

router.post('/emailSend', (req, res, next) => {
  console.log('req.body', req.body);
  req.checkBody('email', 'Enter correct email address').isEmail();
  req.checkBody('email', 'Email is required').notEmpty();
  
  req.getValidationResult()
  .then(response => {
    let errors = response.array();
    if(errors.length > 0) {
      res.json({
        confirmation: 'validation error',
        errors: errors
      });
    } else {
      User.findOne({email: req.body.email}, (err, user) => {
        if(err) throw new Error(err);
        if(user && user.active) { // user is verified
          // create resetPassword token
          let userEmail = user.email;
          let resetToken = generateEmailToken();
          let expirationDate = generateExpirationDate();
          ResetPasswordToken.create({
            token: resetToken,
            expirationDate: expirationDate,
            userId: user._id
          }, (err, token) => {
            if(err) throw new Error(err);;
            // token has been created
            console.log('reset token', token);
            let host = req.get('host');
            let protocol = req.protocol;
            let link = protocol + "://" + host + "/resetPassword?resetToken=" + resetToken;
            console.log('link', link);
            let mailOptions = {
              from: user, // sender address
              to: userEmail, // list of receivers
              subject: 'Reset password Time Assembly', // Subject line
              text: 'Reset password', // plain text body
              html: `<p>We've received a request to reset your password</p><br> 
              <p>You can reset your password by clicking the link below</p>
              <br><a href="${link}">Click here to reset password</a>" 
              <p>Thanks.</p>
              <p>Time Assembly Team.</p>
              <br><br>
              <p>If you received this email by mistake, simply delete it.</p>
              ` 
            };
            // transporter.sendMail(mailOptions, (err, res) => {
            //   if(err) {
            //     throw error;
            //   }
            // })
          });
          res.json({
            confirmation: 'success',
            result: 'email is verified'
          });
        } else { // email not found
          let error = {
            param: 'email',
            msg: 'Email not found or not verified', 
            value: req.body.email
          }
          errors.push(error);
          res.json({
            confirmation: 'validation error',
            errors: errors
          });
        } 
      });
    }
  });
});

router.get('/resetPassword', notAuthenticated, (req, res, next) => {
  let resetToken = req.query.resetToken;
  ResetPasswordToken.findOne({token: resetToken}, (err, token) => {
    if(err) throw new Error(err);
    
    if(token) {
      // token is fetched
      console.log('token', token);
      let userId = token.userId;
      console.log('userId', userId); 
      let currentDate = getCurrentDate();
      let expirationDate = token.expirationDate;
      console.log('expirationDate', expirationDate);
      console.log('currentDate', currentDate);
      if(isDueDate(currentDate, expirationDate)) {
        // resetPassword token is expired
        res.json({
          confirmation: 'error',
          message: 'reset password token is expired'
        });
      } else {
        // reset Password token is valid
        // fetch user
        User.findById(userId, (err, user) => {
          if(err) throw new Error(err);
          // user is found
          // save userId in cookie
          let isActive = user.active;
          if(isActive) {
            res.clearCookie('resetToken');
            res.cookie('resetToken', resetToken, { maxAge: 900000, httpOnly: true});
            res.render('resetPassword', {title: 'reset password'});
          } else {
            res.json({
              confirmation: 'error',
              message: 'email is not verified'
            });
          }
        });
      }
    } else {
      // token not found
      res.json({
        confirmation: 'error',
        message: 'reset password token not found'
      });
    }
  });
  
});

router.post('/resetPassword', (req, res, next) => {
  let resetToken = req.cookies.resetToken;
  console.log('resetToken', resetToken);
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
        // no validation errors
        let {password} = req.body;
        console.log('password', password);
        ResetPasswordToken.findOne({token: resetToken}, (err, token) => {
          if(err) throw new Error(err);
          
          if(token) {
            // token is fetched
            console.log('token', token);
            let userId = token.userId;
            console.log('userId', userId); 
            let currentDate = getCurrentDate();
            let expirationDate = token.expirationDate;
            console.log('expirationDate', expirationDate);
            console.log('currentDate', currentDate);
            if(isDueDate(currentDate, expirationDate)) {
              // resetPassword token is expired
              res.json({
                confirmation: 'error',
                message: 'reset password token is expired'
              });
            } else {
              // reset Password token is valid
              // fetch user
              User.findById(userId, (err, user) => {
                if(err) throw new Error(err);
                if(user) {
                  let isActive = user.active;
                  console.error('isActive', isActive);
                  if(isActive) {
                    // user is verified
                    bcrypt.hash(password, 10, function(err, hash) { 
                      // hash the password
                      if(err) throw new Error(err);
                      console.log('hash', hash);
                      // change user password
                      User.findByIdAndUpdate(userId, {password: hash}, {new: true}, (err, user) => {
                        if(err) throw new Error(err);
                        // remove token
                        ResetPasswordToken.findOneAndRemove({token: resetToken}, (err, token) => {
                          if(err) throw new Error(err);
                          // remove cookie
                          res.clearCookie('resetToken');
                          res.json({
                            confirmation: 'success',
                            message: 'password has been successfully changed'
                          })
                        });
                      });
                    });
                  } else {
                    // user not verified
                    res.json({
                      confirmation: 'error',
                      message: 'email is not verified'
                    });
                  }
                }
              });
            }
          } else {
            // token not found
            res.json({
              confirmation: 'error',
              message: 'reset password token not found'
            });
          }
        });
      }
    });

});

module.exports = router;


