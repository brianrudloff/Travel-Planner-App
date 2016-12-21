// angular
//   .module('Codesmith.DataFactory', [])
//   .factory('DataFactory', DataFactory);

//   function DataFactory ($http){
//       return {
//           postRequest: function(city) {
//               $http.post('/', {city: city})
              
//             }
//       }
//   }
  


 angular
  .module('Codesmith.DataFactory', [])
  .factory('DataFactory', function($http) { 
    return {
          postRequest: function(plan) {$http.post('http://localhost:3000/', {data: plan}); console.log(plan)},
          //getRequest: function(){return $http.get('/sample')}
          
    }      
});

 
 

  

  