var mongoose = require('mongoose');
var User = require('./user');

var timeFormat = mongoose.Schema({
    format: {
        type: Number,
        enum: [12, 24],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('TimeFormat', timeFormat);