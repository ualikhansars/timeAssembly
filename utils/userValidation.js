module.exports =  function validateUser(req, res) {
    req.checkBody('email', 'Email is required').notEmpty()
    req.checkBody('email', 'Enter correct email address').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password', 'Password cannot be less than 4 characters').isLength({min: 4});
    req.checkBody('passwordConfirmation', 'Passwords do not match').equals(req.body.password);

    req.getValidationResult()
    .then(response => {
      let errors = response.array();
      if(errors.length > 0) {
        res.json({
          confirmation: 'validation error',
          errors: errors
        });
      }
    });
}