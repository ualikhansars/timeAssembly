var User = require('../models/user');

module.exports = {
    find: function(params, callback) {
        User.find(params, function(err, users) {
            if(err) {
                callback(err, null);
            }
            callback(null, users);
        });
    },
    findById: function(id, callback) {
        User.findById(id, function(err, user) {
            if(err) {
                callback(err, user);
            }
            callback(null, user);
        });
    },
    create: function(params, callback) {
        User.create(params, function(err, user) {
            if(err) {
                callback(err, null);
            }
            callback(null, user);
        })
    },
    update: function(id, params, callback) {
        User.findByIdAndUpdate(id, params, {new: true}, function(err, user) {
            if(err) {
                callback(err, null);
            }
            callback(null, user);
        });
    },
    remove: function(id, callback) {
        User.findByIdAndRemove(id, function(err, user) {
            if(err) {
                callback(err, null);
            }
            callback(err, err);
        });
    }
}