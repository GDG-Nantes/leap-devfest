components.directive('filAriane', ['$rootScope'
  ,function ($rootScope) {
   var directiveDefinitionObject = {
    templateUrl: 'partials/components/fil-ariane.html',
    replace: true,
    require :'^leapController',
    restrict: 'E',
    scope: false,    
    link: function postLink($scope, iElement, iAttrs, leapCtrl) { 

     
      $scope.$watch('frame', function(frame, oldFrame){
        
      });

      $rootScope.$on('itemSelectEvent', function(evt,data){
        iElement.html('');
        iElement.html(data.html);
      });


        
      }
  };
  return directiveDefinitionObject;
}]);