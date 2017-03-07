angular
  .module('Codesmith.HomeController', ['ngRoute', 'Codesmith.DataFactory'])
  .controller('HomeController', HomeController);

function HomeController($scope, DataFactory, $interval, $http) {
  var geocoder = new google.maps.Geocoder();
  let cityLat = null;
  let cityLong = null;  
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

  $scope.cities = [];

  getData();

  $scope.addCity = function () {
    let cityName = $scope.inputCity;
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
    console.log('scope cities', $scope.cities);
  };



  $scope.addAttraction = function (cityIndex, attraction) {
    
    var map;
    var service;
    var infowindow;


      var pyrmont = new google.maps.LatLng($scope.cities[cityIndex].latitude, $scope.cities[cityIndex].longitude);

      var request = {
        location: pyrmont,
        radius: '500',
        query: attraction
      };

      service = new google.maps.places.PlacesService(document.createElement('div'));
      service.textSearch(request, callback);

      function callback(results, status) {
        console.log('results', results)

           console.log('attractions', $scope.cities[cityIndex].attractions);
            let attractionObj = {
              name: results[0].name,
              address: results[0].formatted_address,
              rating: results[0].rating,
              icon: results[0].icon,
              open: results[0].opening_hours.open_now,
              
            }
            console.log('attraction obj', attractionObj)
            $scope.cities[cityIndex].attractions.push(attractionObj);
            console.log('json', $scope.cities);
            $scope.inputAttraction = '';
      }





    // console.log('attractions', $scope.cities[cityIndex].attractions);
    // $scope.cities[cityIndex].attractions.push(attraction);
    // console.log('json', $scope.cities);
    // $scope.inputAttraction = '';
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

