var mongoose = require('mongoose');
var User = require('./user');

var slotSchema = mongoose.Schema({
    title: {type: String, required: true},
    category: {type: String},
    total: {type: Number},
    free: {type: Number},
    temporary: {type: Boolean, default: false},
    dueDate: {type: String},
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Slot', slotSchema);