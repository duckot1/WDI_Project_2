var Course   = require('./models/course');
var rp       = require('request-promise');
var parser   = require('xml2json');
var mongoose = require('mongoose');

var databaseURL = process.env.MONGOLAB_URL || 'mongodb://localhost:27017/golf-app';
mongoose.connect(databaseURL);

function saveCourses(response) {
  var json     = JSON.parse(parser.toJson(response));
  var courses  = json.syndicatedFeed.courseList.course;
  var count    = 0;

  courses.forEach(function(course, index, courses) {
    Course.create({
      available: course.available,
      file: course.file,
      lat: course.lat,
      lng: course.lng,
      postcode: course.postcode,
      location: course.location
    }, function(){
      count++;
      console.log('Course ' + count + ' downloaded.');
      if (count === courses.length) return process.exit();
    });
  });
}

function getCourses(){
  Course.collection.drop();

  var url = 'https://s3-eu-west-1.amazonaws.com/tfl.pub/Jamcams/jamcams-course-list.xml';

  return rp(url)
    .then(saveCourses)
    .catch(function (err) {
      console.log('Something went wrong', err);
      process.exit();
    });
}

desc('Populate courses');
task('courses', getCourses);

desc('Default task is test');
task('default', ['courses'], true);
