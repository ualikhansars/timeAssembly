var express = require('express');
var router = express.Router();

var User = require('../models/user');
var loginValidation = require('../utils/loginValidation');

var authenticate = require('../middlewares/authenticate');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getUserEmail/:email', function(req, res, next) {
  console.log('getUserEmail')
  console.log('req.params', req.params);
  let email = req.params.email;
  console.log('email', email);
  User.findOne({email: email}, function(err, user) {
    if(err) {
      res.json({
        confirmation: 'error',
        message: err
      });
      return;
    }
    console.log('user', user);
    if(user !== null) {
      res.json({
        confirmation: 'success',
        user: user.email
      });
    } else {
      res.json({
        confirmation: 'success',
        user: null
      });
    }
  });
});

router.post('/login', function(req, res, next) {
  loginValidation(req, res);
  return;
});

module.exports = router;
