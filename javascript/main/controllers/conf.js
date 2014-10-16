/* global module1:false */
'use strict';

/**
 * Controleur d'exemple
 */
main.controller('ConfCtrl', ['$scope', '$location', 
	function($scope,$location) {

    if ($location.search().id){
			try{
				var regExp = /confs\-(.*)/;
				$scope.conf = $scope.sessionsJson[regExp.exec($location.search().id)[1]];		
				$scope.conf.fa = $scope.conf.type === 'web' ? 'globe' : 
							$scope.conf.type === 'mobile' ? 'mobile' : 
							$scope.conf.type === 'cloud' ?  'cloud' : 'rocket';
			}catch(e){				
				$location.path('/home');
			}
			
		}else{
			
			$location.path('/home');
		}

}]);