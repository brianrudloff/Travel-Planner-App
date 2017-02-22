
 angular
  .module('Codesmith.DataFactory', [])
  .factory('DataFactory', function($http) { 
    return {
      postRequest: function(plan) {$http.post('http://localhost:3000/', {data: plan}); console.log(plan)},
    }
});

