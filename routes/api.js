var express = require('express');
var router = express.Router();
var controllers = require('../controllers');



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


// update tests

router.get('/task/:id/update', function(req, res, next) {
  var id = req.params.id;
  res.render('updateTask', {id: id});
});

router.get('/slot/:id/update', function(req, res, next) {
  var id = req.params.id;
  res.render('updateSlot', {id: id});
});

router.get('/user/:id/update', function(req, res, next) {
  var id = req.params.id;
  res.render('updateUser', {id: id});
});

router.get('/task/:id/remove', function(req, res, next) {
  var id = req.params.id;
  res.redirect('/api/task')
});

module.exports = router;