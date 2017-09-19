var mongoose = require('mongoose');
var User = require('./user');
var Slot = require('./slot');

var taskSchema = mongoose.Schema({
    title: {type: String, required: true},
    category: {type: String},
    description: {type: String},
    duration: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v),
        min: 0,
        max: 720,  
    },
    startTimeHours: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v),
        min: 0,
        max: 23,  
    },
    startTimeMinutes: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v),
        min: 0,
        max: 59,  
    },
    finishTimeHours: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v),
        min: 0,
        max: 24,  
    },
    finishTimeMinutes: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v),
        min: 0,
        max: 59,  
    },
    day: {
        type: String, 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    slot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Slot'
    }
});

module.exports = mongoose.model('Task', taskSchema);