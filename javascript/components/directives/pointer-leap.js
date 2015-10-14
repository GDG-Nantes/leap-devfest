components.directive('pointerLeap', ['$rootScope'
  ,function ($rootScope) {
   var directiveDefinitionObject = {
    templateUrl: 'partials/components/pointer-leap.html',
    replace: true,
    restrict: 'E',
    scope: false,    
    link: function postLink($scope, iElement, iAttrs) { 

      var pointer = document.querySelector('#pointerTest');
      
      //$scope.$watch('leapState', function(leapState, oldleapState){
      $rootScope.$on('leapState', function(evt, leapState){
        if (leapState.handActive){
          var screenPosition = leapState.fingerPos;
          if (!pointer){
            pointer = document.querySelector('#pointerTest');            
          }
          pointer.style.left = screenPosition[0]+'px';
          pointer.style.top = screenPosition[1]+'px';
        }

      },true);
    }
  };
  return directiveDefinitionObject;
}]);