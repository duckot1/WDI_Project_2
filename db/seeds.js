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

var optionsTeam = {
  url: 'https://api.soccerama.pro/v1.2/teams/season/651?api_token=LVFcXAXpTmgBf4RsUnO9bEX3GwIP4lNjb7FVFI35rSn2ucoc7pGW4OShXbNu&include=venue',
  json: true // Automatically parses the JSON string in the response
};



// rp(optionsStation)
// .then(function (data) {
//   data.stations.forEach((station) => {
//     Station.create({
//       name: station.name,
//       lat: station.latitude,
//       lng: station.longitude,
//       code: station.station_code
//     }, (err, station) => {
//       console.log(`${station.name} done`);
//     });
//   });
// })
// .catch(function (err) {
//   // API call failed...
//   console.log(err);
// });

const Team = require('../models/team');

Team.collection.drop();

rp(optionsTeam)
 .then(function(data) {
   data.data.forEach((team) => {
     Team.create({
       name: team.name,
       logo: team.logo,
       city: team.venue.city,
       stadium: team.venue.name,
       id: team.id
     }, (err, team) => {
       console.log(`${team.name} saved`);
     });
   });
 })
 .catch(function (err) {
   // API call failed...
   console.log(err);
 });
