const mongoose = require('mongoose');

const databaseURL = 'mongodb://localhost:27017/golf-app';
mongoose.connect(databaseURL);

const Course  = require('../models/course');

Course.collection.drop();

const course1 = new Course({
  courseName: 'Royal Wimbledon',
  lat: '51.4248172',
  lng: '-0.2351502',
  postcode: 'sw194uw'
});

const course2 = new Course({
  courseName: 'House',
  lat: '51.4499103',
  lng: '-0.1740257',
  postcode: 'sw183rr'
});

course2.save(function(err, project) {
  if (err) return console.log(err);
  console.log('Course saved! ', project);
});
