var Task = require('../models/task');

module.exports = {
    find: function(params, callback) {
        Task.find(params, function(err, tasks) {
            if(err) {
                callback(err, null);
                return;
            }
            callback(null, tasks);
        });
    },

    findById: function(id, callback) {
        Task.findById(id, function(err, task) {
            if(err) {
                callback(err, null);
                return;
            }
            callback(null, task);
        });
    },

    create: function(params, callback) {
        // logic to save into database
        Task.create(params, function(err, task) {
            if(err) {
                callback(err, null);
                return;
            }
            callback(null, task);
        });
    },

    update: function(id, params, callback) {
        Task.findByIdAndUpdate(id, params, {new: true}, function(err, task) {
            if(err) {
                callback(err, null);
                return;
            }
            callback(null, task);
        });
    },

    updateTaskWhenSlotUpdated: function(id, params, callback) {
        Task.update({slot: id},
            {$set: {title: params.title, category: params.category}}, 
            {multi: true},
            function(err, task) {
                if(err) {
                    callback(err, null);
                    return;
                }
                callback(null, task);
            })
    },

    remove:  function(id, callback) {
        Task.findByIdAndRemove(id, function(err, task) {
            if(err) {
                callback(err, null);
                return;
            }
            callback(null, null);
        });
    },

    removeBySlotId: function(slotId, callback) {
        Task.remove({slot: slotId}, function(err, task) {
            if(err) {
                callback(err, null);
                return;
            }
            callback(null, null);
        });
    }
}