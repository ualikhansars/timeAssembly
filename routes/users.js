var express = require('express');
var router = express.Router();

var User = require('../models/user');
var loginValidation = require('../utils/loginValidation');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getUserEmail/:email', function(req, res, next) {
  let email = req.params.email;
  User.findOne({email: email}, function(err, user) {
    if(err) {
      res.json({
        confirmation: 'error',
        message: err
      });
      return;
    }
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
