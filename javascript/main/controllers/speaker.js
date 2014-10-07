/* global module1:false */
'use strict';

/**
 * Controleur d'exemple
 */
main.controller('SpeakerCtrl', ['$scope', '$location', 
	function($scope, $location) {

    	
		if ($location.search().id){
			try{
				var regExp = /speakers\-(.*)/;
				$scope.speaker = $scope.speakerJson[regExp.exec($location.search().id)[1]];			
			}catch(e){

				$location.path('/home');
			}
			
		}else{
			$location.path('/home');
		}

}]);