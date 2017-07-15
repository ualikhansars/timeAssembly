var mongoose = require('mongoose');
var User = require('./user');

var slotSchema = mongoose.Schema({
    title: {type: String, required: true},
    category: {type: String},
    total: {
        type: Number,
        min: 1,
        max: 70,
        required: true
    },
    free: {
        type: Number,
        min: 0,
        max: 70,
        required: true
    },
    temporary: {type: Boolean, default: false},
    dueDate: {type: String},
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Slot', slotSchema);