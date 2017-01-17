const mongoose = require('mongoose');
const rp       = require('request-promise');

const databaseURL = 'mongodb://localhost:27017/golf-app';
mongoose.connect(databaseURL);

const Place  = require('../models/place');
const Activity  = require('../models/activity');
const Station = require('../models/station');

Station.collection.drop();

Place.collection.drop();
Activity.collection.drop();

var options = {
  url: 'https://trailapi-trailapi.p.mashape.com/?limit=10000&q[country_cont]=United+Kingdom',
  headers: {
    'X-Mashape-Authorization': 'N9En10D3YImsh3Bwp5CuNALscQNwp1iZe9UjsnYib8D1te1oBu'
  },
  json: true // Automatically parses the JSON string in the response
};



rp(options)
.then(function (data) {
  data.places.forEach((place) => {
    place.activitiesIDs = [];
    place.activities.forEach((activity) => {
      Activity.create({
        name: activity.name,
        type: activity.activity_type_name,
        url: activity.url,
        description: activity.description,
        thumbnail: activity.thumbnail
      }, (err, activity) => {
        place.activitiesIDs.push(activity._id);
      });
    });

    setTimeout(() => {
      if (place.lat !== 0 && place.lat !== 0) {

        // const newPlace = new Place({
        //   name: place.name,
        //   city: place.city,
        //   lat: place.lat,
        //   lng: place.lon,
        //   activities: []
        // });
        //
        // newPlace.activities.push(place.activitiesIDs[0]);
        // newPlace.save((err, place) => {
        //   console.log(place);
        // })

        Place.create({
          name: place.name,
          city: place.city,
          lat: place.lat,
          lng: place.lon,
          activities: place.activitiesIDs
        }, (err, place) => {
          console.log(`${place.name} created succesfully`);
        });
      } else {
        place.activitiesIDs.forEach((activityID) => {
          Activity.findOneAndRemove( { _id: activityID }, (err) => {
            if (err) console.log(err);
          });
        });
      }
    }, 1000);
  });
})
.catch(function (err) {
  // API call failed...
  console.log(err);
});


// const course1 = new Course({
//   courseName: 'Royal Wimbledon',
//   lat: '51.4248172',
//   lng: '-0.2351502',
//   postcode: 'sw194uw'
// });
//
// const course2 = new Course({
//   courseName: 'House',
//   lat: '51.4499103',
//   lng: '-0.1740257',
//   postcode: 'sw183rr'
// });
//
// course2.save(function(err, project) {
//   if (err) return console.log(err);
//   console.log('Course saved! ', project);
// });

var optionsStation = {
  url: 'http://transportapi.com/v3/uk/train/stations/bbox.json?maxlat=70&maxlon=10&minlat=40&minlon=-2&rrp=1000&app_id=7f10862d&app_key=46ae5d0bfb36b34da957ff0581d619b6',
  json: true // Automatically parses the JSON string in the response
};



rp(optionsStation)
.then(function (data) {
  data.stations.forEach((station) => {
    Station.create({
      name: station.name,
      lat: station.latitude,
      lng: station.longitude,
      code: station.station_code
    }, (err, station) => {
      console.log(`${station.name} done`);
    });
  });
})
.catch(function (err) {
  // API call failed...
  console.log(err);
});
