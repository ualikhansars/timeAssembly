var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var jwtConfig = require('../config/jwtConfig');
import {user} from '../config/account';
import {url} from '../config/url';
// import {transporter} from '../utils/sendMail';
import EmailVerificationToken from '../models/emailVerificationToken';
import ResetPasswordToken from '../models/resetPasswordToken';
import User from '../models/user';

import {isAuthenticated} from '../middlewares/authenticate';
import {generateEmailToken} from '../utils/emailUserToken';
import {generateExpirationDate} from '../utils/generateExpirationDate';

/* GET home page. */
router.get('/', isAuthenticated, function(req, res, next) {
  res.render('index', { title: 'TimeAssembly' });
});

router.get('/credits', function(req, res, next) {
  res.render('credits', { title: 'Credits' });
});

router.get('/emailSend', function(req, res, next) {
  res.render('emailSend', {title: 'enter email'});
});

router.get('/resetPassword', function(req, res, next) {
  res.render('resetPassword', {title: 'reset password'});
});

router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'Signin' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Signup' });
});

router.get('/logout', function(req, res, next) {
  res.redirect('/signin');
});

router.post('/sendEmailVerificationToken', function(req, res, next) {
  let userId = req.body.userId;
  let userEmail = req.body.userEmail;
  console.log('userId', userId);
  EmailVerificationToken.findOne({userId: userId}, (err, emailToken) => {
    if(err) throw error;
    console.log('emailToken', emailToken);
    let host = req.get('host');
    let protocol = req.protocol;
    let token = emailToken.token;
    let link = protocol + "://" + host + "/verify?emailToken=" + token;
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
      <p>If you received this email by mistake, simply delete it.</p>` 
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
    console.log("Domain is matched. Information is from Authentic email");
    // get Token By id
    let tokenId = req.query.emailToken;
    EmailVerificationToken.findById(tokenId, (err, token) => {
      if(err) throw error;
      // token found
      let userId = token.userId;
      // find user by token' userId
      User.findByIdAndUpdate(userId, {active: true}, {new: true}, (err, user) => {
        if(err) throw error;
        // now user is active
        // remove the token
        EmailVerificationToken.findByIdAndRemove(tokenId, (err, token) => {
          if(err) throw error;
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
        if(err) throw error;
        if(user) { // user is verified
          // create resetPassword token
          let resetToken = generateEmailToken();
          let expirationDate = generateExpirationDate();
          ResetPasswordToken.create({
            token: resetToken,
            expirationDate: expirationDate,
            userId: user._id
          }, (err, token) => {
            if(err) throw error;
            // token has been created
            console.log('reset token', token);
          });
          res.json({
            confirmation: 'success',
            result: 'email is verified'
          });
        } else { // email not found
          let error = {
            param: 'email',
            msg: 'Email not found', 
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

module.exports = router;


