angular
  .module('Codesmith.HomeController', ['ngRoute', 'Codesmith.DataFactory'])
  .controller('HomeController', HomeController);

  function HomeController($scope, DataFactory, $interval, $http) {
    $scope.cities = [];

  getData();

  $scope.addCity = function () {
    let cityName = $scope.inputCity;
    $scope.cities.push({
      name: cityName,
      cityIndex: $scope.cities.length,
      attractions: []
    });
    $scope.inputCity = '';
    console.log($scope.cities);
  };

  $scope.addAttraction = function (cityIndex, attraction) {
    console.log($scope.cities[cityIndex].attractions);
    $scope.cities[cityIndex].attractions.push(attraction);
    console.log("json", $scope.cities);
    $scope.inputAttraction = '';
  }

  $scope.deleteAttraction = function (cityIndex) {
    $scope.cities[cityIndex].attractions = [];
  }

  $scope.deleteCity = function (cityIndex) {
    $scope.cities.splice(cityIndex, 1);
  }

  $scope.insertData = function(){
       console.log('data inserting')
       $http({
         url: '/save',
         method: 'POST',
         data: 'message=' + JSON.stringify($scope.cities),
         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
       })
       .then(function(httpResponse){
         console.log(httpResponse);
       })
    };

    function getData(){
       console.log('getting data')
       $http({
         url: '/save',
         method: 'GET',
       })
       .then(function(httpResponse){
         console.log(httpResponse)
        $scope.cities = JSON.parse(httpResponse.data[httpResponse.data.length-1].plan);
         console.log($scope.cities)
       })
    };
}

