var taskController = require('./taskController');
var slotController = require('./slotController');
var userController = require('./userController');

module.exports = {
    task: taskController,
    slot: slotController,
    user: userController
}