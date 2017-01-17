const Golf = Golf || {};
const google = google || {};
const googleMap = googleMap || {};

Golf.init = function() {
  this.apiUrl = 'http://localhost:3000/api';
  this.$main  = $('main');
  $(googleMap.mapSetup.bind(googleMap));
  $('.login').on('click', this.login);
  $('.register').on('click', this.register);
  this.$main.on('submit', 'form', this.formHandler);
};

googleMap.mapSetup = function(){
  const canvas = document.getElementById('map-canvas');

  const mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(51.4248172,-0.2351502),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  googleMap.map = new google.maps.Map(canvas, mapOptions);
  $('.search').on('click', googleMap.search);
};

googleMap.search = function() {
  console.log('clicked');
  const dateTimeSelected = $('#datetimepicker1').find('input').val();
  const dateTimeNow = new Date().toLocaleString();
  console.log(dateTimeNow, dateTimeSelected);
  const unixTimeNow = Date.parse(dateTimeNow)/1000;
  const unixTimeSelected = Date.parse(dateTimeSelected)/1000;
  const unixTimeDifference = unixTimeSelected - unixTimeNow;
  const hours = Math.round(unixTimeDifference/10800);
  console.log(hours);
  googleMap.getPlaces(hours);
};

googleMap.getPlaces = function(hours) {

  // $.ajax({
  //   url: 'http://localhost:3000/api/places', // The URL to the API. You can get this in the API page of the API you intend to consume
  //   type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
  //   data: {}, // Additional parameters here
  //   dataType: 'json'
  //
  // }).done(data => {
  //   googleMap.loopThroughPlaces(data, hours);
  // }).fail(err => {
  //   console.log(err);
  // });
  var london = new google.maps.LatLng(51.4248172,-0.2351502);

  var service;

  var request = {
    location: london,
    radius: '500000',
    query: 'Manchester United',
    type: ['stadium']
  };

  service = new google.maps.places.PlacesService(googleMap.map);
  service.nearbySearch(request, callback);

  function callback(results, status, hours) {
    console.log(results);
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      var result = [];

      var toSearch = 'trafford';

      for (var i=0; i<results.length; i++) {
        if(results[i].name.toLowerCase().indexOf(toSearch)!=-1) {
          result.push(results[i]);

        }
      }
      console.log(result, '----------------------------------------------------------------------------------------');
      googleMap.loopThroughPlaces(result, hours);
    }
  }

};

googleMap.loopThroughPlaces = function (data, hours) {
  $.each(data, (index, place) => {

    googleMap.createMarkerForPlace(place, hours);

  });
};

googleMap.createMarkerForPlace = function(place, hours) {
  // console.log(hours);
  console.log(place);
  // $.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${place.lat}&lon=${place.lng}&appid=6908cd3df033fc1b49ab9e98719d00fa`).done((weather) => {
  //   const weatherSelected = weather.list[hours - 1];
  //   const latlng = new google.maps.LatLng(place.lat, place.lng);
  const marker = new google.maps.Marker({
    // position: latlng,
    // map: this.map
    position: place.geometry.location,
    map: googleMap.map,
    title: place.name
  });

  // googleMap.markerClickEvent(marker, place, weatherSelected);
  // $.each(weather.list, (index, time) => {
  //
  // });
  // });
};

googleMap.markerClickEvent = function (marker, place, weatherSelected) {
  marker.addListener('click', function(){
    const contentString = `${weatherSelected.weather[0].description}`;
    const infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    infowindow.open(this.map, marker);
  });
};


Golf.register = function(e) {
  e.preventDefault();
  Golf.$main.html(`<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
  <div class="modal-content">
  <div class="modal-header">
  <h5 class="modal-title" id="exampleModalLabel">Register</h5>
  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
  </div>
  <div class="modal-body">
  <form action="/register" method="POST">
  <div class="form-group">
  <label for="recipient-name" class="form-control-label">Username:</label>
  <input type="text" name="user[username]" class="form-control" id="username">
  </div>
  <div class="form-group">
  <label for="recipient-name" class="form-control-label">Email:</label>
  <input type="text" name="user[email]" class="form-control" id="email">
  </div>
  <div class="form-group">
  <label for="recipient-name" class="form-control-label">Password:</label>
  <input type="text" name="user[password]" class="form-control" id="password">
  </div>
  <div class="form-group">
  <label for="recipient-name" class="form-control-label">Confirm Password:</label>
  <input type="text" name="user[passwordConfirmation]" class="form-control" id="confirm-password">
  </div>
  <div class="modal-footer">
  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
  <button type="submit" class="btn btn-primary registerUser">Sign up!</button>
  </div>
  </form>
  </div>
  </div>
  </div>
  </div>
  `);
  $('.modal').modal('show');
  console.log('register clicked');
};

Golf.login = function(e) {
  e.preventDefault();
  Golf.$main.html(`<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
  <div class="modal-content">
  <div class="modal-header">
  <h5 class="modal-title" id="exampleModalLabel">Login</h5>
  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
  </div>
  <div class="modal-body">
  <form action="/login" method="POST">
  <div class="form-group">
  <label for="recipient-name" class="form-control-label">Email:</label>
  <input type="text" name="user[email]" class="form-control" id="email">
  </div>
  <div class="form-group">
  <label for="recipient-name" class="form-control-label">Password:</label>
  <input type="text" name="user[password]" class="form-control" id="password">
  </div>
  <div class="modal-footer">
  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
  <button type="submit" class="btn btn-primary loginUser">Log in!</button>
  </div>
  </form>
  </div>
  </div>
  </div>
  </div>
  `);
  $('.modal').modal('show');
  console.log('login clicked');
};

Golf.formHandler = function(e) {
  e.preventDefault();
  console.log($(this).serialize());
  const url    = `${Golf.apiUrl}${$(this).attr('action')}`;
  const method = $(this).attr('method');
  const data   = $(this).serialize();
  return $.ajax({
    url,
    method,
    data
  })
  .done(data => {
    console.log('yo', data);
  })
  .fail(data => {
    console.log('yup', data);
  });
};









$(Golf.init.bind(Golf));
