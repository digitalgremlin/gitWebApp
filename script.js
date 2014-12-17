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

    // create the controller and inject Angular's $scope
    demoApp.controller('mainController', function($scope, $location) {         
        $scope.message = "Search for a Github profile";
        $scope.changeRoute = function() {        
            $location.path('/user');
        }              
    });

    demoApp.controller('userController', function($scope, $http) {
        $scope.getGitInfo = function() {
            $scope.userNotFound = false;
            $scope.loaded = false;

            console.log("getGetInfo called");
            $http.get("https://api.github.com/users/" + $scope.username).

            success(function (data) {
               $scope.user = data;
               $scope.loaded = true;        
           }).
            error(function () {
               $scope.userNotFound = true;
           });      

            $http.get("https://api.github.com/users/" + $scope.username + "/repos")
            .success(function (data) {
                $scope.repos = data;
                $scope.reposFound = data.length > 0;
            });

        }
    });

    demoApp.controller('contactController', function($scope, $http){
        $scope.message = "Let us know what you think!";
        $scope.success = false;
        $scope.error = false;
        $scope.send = function () {
            $scope.success = true; 
        }
    });