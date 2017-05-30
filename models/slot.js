var mongoose = require('mongoose');

var slotSchema = mongoose.Schema({
    title: {type: String, required: true},
    category: {type: String},
    temporary: {type: Boolean, default: false},
    dueData: {type: String},
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Slot', slotSchema);