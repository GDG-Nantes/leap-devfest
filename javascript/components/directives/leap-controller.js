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
              if (!$scope.leapState.leapMotion){
                $scope.leapState.leapMotion = true;
              }
              $scope.leapState.fingerPos = screenPosition;
              $rootScope.$broadcast('leapState', $scope.leapState);
            }
          });

        }})
        .use('riggedHand',{scale : 0.75, positionScale:1.5})
        .use('screenPosition', {scale:0.75})
        .use('handEntry')
        .on('handFound', function(hand){
          $scope.$apply(function(){
              $scope.timeout = new Date().getTime();
              $scope.leapState.handActive = true;              
              $rootScope.$broadcast('leapState', $scope.leapState);
          });
          console.log('found Hand');
        })
        .on('handLost', function(hand){
          $scope.$apply(function(){
              $scope.timeout = new Date().getTime();
              $scope.leapState.handActive = false;
              $rootScope.$broadcast('leapState', $scope.leapState);
          });
          console.log('lost Hand');
        });
        
       
       // Fallback management for mouse
       document.addEventListener('mousemove', function(event){
          if ($scope.leapState.leapMotion){
            $scope.leapState.leapMotion = false;
          }
          $scope.leapState.fingerPos = [event.clientX, event.clientY];
          $rootScope.$broadcast('leapState', $scope.leapState);
       });
       document.addEventListener('mouseenter', function(event){
          $scope.$apply(function(){
              $scope.timeout = new Date().getTime();
              $scope.leapState.handActive = true;
              $rootScope.$broadcast('leapState', $scope.leapState);
          });
       });
       document.addEventListener('mouseleave', function(event){
          $scope.$apply(function(){
              $scope.timeout = new Date().getTime();
              $scope.leapState.handActive = false;
              $rootScope.$broadcast('leapState', $scope.leapState);
          });
       });
          
      }
  };
  return directiveDefinitionObject;
}]);