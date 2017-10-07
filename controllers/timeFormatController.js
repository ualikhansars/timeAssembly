var TimeFormat = require('../models/timeFormat');

module.exports = {
    find: function(params, callback) {
        TimeFormat.find(params, function(err, times) {
            if(err) {
                callback(err, null)
            }
            callback(null, times);
        });
    },
    findById: function(id, callback) {
        TimeFormat.findById(id, function(err, time) {
            if(err) {
                callback(err, null);
            }
            callback(null, time);
        });
    },
    findByUserId: function(params, callback) {
        TimeFormat.findOne(params, function(err, time) {
            if(err) {
                callback(err, null)
            }
            callback(null, time);
        });
    },
    create: function(params, callback) {
        // logic to save into database
        TimeFormat.create(params, function(err, time) {
            if(err) {
               callback(err, null);
            }
            callback(null, time);
        });
    },
    update: function(id, params, callback) {
        TimeFormat.findByIdAndUpdate(id, params, {new: true}, function(err, time) {
            if(err) {
                callback(err, null);
            }
            callback(null, time);
        });
    },
    updateByUserId: function(userId, params, callback) {
        TimeFormat.findOneAndUpdate({userId: userId}, params, {new: true}, function(err, time) {
            if(err) {
                callback(err, null);
            }
            callback(null, time);
        })
    },
    remove: function(id, callback) {
        TimeFormat.findByIdAndRemove(id, function(err, time) {
            if(err) {
                callback(err, null);
            }
            callback(null, null);
        })
    }
}