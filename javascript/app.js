'use strict';

/**
 * L'application
 */
angular.module('devfestleap', ['devfestleap.main', 'devfestleap.components', 'ngRoute', 'ngSanitize'])

/**
 * Definition des routes applicatives
 */
.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/home', { controller : 'HomeCtrl', templateUrl : 'partials/main/home.html' })
    .when('/speaker', { controller : 'SpeakerCtrl', templateUrl : 'partials/main/speaker.html' })
    .when('/conf', { controller : 'ConfCtrl', templateUrl : 'partials/main/conf.html' })
    .when('/stats', { controller : 'StatsCtrl', templateUrl : 'partials/main/stats.html' })
    .otherwise(       { redirectTo : '/home' });
}]);