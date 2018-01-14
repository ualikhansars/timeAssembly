var express = require('express');
var router = express.Router();
var controllers = require('../controllers');
var userValidation = require('../utils/userValidation');
var jwt = require('jsonwebtoken');
var jwtConfig = require('../config/jwtConfig');

var Task = require('../models/task');
var Slot = require('../models/slot');
var User = require('../models/user');

import {
  deleteByCurrentUser,
  updateByCurrentUser
} from '../middlewares/currentUser';

// find all
router.get('/:resource', function(req, res, next) {
  var resource = req.params.resource;
  var controller = controllers[resource];
  let token;
  if(req.cookies.jwtToken) {
      token = req.cookies.jwtToken;
  }
  if(token) {
    if(token) {
      jwt.verify(token, jwtConfig.jwtSecret, function(err, decoded) {
        let userId = decoded.id;
        let requestId = req.query.userId;
        if(err) {
          res.json({
            confirmation: 'failed',
            message: 'authorization error'
          });
          return;
        } 
        if(controller == null) {
          res.json({
            confirmation: 'failed',
            message: 'Invalid resource request ' + resource
          })
          return;
        }
        if(userId === requestId) {
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
            return;
          })
        } else {
          res.json({
            confirmation: 'failed',
            message: 'access denied'
          });
          return;
        }
      });
  } else {
    res.json({
      confirmation: 'failed',
      message: 'access denied'
    });
    return;
  }
  } else {
    res.json({
      confirmation: 'failed',
      message: 'authorization error'
    });
    return;
  }
  
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

// find One by UserId
router.get('/:resource/byUserId/:userId', function(req, res, next) {
  var resource = req.params.resource;
  var controller = controllers[resource];
  var userId = req.params.userId;

  if(controller == null) {
    res.json({
      confirmation: 'failed',
      message: 'Invalid resource request ' + resource
    })
    return;
  }

  controller.findByUserId(userId, function(err, result) {
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

  // user validation
  if(resource == 'user') {
    userValidation(req, res);
    return;
  } // end of user validation

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
router.put('/:resource/:id', updateByCurrentUser, function(req, res, next) {
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

// update by userId
router.put('/:resource/byUserId/:userId', function(req, res, next) {
  var resource = req.params.resource;
  var userId = req.params.userId;
  var controller = controllers[resource];

  if(controller == null) {
    res.json({
      confirmation: 'failed',
      message: 'Invalid resource request ' + resource
    })
    return;
  }

  controller.updateByUserId(userId, req.body, function(err, result) {
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

// increment free slot attribute
router.put('/:resource/:id/incFree', function(req, res, next) {
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

  controller.incFree(id, req.body, function(err, result) {
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

// descrement free slot attribute
router.put('/:resource/:id/decrFree', function(req, res, next) {
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

  controller.decrFree(id, req.body, function(err, result) {
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

// update tasks while updating slot
router.put('/:resource/withSlot/:id', function(req, res, next) {
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

  controller.updateTaskWhenSlotUpdated(id, req.body, function(err, result) {
    console.log('updateTask controller');
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
router.delete('/:resource/:id', deleteByCurrentUser, function(req, res, next) {
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
router.delete('/:resource/bySlotId/:id', function(req, res, next) {
  var resource = req.params.resource;
  var controller = controllers[resource];
  var slotId = req.params.id;

  if(controller == null) {
    res.json({
      confirmation: 'failed',
      message: 'Invalid resource request ' + resource
    })
    return;
  }

  controller.removeBySlotId(slotId, function(err, result) {
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

module.exports = router;