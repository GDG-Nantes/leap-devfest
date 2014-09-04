components.directive('pointerLeap', ['$rootScope'
  ,function ($rootScope) {
   var directiveDefinitionObject = {
    templateUrl: 'partials/components/pointer-leap.html',
    replace: true,
    restrict: 'E',
    require :'^leapController',
    scope: true,    
    link: function postLink($scope, iElement, iAttrs, leapCtrl) { 

      var pointer = document.querySelector('#pointerTest');
      var pointerShadow = document.querySelector('#pointerShadow');

      $scope.$watch('frame', function(frame, oldFrame){

        if (frame.hands && frame.hands.length > 0 && frame.hands[0].fingers.length > 0){
          var hand = frame.hands[0];
          var handPos = leapCtrl.leapToSceneHand(frame,hand.palmPosition,hand.palmNormal,hand.direction);
          var finger = hand.fingers[0];
          var fingerPos = leapCtrl.leapToSceneFinger(frame,finger.tipPosition);

          
          pointer.style.display = '';
          pointer.style.left = fingerPos[0]+'px';
          pointer.style.top = fingerPos[1]+'px';
          pointer.style[Modernizr.prefixed('transform')] = 'translateZ('+((1-fingerPos[2])*500)+'px)';
          pointer.style['background-color'] = 'rgba(255,255,255,'+(0.7+((1-fingerPos[2])*0.3))+')';
          pointerShadow.style.display = '';
          pointerShadow.style.left = fingerPos[0]+'px';
          pointerShadow.style.top = fingerPos[1]+'px';

        }else{
            pointer.style.display = 'none';
            pointerShadow.style.display = 'none';      
        }

      });


        
      }
  };
  return directiveDefinitionObject;
}]);