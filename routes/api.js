var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
var Task = require('../models/task');
var Slot = require('../models/slot');

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
    // user validation
    if(resource == 'user') {
      req.checkBody('email', 'email is required').notEmpty()
      req.checkBody('email', 'enter correct email address').isEmail();
      req.checkBody('password', 'passport is required').notEmpty();
      req.checkBody('password', 'password cannot be less than 4 characters').isLength({min: 4});
      req.checkBody('password', 'passwords do not match').equals(req.body.passwordConfirmation);

      req.getValidationResult()
      .then(response => {
        let errors = response.array();
        if(errors.length > 0) {
          res.json({
            confirmation: 'validation error',
            errors: errors
          });
          return;
        }
        res.json({
          confirmation: 'success',
          result: result
        });
      });
      return;
    } // end of user validation
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

// remove tasks by slot id
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

// update tasks while updating slot
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

// decrement free slot attribute
 router.put('/slot/:id/decrFree', function(req, res, next) {
  var id = req.params.id;
  Slot.findByIdAndUpdate(id, {$inc: {free: -1}},{new: true}, function(err, result) {
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
// increment free slot attribute
 router.put('/slot/:id/incFree', function(req, res, next) {
  var id = req.params.id;
  Slot.findByIdAndUpdate(id, {$inc: {free: 1}},{new: true}, function(err, result) {
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