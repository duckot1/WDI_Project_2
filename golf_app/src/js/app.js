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
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "administrative.neighborhood",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dadada"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#c9c9c9"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      }
    ]
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
  const search  = $('.team').val();
  googleMap.findTeam(hours, search);
};

// string.slice(0, string.indexOf("'"));



googleMap.findTeam = function(hours, search) {
  console.log(hours);
  $.get('http://localhost:3000/api/teams').done((teams) => {
    console.log(teams.teams[0].name);
    var team = [];
    for (var i=0; i<teams.teams.length; i++) {
      if(teams.teams[i].name.toLowerCase().indexOf(search)!=-1) {
        team.push(teams.teams[i]);
      }
    }

    team = team[4];
    console.log(team, 'diiiiiid it');
    googleMap.convertCity(hours, team);


  });






};

googleMap.convertCity = function(hours, team){
  $.ajax({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${team.city}&key=AIzaSyCbFPmuCf0KD-MHuJ9yzpEvLc450RxCt0g`, // The URL to the API. You can get this in the API page of the API you intend to consume
    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    data: {}, // Additional parameters here
    dataType: 'json'

  }).done(data => {
    console.log(data);

    const latOne = data.results[0].geometry.location.lat;
    const lng = data.results[0].geometry.location.lng;



    const locationOne = new google.maps.LatLng(latOne,lng);


    var service;

    var requestOne = {
      location: locationOne,
      radius: '100000',
      keyword: team.name,
      type: ['stadium']
    };

    service = new google.maps.places.PlacesService(googleMap.map);
    service.nearbySearch(requestOne, callback);


    function callback(results, status) {
      console.log(results);
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        var result = [];

        var toSearch = team.stadium.substring(0, 4).toLowerCase();
        console.log(toSearch);

        for (var i=0; i<results.length; i++) {
          if(results[i].name.toLowerCase().indexOf(toSearch)!=-1) {
            result.push(results[i]);

          }
        }
        googleMap.loopThroughPlaces(result, hours, team);
      }
    }


  }).fail(err => {
    console.log(err);
  });
};

googleMap.loopThroughPlaces = function (data, hours, team) {
  $.each(data, (index, place) => {
    googleMap.createMarkerForPlace(place, hours, team);

  });
};

googleMap.createMarkerForPlace = function(place, hours, team) {
  // console.log(hours);
  $.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${place.geometry.location.lat()}&lon=${place.geometry.location.lng()}&appid=6908cd3df033fc1b49ab9e98719d00fa`).done((weather) => {
    console.log(weather, hours);
    const weatherSelected = weather.list[hours - 1];


    const marker = new google.maps.Marker({
      position: place.geometry.location,
      map: googleMap.map,
      title: place.name,
      icon: team.logo
    });
    googleMap.map.setZoom(12);
    googleMap.map.panTo(marker.position);
    googleMap.markerClickEvent(marker, place, weatherSelected, team);
  });

  //
  // $.each(weather.list, (index, time) => {
  //
  // });
  // });
};

googleMap.markerClickEvent = function (marker, place, weatherSelected, team) {
  marker.addListener('click', function(){
    const myTeamId = $('.myTeam option:selected').val();
    const myTeam = $('.myTeam option:selected').text();    $.get(`https://api.soccerama.pro/v1.2/head2head/${team.id}/${myTeamId}?api_token=LVFcXAXpTmgBf4RsUnO9bEX3GwIP4lNjb7FVFI35rSn2ucoc7pGW4OShXbNu`).done((head) => {
      var homeTeam;
      var awayTeam;
      if (head.data[0].home_team_id === team.id) {
        homeTeam = team.name;
        awayTeam = myTeam;
      } else {
        homeTeam = myTeam;
        awayTeam = team.name;
      }
      console.log(head.data[0]);
      const contentString = `<div>
                              <h2>MATCHDAY INFO</h2>
                              <h3>Weather</h3>
                              <img src="http://openweathermap.org/img/w/${weatherSelected.weather[0].icon}.png">
                              <p>${weatherSelected.weather[0].description}</p>
                              <h3>Last Fixture</h3>
                              <p>${homeTeam} ${head.data[0].home_score} - ${head.data[0].away_score} ${awayTeam}</p>


                            </div>`;
      const infowindow = new google.maps.InfoWindow({
        content: contentString
      });
      infowindow.open(this.map, marker);
    });


  });
};






$(Golf.init.bind(Golf));
