var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
var Task = require('../models/task');
// find all
router.get('/:resource', function(req, res, next) {
  var resource = req.params.resource;
  var controller = controllers[resource];

  if(controller == null) {
    res.json({
      confirmation: 'failed',
      message: 'Invalid resource request ' + resource
    })
    return;
  }
  controller.find(req.query, function(err, results){
    if(err) {
      res.json({
        confirmation: 'failed',
        message: err
      });
      return;
    }
    res.json({
      confirmation: 'success',
      resource: results
    });

  })
});


// find By Id
router.get('/:resource/:id', function(req, res, next) {
  var resource = req.params.resource;
  var controller = controllers[resource];
  var id = req.params.id;

  if(controller == null) {
    res.json({
      confirmation: 'failed',
      message: 'Invalid resource request ' + resource
    })
    return;
  }

  controller.findById(id, function(err, result) {
    if(err) {
      res.json({
        confirmation: 'failed',
        message: 'Not Found'
      });
      return;
    }
    res.json({
      confirmation: 'success',
      resource: result
    });
  });
});

// create 
router.post('/:resource', function(req, res, next) {
  var resource = req.params.resource;
  var controller = controllers[resource];

  if(controller == null) {
    res.json({
      confirmation: 'failed',
      message: 'Invalid resource request ' + resource
    })
    return;
  }

  controller.create(req.body, function(err, result) {
    if(err) {
      res.json({
        confirmation: 'failed',
        message: err
      });
      return;
    }
    res.json({
      confirmation: 'success',
      result: result
    });
  });
});

// update
router.put('/:resource/:id', function(req, res, next) {
  var resource = req.params.resource;
  var id = req.params.id;
  var controller = controllers[resource];

  if(controller == null) {
    res.json({
      confirmation: 'failed',
      message: 'Invalid resource request ' + resource
    })
    return;
  }

  controller.update(id, req.body, function(err, result) {
    if(err) {
      res.json({
        confirmation: 'error',
        message: err
      });
      return;
    }
    res.json({
      confirmation: 'success',
      result: result
    });
  });
});

// remove
router.delete('/:resource/:id', function(req, res, next) {
  var resource = req.params.resource;
  var id = req.params.id;
  var controller = controllers[resource];

  if(controller == null) {
    res.json({
      confirmation: 'failed',
      message: 'Invalid resource request ' + resource
    })
    return;
  }

  controller.remove(id, function(err, result) {
    if(err) {
      res.json({
        confirmation: 'error',
        message: err
      });
      return;
    }
    res.json({
      confirmation: 'success',
      resource: resource + ' successfully deleted' 
    });
  });
});


router.delete('/task', function(req, res, next) {
  Task.remove(req.query, function(err) {
    if(err) {
      res.json({
        confirmation: 'error',
        message: err
      });
      return;
    }
    res.json({
      confirmation: 'success',
      resource: 'task successfully deleted' 
    });
  })
}); 

router.put('/task', function(req, res, next) {
  Task.update(req.query, 
              {$set: {title: req.body.title, category: req.body.category}}, 
              {multi: true}, 
    function(err, result) {
    if(err) {
      res.json({
        confirmation: 'error',
        message: err
      });
      return;
    }
    res.json({
      confirmation: 'success',
      result: result  
    });
  })
}); 

module.exports = router;