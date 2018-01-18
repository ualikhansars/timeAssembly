var mongoose = require('mongoose');
var User = require('./user');

var emailVerificationTokenSchema = mongoose.Schema({
    email: {type: String, required: true},
    token: {type:String, required: true},
    expirationDate: {type: String, required: true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('EmailVerificationToken', emailVerificationTokenSchema);