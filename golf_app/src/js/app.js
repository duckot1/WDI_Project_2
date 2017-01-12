const Golf = Golf || {};

Golf.init = function() {
  this.apiUrl = 'http://localhost:3000/api';
  this.$main  = $('main');

  $('.login').on('click', this.login);
  $('.register').on('click', this.register);
  this.$main.on('submit', 'form', this.formHandler);
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



const googleMap = googleMap || {};

googleMap.getCourses = function() {
  $.get('http://localhost:3000/api/courses').done(this.loopThroughCourses);
};

googleMap.loopThroughCourses = function (data) {
  $.each(data.data, (index, course) => {
    googleMap.createMarkerForCourse(course);
  });
};

googleMap.createMarkerForCourse = function(course) {
  let latlng = new google.maps.LatLng(course.lat, course.lng);
  let marker = new google.maps.Marker({
    position: latlng,
    map: this.map
  });

  marker.addListener('click', function() {
    const weather = $.get(`http://api.openweathermap.org/data/2.5/weather?q=${course.postcode},uk&appid=6908cd3df033fc1b49ab9e98719d00fa`).done( function() {
      console.log(weather.responseJSON);
      let contentString = `${weather.responseJSON.weather[0].description}`;
      console.log(contentString);
      let infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      infowindow.open(this.map, marker);
    });
  });
};

googleMap.mapSetup = function(){
  const canvas = document.getElementById('map-canvas');

  const mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(51.4248172,-0.2351502),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  this.map = new google.maps.Map(canvas, mapOptions);
  this.getCourses();
};

$(googleMap.mapSetup.bind(googleMap));
