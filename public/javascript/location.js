function initMap() {
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var directionsService = new google.maps.DirectionsService();
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
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

function createMarkers(map) {
  var labelLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let infoWindow = new google.maps.InfoWindow(); 
  locationData.forEach((location) => {
    geocodeAddress(location.address)
    .then((result) => {
      var customMarker = new google.maps.Marker({
        position: result,
        map: map,
        title: location.name,
        label: labelLetters[(location.id - 1) % labelLetters.length]
      }); 

      customMarker.addListener('click', () => {
        infoWindow.close();
        infoWindow.setContent(location.blurb);
        infoWindow.open(map, customMarker);
      });
    })
    .catch((error) => {
      alert('Something went wrong... ' + error);
    });
  });
}

function geocodeAddress(address) {
  var geocoder = new google.maps.Geocoder()
  return new Promise((resolve, reject) => {
    geocoder.geocode({
      'address': address
    }, (results, status) => {
      if (status === 'OK') {
        resolve({ 
          'lat': results[0].geometry.location.lat(),
          'lng': results[0].geometry.location.lng()
         });
      }
      else {
        reject('Something went wrong with the geocode: ' + status);
      }
    });
  });
}

let infoWindowTemplate = '<div id="info-window-content"><h1 id="firstHeading" class="firstHeading">Lucky&#39;s Last Chance</h1><div id="bodyContent"><p>Amazing burgers, had our first date there!!</p><img src="/images/kissing.jpg"></img></div></div>'