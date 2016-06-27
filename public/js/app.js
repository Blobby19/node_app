/**
 * Created by Luc on 22/06/2016.
 */

var app = angular.module('node_app', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider.when('/',
        {
            templateUrl: '/templates/dashboard.html',
            controller: 'MainController'
        })
        .when('/projets', {
            templateUrl: '/templates/projects.html',
            controller: 'ProjectController'
        })
        .when('/equipes', {
            templateUrl: '/templates/teams.html',
            controller: 'TeamController'
        })
        .otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(false);
}]);

app.controller('MainController', ['$scope', '$http', function($scope, $http){
    $scope.controller = 'MainController';
    $http.get('/api/projects')
        .success(function(projects){
            $scope.projects = projects;
        })
        .error(function(err){
            console.log(err);
        });
}]);

app.controller('ProjectController', ['$scope', '$http', function($scope, $http){
    $scope.controller = 'ProjectController';
    $scope.update = function(project){
        $http.post('/api/project', project)
            .success(function(data){
                console.log(data);
            });
    }
}]);

app.controller('TeamController', ['$scope', '$http', function($scope, $http){
    $scope.controller = 'TeamController';

    $http.get('/api/users')
        .success(function(data){
            $scope.users = data;
        });

    $scope.update = function(team){
        $http.post('/api/team')
            .success(function(data){
                console.log(data);
            });
    }
}]);