angular
  .module('Codesmith.HomeController', ['ngRoute', 'Codesmith.DataFactory'])
  .controller('HomeController', HomeController);

function HomeController($scope, DataFactory, $interval, $http) {

  $scope.cities = [];

// Load saved data
  getData();

  var geocoder = new google.maps.Geocoder();
  let cityLat = null;
  let cityLong = null;  
  let currLat = null;
  let currLong = null;

// Check if Geolocation is available in browser
  if ("geolocation" in navigator) {
    console.log('Geolocation is available');
  } else {
    console.log('geolocation is not available');
  }

// Find current Latitude and Longitute
  navigator.geolocation.getCurrentPosition(function(position) {
    currLat = position.coords.latitude;
    currLong = position.coords.longitude;
  });

// logic for adding a ciy
  $scope.addCity = function () {
    let cityName = $scope.inputCity;

    // find city's latitude and longitude and push info to array on callback
    geocoder.geocode( { 'address': cityName}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        cityLat = results[0].geometry.location.lat();
        cityLong = results[0].geometry.location.lng();
        $scope.cities.push({
        name: cityName,
        cityIndex: $scope.cities.length,
        attractions: [],
        latitude: cityLat,
        longitude: cityLong,
        });
      }
    });
    $scope.inputCity = '';
    console.log('Cities', $scope.cities);
  };

// logic for adding an attraction to a city
  $scope.addAttraction = function (cityIndex, attraction) {
    var pyrmont = new google.maps.LatLng($scope.cities[cityIndex].latitude, $scope.cities[cityIndex].longitude);

    var request = {
      location: pyrmont,
      radius: '500',
      query: attraction
    };

    // seach city for requested attraction info then push results to attraction array on callback
    service = new google.maps.places.PlacesService(document.createElement('div'));
    service.textSearch(request, callback);

    function callback(results, status) {
      let attractionObj = {
        name: results[0].name,
        address: results[0].formatted_address,
        rating: results[0].rating,
        icon: results[0].icon,
      };

      console.log('New Attraction Object', attractionObj)
      $scope.cities[cityIndex].attractions.push(attractionObj);
      $scope.inputAttraction = '';
    }
  };

// delete attraction from city
  $scope.deleteAttraction = function (cityIndex) {
    $scope.cities[cityIndex].attractions = [];
  };

// delete a city
  $scope.deleteCity = function (cityIndex) {
    $scope.cities.splice(cityIndex, 1);
  };

// save itinerary to database
  $scope.insertData = function() {
    console.log('Saving Itinerary');
    $http({
      url: '/save',
      method: 'POST',
      data: 'message=' + JSON.stringify($scope.cities),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    .then(function (httpResponse) {
      console.log(httpResponse);
    });
  };

// retrieve saved data
  function getData() {
    $http({
      url: '/save',
      method: 'GET',
    })
    .then(function(httpResponse) {
      console.log(httpResponse);
      $scope.cities = JSON.parse(httpResponse.data[httpResponse.data.length-1].plan);
    });
  }
}

