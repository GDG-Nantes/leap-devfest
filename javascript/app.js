'use strict';

/**
 * L'application
 */
angular.module('devfestleap', ['devfestleap.main', 'devfestleap.components', 'ngRoute'])

/**
 * Definition des routes applicatives
 */
.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/home', { controller : 'HomeCtrl', templateUrl : 'partials/main/main.html' })
    .otherwise(       { redirectTo : '/home' });
}]);