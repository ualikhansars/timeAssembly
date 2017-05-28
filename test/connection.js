const mongoose = require('mongoose');

// ES6 Promise
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/test_timetable');
mongoose.connection.once('open', function() {
    console.log('Connection established');
}).on('error', function(error) {
    console.log('Connection error', error);
});