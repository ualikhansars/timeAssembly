var express = require('express');
var router = express.Router();
var controller = require('../controllers/taskController');

/* GET home page. */
router.get('/tasks', function(req, res, next) {
  controller.find({}, function(err, tasks){
    if(err) {
      res.json({
        confirmation: 'failed',
        message: 'Invalid resource request'
      });
    }
    res.json({
      confirmation: 'success',
      resource: tasks
    });

  })
});

router.get('/tasks/:id', function(req, res, next) {
  var id = req.params.id;
  controller.findById(id, function(err, task) {
    if(err) {
      res.json({
        confirmation: 'failed',
        message: 'Not Found'
      });
    }
    res.json({
      confirmation: 'success',
      resource: task
    });
  });
});

router.post('/task', function(req, res, next) {
  controller.create(req.body, function(err, task) {
    if(err) {
      res.json({
        confirmation: 'failed',
        message: err
      });
    }
    res.json({
      confirmation: 'success',
      result: task
    });
  });
});

module.exports = router;