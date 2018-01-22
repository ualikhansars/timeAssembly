var express = require('express');
var router = express.Router();
import emailVerificationToken from '../models/emailVerificationToken';

import {isAuthenticated} from '../middlewares/authenticate';

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
  res.render('send');
});

module.exports = router;


