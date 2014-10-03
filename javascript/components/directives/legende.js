components.directive('legende', ['$rootScope'
  ,function ($rootScope) {
   var directiveDefinitionObject = {
    templateUrl: 'partials/components/legende.html',
    replace: true,
    restrict: 'E',
    scope: false,    
    link: function postLink($scope, iElement, iAttrs) { 

     
      /*$scope.$watch('frame', function(frame, oldFrame){
        var showLegende = true;
        if (frame.hands && frame.hands.length > 0 && frame.hands[0].fingers.length > 0){
          var hand = frame.hands[0];
          var handPos = leapCtrl.leapToSceneHand(frame,hand.palmPosition,hand.palmNormal,hand.direction);
          showLegende = handPos[2] === 0;

        }

          
         $scope.showLegende = showLegende && !$scope.model.playVideo;
      });*/

     


        
      }
  };
  return directiveDefinitionObject;
}]);