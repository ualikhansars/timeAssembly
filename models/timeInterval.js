var mongoose = require('mongoose');
var User = require('./user');
var uniqueValidator = require('mongoose-unique-validator');

var timeIntervalSchema = mongoose.Schema({
    interval: {
        type: Number,
        enum: [15, 30, 60],
        default: 30
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
});

timeIntervalSchema.plugin(uniqueValidator);

module.exports = mongoose.model('TimeInterval', timeIntervalSchema);