// script.js

     // also include ngRoute for all our routing needs
     var demoApp = angular.module('demoApp', ['ngRoute']);

    // configure our routes
    demoApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/user', {
                templateUrl : 'pages/user.html',
                controller  : 'userController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            });
        });

    // create the controller and inject Angular's $scope for home page
    demoApp.controller('mainController', function($scope, $location) {         
        $scope.message = "Search for a Github profile";
        $scope.changeRoute = function() {        
            $location.path('/user');
        }              
    });
    // create the controller and inject Angular's $scope for search page
    demoApp.controller('userController', function($scope, $http) {
        $scope.getGitInfo = function() {
            $scope.userNotFound = false;
            $scope.loaded = false;
            
        // request user github profile info to display
        $http.get("https://api.github.com/users/" + $scope.username).

        success(function (data) {
           $scope.user = data;
           $scope.loaded = true;        
       }).
        error(function () {
           $scope.userNotFound = true;
       });      
        // request user github repos to display
        $http.get("https://api.github.com/users/" + $scope.username + "/repos")
        .success(function (data) {
            $scope.repos = data;
            $scope.reposFound = data.length > 0;
        });
        
    }
});

    // create the controller and inject Angular's $scope for contact page
    demoApp.controller('contactController', function($scope, $http){
        $scope.message = "Let us know what you think!";
        $scope.success = false;
        $scope.error = false;
        //connect contact form to mandrill test mail api
        $scope.send = function () {
            
           
          var htmlBody = '<div>Name: ' + $scope.user.name + '</div>' +
          '<div>Email: ' + $scope.user.email + '</div>' +
          '<div>Message: ' + $scope.user.body + '</div>' +
          '<div>Date: ' + (new Date()).toString() + '</div>';
          
          $http({
              url: 'https://mandrillapp.com/api/1.0/',
              method: 'POST',
              key: '4HjE5eBC9AVo5J7D6fxYzw',
              message: {
                'html': htmlBody,
                'text': 'You got mail!',
                'from_email': $scope.user.email,
                'to': 'info@flammabletoys.com',        
                'subject': 'New Contact Form Submission'
            }
        }).
          success(function (message) {
            $scope.success = true;
            $scope.user = {};
        }).
          error(function (message) {
            $scope.error = true;
        });  
      }
  });