var express = require('express');
var router = express.Router();

//var authenticate = require('../middlewares/authenticate');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', {});
});

router.get('/signin', function(req, res, next) {
  res.render('signin', {});
});


module.exports = router;


