var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var jwtConfig = require('../config/jwtConfig');
import {user} from '../config/account';
// import {transporter} from '../utils/sendMail';
import EmailVerificationToken from '../models/emailVerificationToken';

import {isAuthenticated} from '../middlewares/authenticate';
import { error } from 'util';

/* GET home page. */
router.get('/', isAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/credits', function(req, res, next) {
  res.render('credits', { title: 'Credits' });
});


router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'Signin' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Signup' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Signup' });
});

router.get('/logout', function(req, res, next) {
  res.redirect('/signin');
});

router.get('/send', function(req, res, next) {
  console.log('req.query', req.query);
  let userId = req.query.userId;
  let userEmail = req.query.userEmail;
  EmailVerificationToken.find({userId: userId}, (err, emailToken) => {
    if(err) throw error;
    let host=req.get('host');
    let token = emailToken.token;
    let link="http://"+host+"/verify?emailToken="+token;
    let mailOptions = {
      from: user, // sender address
      to: userEmail, // list of receivers
      subject: 'Please confirm your Email account', // Subject line
      text: 'Email confirmation', // plain text body
      html: `<p>Welcome new timeAssembly user</p><br> 
      <p>Please Confirm your email address</p>
      <p>Please Click on the link to verify your email.</p>
      <br><a href="${url}">Click here to verify</a>" 
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

module.exports = router;


