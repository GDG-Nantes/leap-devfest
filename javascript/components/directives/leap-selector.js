components.directive('leapSelector', ['$rootScope'
  ,function ($rootScope) {
   var directiveDefinitionObject = {
    templateUrl: 'partials/components/leap-selector.html',
    replace: true,
    restrict: 'E',
    scope: {
      leapState : '=leapState',
      id : "=id"
    },    
    link: function postLink($scope, iElement, iAttrs) { 


      var wrapper = iElement[0].querySelector('.leap-selector-wrapper');
      var bg = iElement[0].querySelector('.bg');

      var clientRectBg = bg.getBoundingClientRect();
      var cancelInterval = setTimeout(function() {
        clientRectBg = bg.getBoundingClientRect();
      }, 500);
      var pointer = document.querySelector('#pointerTest');
      var clientRectPointer = pointer.getClientRects()[0];
      var time = -1;

      console.log('Load LeapSelector ! ');
      console.log(iElement[0]);
      console.log(wrapper);
      console.log(bg);
      console.log(clientRectBg);

      //var unregister = $scope.$watch('leapState', function(leapState, oldleapState){
      var unregister = $rootScope.$on('leapState', function(evt,leapState){
    
        if (leapState.handActive){
          var screenPosition = leapState.fingerPos;
          var xCenter = screenPosition[0] + (clientRectPointer.width / 2);
          var yCenter = screenPosition[1] + (clientRectPointer.height / 2);
          if (xCenter >= clientRectBg.left && xCenter <= clientRectBg.right
            && yCenter >= clientRectBg.top && yCenter <= clientRectBg.bottom){
            wrapper.style.display = '';
            if (time === -1){
              time = new Date().getTime();
            }else if (new Date().getTime() - time > 2000){
              $rootScope.$broadcast('itemSelectEvent', {
                  id : $scope.id
                });
            }
          }
          
        }else{
          time = -1;
          wrapper.style.display = 'none';
        }

      },true);

      $rootScope.$on('changeRouteEvent', function(){
        unregister();
        cancelInterval();
      });

    }
  };
  return directiveDefinitionObject;
}]);