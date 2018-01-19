const User = require('../models/user');
const assert = require('assert');

describe ('User test', function() {
   beforeEach(function(done) {
    var user1 = new User({
        email: 'user1@gmail.com',
        password: '1111'
    });
    user1.save();
    console.log('user saved:', user1);
    done();
   });
   // find user by username
   it('Find user by username', function(done) {
    User.findOne({email: 'user1@gmail.com' }, (err, user) => {
        if(err) console.log(err);
        assert(user.email === 'user1@gmail.com' && user.password === '1111');
        done();
    });
    });
});

