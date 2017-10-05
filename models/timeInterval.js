var mongoose = require('mongoose');
var User = require('./user');

var timeIntervalSchema = mongoose.Schema({
    interval: {
        type: Number,
        enum: [15, 30, 60],
        default: 30
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('TimeInterval', timeIntervalSchema);