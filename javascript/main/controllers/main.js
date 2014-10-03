/* global module1:false */
'use strict';

/**
 * Controleur d'exemple
 */
main.controller('HomeCtrl', ['$scope', function($scope) {

    $scope.hand = {};    
    $scope.model ={
      menuActiv : false,
      showLegende : true
    };
    $scope.leapState = {
    	fingerPos : [0,0,0],
    	handActive : false
    };

}]);