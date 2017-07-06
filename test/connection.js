const mongoose = require('mongoose');

// ES6 Promise
mongoose.Promise = global.Promise;

before(function(done) {
    mongoose.connect('mongodb://localhost/test_timetable');
    mongoose.connection.once('open', function() {
        console.log('Connection established');
        done();
    }).on('error', function(error) {
        console.log('Connection error', error);
    });
});

// drop the task collection before each tests
beforeEach(function(done) {
    // Drop the collection
    mongoose.connection.collections.tasks.drop(function() {
        done();
    });
});

