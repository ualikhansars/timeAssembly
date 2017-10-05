var mongoose = require('mongoose');
var User = require('./user');
var uniqueValidator = require('mongoose-unique-validator');

var scheduleTimeSchema = mongoose.Schema({
    startHour: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v),
        min: 0,
        max: 24,
        default: 0
    },
    finishHour: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v),
        min: 0,
        max: 24,
        default: 24
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
});

scheduleTimeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('ScheduleTime', scheduleTimeSchema);