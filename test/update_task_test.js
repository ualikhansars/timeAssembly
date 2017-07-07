const Task = require('../models/task');
const assert = require('assert');

describe ('Update records', function() {
   var tasks; 
   beforeEach(function(done) {
         tasks = [
             new Task({
                title: 'Data Structure and Algorithm',
                category: 'Study',
                duration: 2,
                day: 'Monday',
                temporary: false, 
             }),
             new Task({
                title: 'Study',
                category: 'Study',
                duration: 2,
                day: 'Friday',
                temporary: false,
             }),
            new Task({
                title: 'JavaScript',
                category: 'Programming',
                duration: 5,
                day: 'Wednesday',
                temporary: false,
             }),
             new Task({
                title: 'Java',
                category: 'Programming',
                duration: 2,
                day: 'Friday',
                temporary: false,
             }),  
                            
         ]

        let i = 0;
        while(i < tasks.length) {
            tasks[i].save();
            i++;
        } 
        done();
   });
});

// delete by day using remove
    let newTask = {
        title: 'API',
        category: 'Program',
        duration: 2,
        day: 'Saturday',
        temporary: false,  
    }
    it('Update several task using update', function(done) {
       Task.update({category: 'Programming'}, newTask, {multi: true}).then(function() {
            Task.findOne({category: 'Programming'}).then(function(result) {
                assert(result === null);
                done();
            });
       });
    });