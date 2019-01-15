// navigator.geolocation.getCurrentPosition((pos) => {
//   var myLocation = document.getElementById('geolocation');
//   myLocation.innerHTML = 'You geolocation is: ' + pos.coords.latitude + ' and ' + pos.coords.longitude;
// }, (err) => {
//   window.alert('Unable to obtain coordinates. ' + err.message);
// })

function initMap() {
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var directionsService = new google.maps.DirectionsService();
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: { lat: 39.95, lng: -75.16 }
  });

  directionsDisplay.setMap(map);

  var searchRoute = document.getElementById('MapBtn');
  searchRoute.addEventListener('click', () => {
    searchMap(directionsDisplay, directionsService);
  });

  createMarkers(map);
}

function searchMap(directionsDisplay, directionsService) {
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;

  directionsService.route({
    origin: start,
    destination: end,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      console.log(response);
      directionsDisplay.setDirections(response);
    }
    else {
      window.alert('Directions search failed.' + status);
    }
  });
}

var addresses = document.getElementsByClassName('favorite-spot-addr');
[...addresses].forEach((address) => {
  address.addEventListener('click', (e) => {
    document.getElementById('end').value = e.target.textContent;
  });
});


var markers = [
  {
    position: {
      lat: 40.026539,
      lng: -75.225380
    },
    title: 'Lucky\'s Last Chance',
    label: 'A'
  },
  {
    position: {
      lat: 39.9748,
      lng: -75.1950
    },
    title: 'Philadelphia Zoo',
    label: 'B'
  }
];

function createMarkers(map) {
  markers.forEach((marker) => {
    var customMarker = new google.maps.Marker({
      position: marker.position,
      map: map,
      title: marker.title,
      label: marker.label
    });
  });
}