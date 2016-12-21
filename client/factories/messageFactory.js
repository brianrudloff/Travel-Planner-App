angular
  .module('Codesmith.MessageFactory', [])
  .factory('MessageFactory', MessageFactory);


function MessageFactory($http) {
   return {fetch:
      function(){
        return  $http({
                method: 'GET',
                url: 'http://slack-server.elasticbeanstalk.com/messages'
                })
           },
          post: function(x, y){
           return  $http({
                    url: 'http://slack-server.elasticbeanstalk.com/messages',
                    method: "POST",
                    data: {created_by: x,
                            message: y}
                    }) 
            }
      }
}


