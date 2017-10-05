var mongoose = require('mongoose');
var User = require('./user');

var timeFormatSchema = mongoose.Schema({
    format: {
        type: Number,
        enum: [12, 24],
        default: 24
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('TimeFormat', timeFormatSchema);