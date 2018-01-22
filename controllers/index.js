var taskController = require('./taskController');
var slotController = require('./slotController');
var userController = require('./userController');
var scheduleTimeController = require('./scheduleTimeController');
var timeFormatController = require('./timeFormatController');
var timeIntervalController = require('./timeIntervalController');
var emailVerificationController = require('./emailVerificationController');

module.exports = {
    emailVerificationToken: emailVerificationController,
    task: taskController,
    slot: slotController,
    user: userController,
    scheduleTime: scheduleTimeController,
    timeFormat: timeFormatController,
    timeInterval: timeIntervalController
}