var Camera   = require('./models/camera');
var rp       = require('request-promise');
var parser   = require('xml2json');
var mongoose = require('mongoose');

var databaseURL = process.env.MONGOLAB_URL || 'mongodb://localhost:27017/tfl-cameras';
mongoose.connect(databaseURL);

function saveCameras(response) {
  var json     = JSON.parse(parser.toJson(response));
  var cameras  = json.syndicatedFeed.cameraList.camera;
  var count    = 0;

  cameras.forEach(function(camera, index, cameras) {
    Camera.create({
      available: camera.available,
      file: camera.file,
      lat: camera.lat,
      lng: camera.lng,
      postcode: camera.postcode,
      location: camera.location
    }, function(){
      count++;
      console.log('Camera ' + count + ' downloaded.');
      if (count === cameras.length) return process.exit();
    });
  });
}

function getCameras(){
  Camera.collection.drop();

  var url = 'https://s3-eu-west-1.amazonaws.com/tfl.pub/Jamcams/jamcams-camera-list.xml';

  return rp(url)
    .then(saveCameras)
    .catch(function (err) {
      console.log('Something went wrong', err);
      process.exit();
    });
}

desc('Populate cameras');
task('cameras', getCameras);

desc('Default task is test');
task('default', ['cameras'], true);
