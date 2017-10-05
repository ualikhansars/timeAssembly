var mongoose = require('mongoose');
var User = require('./user');
var uniqueValidator = require('mongoose-unique-validator');

var timeFormatSchema = mongoose.Schema({
    format: {
        type: Number,
        enum: [12, 24],
        default: 24
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
});

timeFormatSchema.plugin(uniqueValidator);

module.exports = mongoose.model('TimeFormat', timeFormatSchema);