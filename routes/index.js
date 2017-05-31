var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/createTask', function(req, res, next) {
  res.render('createTask', {});
});

router.get('/createSlot', function(req, res, next) {
  res.render('createSlot', {});
});

router.get('/createUser', function(req, res, next) {
  res.render('createSlot', {});
});

module.exports = router;
