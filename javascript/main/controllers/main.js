/* global module1:false */
'use strict';

/**
 * Controleur d'exemple
 */
main.controller('HomeCtrl', ['$scope', function($scope) {

    $scope.titre = 'Template applicatif AngularJS ! ';
    $scope.model.showVideo = false;

}]);