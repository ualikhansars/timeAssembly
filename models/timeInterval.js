var mongoose = require('mongoose');
var User = require('./user');

var timeInterval = mongoose.Schema({
    interval: {
        type: Number,
        enum: [15, 30, 60],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('TimeInterval', timeInterval);