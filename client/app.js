const app = angular
  .module('myApp', ['ngRoute','Codesmith.HomeController', 'Codesmith.DataFactory']);

app.config(configFunction);

function configFunction($routeProvider, $locationProvider) {

  $routeProvider
    .when('/', {
      templateUrl: './partials/home.html',
      controller: 'HomeController',
    })
}



