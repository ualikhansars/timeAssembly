var mongoose = require('mongoose');
var User = require('./user');

var scheduleTime = mongoose.Schema({
    startHour: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v),
        min: 0,
        max: 24
    },
    finishHour: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v),
        min: 0,
        max: 24
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('ScheduleTime', scheduleTime);