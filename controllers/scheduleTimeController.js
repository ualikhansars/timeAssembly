var ScheduleTime = require('../models/scheduleTime');

module.exports = {
    find: function(params, callback) {
        ScheduleTime.find(params, function(err, times) {
            if(err) {
                callback(err, null)
            }
            callback(null, times);
        });
    },
    findById: function(id, callback) {
        ScheduleTime.findById(id, function(err, time) {
            if(err) {
                callback(err, null);
            }
            callback(null, time);
        });
    },
    create: function(params, callback) {
        // logic to save into database
        ScheduleTime.create(params, function(err, time) {
            if(err) {
               callback(err, null);
            }
            callback(null, time);
        });
    },
    update: function(id, params, callback) {
        ScheduleTime.findByIdAndUpdate(id, params, {new: true}, function(err, time) {
            if(err) {
                callback(err, null);
            }
            callback(null, time);
        });
    },
    remove: function(id, callback) {
        ScheduleTime.findByIdAndRemove(id, function(err, time) {
            if(err) {
                callback(err, null);
            }
            callback(null, null);
        })
    }
}