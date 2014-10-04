/* global module1:false */
'use strict';

/**
 * Controleur d'exemple
 */
main.controller('MainCtrl', ['$scope', '$rootScope', '$location',
	function($scope, $rootScope,$location) {

    $scope.hand = {};    
    $scope.model ={
      menuActiv : false,
      showLegende : true
    };
    $scope.leapState = {
    	fingerPos : [0,0,0],
    	handActive : false
    };

    $rootScope.$on('itemSelectEvent', function selectElement(event, data){
    	if (/speakers.*/.test(data.id)){
    		$location.path('speaker').search({id : data.id});
    	}else if (/confs.*/.test(data.id)){
    		$location.path('conf').search({id : data.id});
    	}else if (/stats.*/.test(data.id)){
    		$location.path('stats').search({id : data.id});
    	}
    });

}]);