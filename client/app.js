const app = angular
  .module('myApp', ['ngRoute','Codesmith.HomeController','Codesmith.AboutController', 'Codesmith.MessageFactory', 'Codesmith.DataFactory', 'Codesmith.UserFactory']);

app.config(configFunction);

function configFunction($routeProvider, $locationProvider) {

  $routeProvider
      .when('/', {
      templateUrl: './partials/home.html',
      controller: 'HomeController',
    })
      .when('/about', {
      templateUrl: './partials/about.html',
      controller: 'AboutController',
    })
      .when('/home', {
      templateUrl: './partials/home.html',
      controller: 'HomeController',
    })
}



