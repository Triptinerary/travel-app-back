var mongoose = require('mongoose'),
    User = require('../models/User');

var connStr = 'mongodb://localhost:27017/mongoose-bcrypt-test;'
mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});

// create a user a new user
var testUser = new User({
    username: 'jmar777',
    email: 'j@j.com',
    password: 'Password123',
    points: 500,
    saved_itinerary: [],
    purchased_itinerary: []
});

// save user to database
testUser.save(function(err) {
    if (err) throw err;

// fetch user and test password verification
User.findOne({ username: 'jmar777' }, function(err, user) {
    if (err) throw err;

    // test a matching password
    user.comparePassword('Password123', function(err, isMatch) {
        if (err) throw err;
        console.log('Password123:', isMatch); // -> Password123: true
    });

    // test a failing password
    user.comparePassword('123Password', function(err, isMatch) {
        if (err) throw err;
        console.log('123Password:', isMatch); // -> 123Password: false
    });
})
});