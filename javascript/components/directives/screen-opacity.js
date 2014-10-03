components.directive('screenOpacity', ['$rootScope'
  ,function ($rootScope) {
   var directiveDefinitionObject = {
    templateUrl: 'partials/components/screen-opacity.html',
    replace: true,
    restrict: 'E',
    scope: false,    
    link: function postLink($scope, iElement, iAttrs) { 


       /*
        * Model
        */        


        /*$scope.$watch('frame', function(frame, oldFrame){
          var alpha_lumiere=0.5;
          if (frame.hands && frame.hands.length > 0 && frame.hands[0].fingers.length > 0){
            var hand = frame.hands[0];
            var handPos = leapCtrl.leapToSceneHand(frame,hand.palmPosition,hand.palmNormal,hand.direction);
            alpha_lumiere=0.5-handPos[2];


          }

          
          iElement.css('backgroundColor', 'rgba(0,0,0,'+(alpha_lumiere)+')');
        });*/


        
      }
  };
  return directiveDefinitionObject;
}]);