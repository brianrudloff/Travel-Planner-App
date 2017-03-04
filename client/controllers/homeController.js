angular
  .module('Codesmith.HomeController', ['ngRoute', 'Codesmith.DataFactory'])
  .controller('HomeController', HomeController);

function HomeController($scope, DataFactory, $interval, $http) {

  let currLat = null;
  let currLong = null;

  if ("geolocation" in navigator) {
    console.log('Geolocation is available');
  } else {
    console.log('geolocation is not available')
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    currLat = position.coords.latitude;
    currLong = position.coords.longitude;
  });

var geocoder = new google.maps.Geocoder();
var address = "new york";

  function getLat (city) {
    geocoder.geocode( { 'address': city}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        return results[0].geometry.location.lat();
      } 
    }); 
  }

  function getLong (city) {
    geocoder.geocode( { 'address': city}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        return results[0].geometry.location.lng();
      } 
    }); 
  }

  // const service = new google.maps.places.PlacesService(map);
  // service.textSearch(request, callback);

  $scope.cities = [];

  getData();

  $scope.addCity = function () {
    let cityName = $scope.inputCity;
    let cityLat = getLat(cityName);
    let cityLong = getLong(cityName);
    console.log('cityLat', cityLat)
    console.log('citylong', cityLong)
    $scope.cities.push({
      name: cityName,
      cityIndex: $scope.cities.length,
      attractions: [],
    });
    $scope.inputCity = '';
    console.log('scope cities', $scope.cities);
  };

  $scope.addAttraction = function (cityIndex, attraction) {
    console.log('attractions', $scope.cities[cityIndex].attractions);
    $scope.cities[cityIndex].attractions.push(attraction);
    console.log('json', $scope.cities);
    $scope.inputAttraction = '';
  }

  $scope.deleteAttraction = function (cityIndex) {
    $scope.cities[cityIndex].attractions = [];
  }

  $scope.deleteCity = function (cityIndex) {
    $scope.cities.splice(cityIndex, 1);
  }

  $scope.insertData = function() {
    console.log('data inserting');
    $http({
      url: '/save',
      method: 'POST',
      data: 'message=' + JSON.stringify($scope.cities),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    .then(function (httpResponse) {
      console.log(httpResponse);
    })
  };

  function getData() {
    console.log('getting data');
    $http({
      url: '/save',
      method: 'GET',
    })
    .then(function(httpResponse) {
      console.log(httpResponse);
      $scope.cities = JSON.parse(httpResponse.data[httpResponse.data.length-1].plan);
      console.log($scope.cities);
    });
  }
}

