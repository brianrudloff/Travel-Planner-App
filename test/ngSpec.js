describe('Angular Spec', function() {
  var HomeController;
  var AboutController;
  var controller;

  describe('Controller', function() {

    beforeEach(function() {
      module('myApp');
    });

    beforeEach(inject(function ($controller) {
      controller = $controller;
    }));

    it('HomeController should have "unit" property', function() {
      var $scope = {};
      HomeController = controller('HomeController', { $scope: $scope });
      expect($scope.unit).to.be.a('string');
      expect($scope.unit).to.be.truthy;
    });

    it('HomeController should have "name" property', function() {
      var $scope = {};
      HomeController = controller('HomeController', { $scope: $scope });
      expect($scope.name).to.be.a('string');
      expect($scope.name).to.be.truthy;
    });

  });

  describe('Adding Views', function() {

    beforeEach(function() {
      module('Codesmith.AboutController');
    });

    beforeEach(inject(function ($controller) {
      controller = $controller;
    }));

    it('AboutController controller should be created', function() {
      var $scope = {};
      expect(controller).withArgs('AboutController', { $scope: $scope }).to.not.throwException();
    });

    it('AboutController should have "name" property', function() {
      var $scope = {};
      AboutController = controller('AboutController', { $scope: $scope });
      expect($scope.name).to.be.a('string');
      expect($scope.name).to.be.truthy;
    });

  });

  describe('UserFactory', function() {

    beforeEach(function() {
      module('myApp');
    });
    var MockUserFactory = { name: 'P!NK', age: 9001 };

    it('UserFactory should be defined', function() {
      expect(inject).withArgs(function($controller, UserFactory) {
        controller = $controller;
      }).to.not.throwException();
    });

    it('UserFactory should have name and age properties', function() {
      inject(function(UserFactory) {
        expect(UserFactory.name).to.be.a('string');
        expect(UserFactory.age).to.be.a('number');
      });
    });

    it('UserFactory should be injected into the HomeController', function() {
      var $scope = {};
      controller('HomeController', {
        $scope: $scope,
        UserFactory: MockUserFactory
      });
      expect($scope.name).to.eql('P!NK');
    });

    it('AboutController should have method that updates the UserFactory', function() {
      var $scope = {};
      controller('AboutController', {
        $scope: $scope,
        UserFactory: MockUserFactory
      });
      expect($scope.name).to.eql('P!NK');
      $scope.name = 'GR33N';
      $scope.age = 1337;
      $scope.save();
      expect(MockUserFactory.name).to.equal('GR33N');
      expect(MockUserFactory.age).to.equal(1337);
    });

 });

  describe('MessageFactory', function() {

    beforeEach(function() {
      module('myApp');
    });
    var TheMessageFactory;
    var promiseConstructor;


    it('MessageFactory should be defined', function(done) {
      expect(inject).withArgs(function($controller, MessageFactory, $http) {
        promiseConstructor = $http.get().constructor;
        controller = $controller;
        TheMessageFactory = MessageFactory;
        done();
      }).to.not.throwException();
    });

    it('MessageFactory should have "fetch" method and "post"', function() {
      expect(TheMessageFactory.fetch).to.be.a('function');
    });

    it('MessageFactory "fetch" method should get messages from the project Slack server and return a promise', function(done) {
      expect(TheMessageFactory.fetch().constructor).to.eql(promiseConstructor);
      done();
    });

    it('MessageFactory "fetch" method should post messages to the project Slack server and return a promise', function(done) {
      expect(TheMessageFactory.post().constructor).to.eql(promiseConstructor);
      done();
    });

  });

});
