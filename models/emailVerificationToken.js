var mongoose = require('mongoose');
var User = require('./user');

var emailVerificationTokenSchema = mongoose.Schema({
    token: {type:String, required: true},
    expirationDate: {type: String, required: true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('EmailVerificationToken', emailVerificationTokenSchema);