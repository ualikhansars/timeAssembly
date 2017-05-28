const Task = require('../models/task');
const assert = require('assert');

describe('saving records', function() {
    it('save task to database', function(done) {
        var dataStructure = new Task({
            title: 'Data Structure and Algorithm',
            category: 'Study',
            duration: 2,
            startTimeHours: 12,
            startTimeMinutes: 30,
            finishTimeHours: 14,
            finishTimeMinutes: 0,
            day: 'Monday',
            temporary: false,
        });
        dataStructure.save().then(function() {
            assert(dataStructure.isNew === false);
            done();
        });
    });
});