var Slot = require('../models/slot');

module.exports = {
    find: function(params, callback) {
        Slot.find(params, function(err, slots) {
            if(err) {
                callback(err, null)
            }
            callback(null, slots);
        });
    },
    findById: function(id, callback) {
        Slot.findById(id, function(err, slot) {
            if(err) {
                callback(err, null);
            }
            callback(null, slot);
        });
    },
    create: function(params, callback) {
        // logic to save into database
        Slot.create(params, function(err, slot) {
            if(err) {
               callback(err, null);
            }
            callback(null, slot);
        });
    },
    update: function(id, params, callback) {
        Slot.findByIdAndUpdate(id, params, {new: true}, function(err, slot) {
            if(err) {
                callback(err, null);
            }
            callback(null, slot);
        });
    },
    remove: function(id, callback) {
        Slot.findByIdAndRemove(id, function(err, slot) {
            if(err) {
                callback(err, null);
            }
            callback(null, null);
        })
    }
}