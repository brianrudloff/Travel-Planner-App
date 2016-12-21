angular
  .module('Codesmith.UserFactory', [])
  .factory('UserFactory', UserFactory);

  function UserFactory () {
      return {
          name: 'Tupac',
          age: 25,
      }
  }





