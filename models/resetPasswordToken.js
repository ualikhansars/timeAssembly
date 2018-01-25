var mongoose = require('mongoose');
var User = require('./user');

var resetPasswordTokenSchema = mongoose.Schema({
    token: {type:String, required: true},
    expirationDate: {type: String, required: true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('ResetPasswordToken', resetPasswordTokenSchema);