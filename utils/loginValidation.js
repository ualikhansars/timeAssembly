var User = require('../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var jwtConfig = require('../config/jwtConfig');

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
        let {email, password} = req.body;
        User.findOne({email: email}, function(err, user) {
            if(err) {
                res.json({
                  confirmation: 'failed',
                  message: err
                });
                return;
            }
            if(user) {
                console.log('user', user);
                if(bcrypt.compareSync(password, user.password)) {
                    // success
                    const token = jwt.sign(
                    {
                        id: user.id,
                        email: user.email // payload
                    },
                    jwtConfig.jwtSecret);
                    res.json({
                        confirmation: 'success',
                        token
                    });
                } else {
                    res.json({
                        confirmation: 'failed',
                        message: 'Invalid email address or password'
                    });
                }
            } else {
                res.json({
                    confirmation: 'failed',
                    message: 'Invalid email address or password'
                });
            }
        });
      }
    });
}