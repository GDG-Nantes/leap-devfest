components.directive('content', ['$rootScope', '$timeout'
  ,function ($rootScope, $timeout) {
   var directiveDefinitionObject = {
    templateUrl: 'partials/components/content.html',
    replace: true,
    restrict: 'E',
    scope: false,    
    link: function postLink($scope, iElement, iAttrs) { 

     var timestamp = 0;
     

     $scope.$watch('model.menuActiv', function(){
      if ($scope.model.menuActiv){        
          }
     });

     $scope.$watch('frame', function(frame, oldFrame){
        var showLegende = true;
        if (frame.hands && frame.hands.length === 1 && frame.hands[0].fingers.length === 5 && !video.paused){
          
        }

          
         $scope.showLegende = showLegende;
      });

      $rootScope.$on('itemSelectEvent', function(evt,data){
        if (timestamp === 0){
          timestamp = new Date().getTime();                  
        }
      });



        
      }
  };
  return directiveDefinitionObject;
}]);