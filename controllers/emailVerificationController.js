import EmailVerificationToken from '../models/emailVerificationToken';

module.exports = {
    find: function(params, callback) {
        EmailVerificationToken.find(params, function(err, tokens) {
            if(err) {
                callback(err, null)
            }
            callback(null, tokens);
        });
    },
    findById: function(id, callback) {
        EmailVerificationToken.findById(id, function(err, token) {
            if(err) {
                callback(err, null);
            }
            callback(null, token);
        });
    },
    remove: function(id, callback) {
        EmailVerificationToken.findByIdAndRemove(id, function(err, token) {
            if(err) {
                callback(err, null);
            }
            callback(null, null);
        })
    }
}