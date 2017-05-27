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
    finishTimeHours: {
        type: Number,
        get: v => Math.round(v),
        set: v => Math.round(v),
        min: 0,
        max: 23,  
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
        default: ''
    },
    temporary: {
        type: Boolean,
        default: false
    },
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Task', taskSchema);