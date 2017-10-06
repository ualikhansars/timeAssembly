var TimeInterval = require('../models/timeInterval');

module.exports = {
    find: function(params, callback) {
        TimeInterval.find(params, function(err, times) {
            if(err) {
                callback(err, null)
            }
            callback(null, times);
        });
    },
    findById: function(id, callback) {
        TimeInterval.findById(id, function(err, time) {
            if(err) {
                callback(err, null);
            }
            callback(null, time);
        });
    },
    create: function(params, callback) {
        // logic to save into database
        TimeInterval.create(params, function(err, time) {
            if(err) {
               callback(err, null);
            }
            callback(null, time);
        });
    },
    update: function(id, params, callback) {
        TimeInterval.findByIdAndUpdate(id, params, {new: true}, function(err, time) {
            if(err) {
                callback(err, null);
            }
            callback(null, time);
        });
    },
    updateByUserId: function(userId, params, callback) {
        TimeInterval.findOneAndUpdate({userId: userId}, params, {new: true}, function(err, time) {
            if(err) {
                callback(err, null);
            }
            callback(null, time);
        })
    },
    remove: function(id, callback) {
        TimeInterval.findByIdAndRemove(id, function(err, time) {
            if(err) {
                callback(err, null);
            }
            callback(null, null);
        })
    }
}