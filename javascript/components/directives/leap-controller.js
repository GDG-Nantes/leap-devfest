components.directive('leapController', ['$rootScope'
  ,function ($rootScope) {
   var directiveDefinitionObject = {
      restrict: 'A',
      scope: false, 
      link: function postLink($scope, iElement, iAttrs) { 

        var pointer = document.querySelector('#pointerTest');

        Leap.loop({hand:function(hand){
          $scope.$apply(function(){
            if (hand.fingers){
              var finger = null;
              for (var i =0; i < hand.fingers.length;i++){
                if (hand.fingers[i].type === 1){
                  finger = hand.fingers[i];
                  break;
                }
              }
              if (!finger){
                return;
              }
              var screenPosition = finger.screenPosition(finger.btipPosition);            
              screenPosition[1] = screenPosition[1]+400;
              $scope.leapState.fingerPos = screenPosition;
            }
          });

        }})
        .use('riggedHand',{scale : 0.75, positionScale:1.5})
        .use('screenPosition', {scale:0.75})
        .use('handEntry')
        .on('handFound', function(hand){
          $scope.$apply(function(){
              $scope.leapState.handActive = true;
          });
          console.log('found Hand');
        })
        .on('handLost', function(hand){
          $scope.$apply(function(){
              $scope.leapState.handActive = false;
          });
          console.log('lost Hand');
        });
        
       
          
      }
  };
  return directiveDefinitionObject;
}]);