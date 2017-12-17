var express = require('express');
var router = express.Router();

import {authenticate} from '../middlewares/authenticate';

/* GET home page. */
router.get('/', authenticate, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'Signin' });
});

/* GET home page. */
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Signup' });
});



module.exports = router;


