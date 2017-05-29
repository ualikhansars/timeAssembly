const mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
    title: {type: String, required: true},
    category: {type: String},
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
    day: {
        type: String, 
    },
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    slot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Slot'
    }
});

module.exports = mongoose.model('Task', taskSchema);