var User = require('../models/user');
var bcrypt = require('bcrypt');

module.exports =  function loginValidation(req, res) {
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();

    req.getValidationResult()
    .then(response => {
      let errors = response.array();
      if(errors.length > 0) {
        res.json({
          confirmation: 'validation error',
          errors: errors
        });
      } else {
        console.log('login');
      }
    });
}