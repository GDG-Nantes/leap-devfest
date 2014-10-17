/* global module1:false */
'use strict';

/**
 * Controleur d'exemple
 */
main.controller('MainCtrl', ['$scope', '$rootScope', '$location', '$interval','Request',
	function($scope, $rootScope,$location, $interval, Request) {

    $scope.hand = {};    
    $scope.model ={
      menuActiv : false,
      showLegende : true,
      timeoutPassed : true,
      mainScreen : true
    };
    $scope.leapState = {
    	fingerPos : [0,0,0],
    	handActive : false
    };
    $scope.timeout = -1;

    Request.callJson();

    $scope.$on('$routeChangeStart', function(context, next, current){
        $scope.model.mainScreen = !next || next.originalPath === '/home'; 
        $rootScope.$emit('changeRouteEvent');
        if ($scope.model.mainScreen){
            $location.search({});
        }
    });


    $interval(function(){
        if ((new Date().getTime() - $scope.timeout) > 500 * 1000 ){ //60 * 1000){
            console.log('passed');
            $scope.model.timeoutPassed = true;
            
            $location.path('home');
        }else if (!$scope.handActive){
            console.log('not passed');
            $scope.model.timeoutPassed = false;
        }else{
            console.log('not passed');
            $scope.model.timeoutPassed = false;
        }
    }, 1000);

    $rootScope.$on('itemSelectEvent', function selectElement(event, data){      
        console.log(data);  
        if (/speakers.*/.test(data.id)){
    		$location.path('speaker').search({id : data.id});
    	}else if (/confs.*/.test(data.id)){
    		$location.path('conf').search({id : data.id});
    	}else if (/stats.*/.test(data.id)){
    		$location.path('stats').search({id : data.id});
    	}
    });

}]);