var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    active: {type: Boolean, default: false},
    dateOfCreation: {type: String, required: true},
    lastUpdate: {type: String, required: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);