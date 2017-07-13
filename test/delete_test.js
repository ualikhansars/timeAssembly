const assert = require('assert');
const Task = require('../models/task');
// Describe tests
describe ('Deleting records', function() {
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
    // create tests
    it('Delete one record from database', function(done) {
       Task.findOneAndRemove({day: 'Monday'}).then(function() {
            Task.findOne({name: 'Monday'}).then(function(result) {
                assert(result === null);
                done();
            });
       });
    });

    // delete by day using remove
    it('Delete by day using remove from database', function(done) {
       Task.remove({day: 'Monday'}).then(function() {
            Task.findOne({name: 'Monday'}).then(function(result) {
                assert(result === null);
                done();
            });
       });
    });
    it('Delete several records from database', function(done) {
       Task.remove({category: 'Programming'}).then(function() {
            Task.findOne({category: 'Programming'}).then(function(result) {
                assert(result === null);
                done();
            });
       });
    });
     
});

