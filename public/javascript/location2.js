"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function initMap() {
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var directionsService = new google.maps.DirectionsService();
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {
      lat: 39.95,
      lng: -75.16
    }
  });
  directionsDisplay.setMap(map);
  var searchRoute = document.getElementById('MapBtn');
  searchRoute.addEventListener('click', function () {
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
  }, function (response, status) {
    if (status === 'OK') {
      console.log(response);
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions search failed.' + status);
    }
  });
}

var addresses = document.getElementsByClassName('favorite-spot-addr');

_toConsumableArray(addresses).forEach(function (address) {
  address.addEventListener('click', function (e) {
    document.getElementById('end').value = e.target.textContent;
  });
});

function createMarkers(map) {
  var labelLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var infoWindow = new google.maps.InfoWindow({
    maxWidth: 200
  });
  locationData.forEach(function (location) {
    geocodeAddress(location.address).then(function (result) {
      var customMarker = new google.maps.Marker({
        position: result,
        map: map,
        title: location.name,
        label: labelLetters[(location.id - 1) % labelLetters.length]
      });
      customMarker.addListener('click', function () {
        infoWindow.close(); // infoWindow.setContent(`<div id="info-window-content"><h4 id="firstHeading" class="firstHeading">${ location.name }</h4><div id="bodyContent"><p id="info-window-blurb">${ location.blurb }</p><img src=${ location.image }></img></div></div>`);

        infoWindow.setContent("<div id=\"info-window-content\"><h4 id=\"firstHeading\" class=\"firstHeading\">".concat(location.name, "</h4><div id=\"bodyContent\"><p id=\"info-window-blurb\">").concat(location.blurb, "</p></div></div>"));
        infoWindow.open(map, customMarker);
      });
    })["catch"](function (error) {
      alert('Something went wrong... ' + error);
    });
  });
}

function geocodeAddress(address) {
  var geocoder = new google.maps.Geocoder();
  return new Promise(function (resolve, reject) {
    geocoder.geocode({
      'address': address
    }, function (results, status) {
      if (status === 'OK') {
        resolve({
          'lat': results[0].geometry.location.lat(),
          'lng': results[0].geometry.location.lng()
        });
      } else {
        reject('Something went wrong with the geocode: ' + status);
      }
    });
  });
}
