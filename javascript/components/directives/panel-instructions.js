components.directive('panelInstructions', ['$rootScope'
  ,function ($rootScope) {
   var directiveDefinitionObject = {
    templateUrl: 'partials/components/panel-instructions.html',
    replace: true,
    restrict: 'E',
    scope: false,    
    link: function postLink($scope, iElement, iAttrs) { 


      $scope.$watch('frame', function(frame, oldFrame){
      
      });

        
      }
  };
  return directiveDefinitionObject;
}]);