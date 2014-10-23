components.directive('chart', ['$rootScope'
  ,function ($rootScope) {
   var directiveDefinitionObject = {
    templateUrl: 'partials/components/chart.html',
    replace: true,
    restrict: 'E',
    scope: {
      width:"@width",
      height:"@height",
      idChart:"@id",
      data:"=data",
      type:"@type", 
      options:"=options",
      leapState : "=leapState"
    },    
    link: function postLink(scope, iElement, iAttrs) { 


      Chart.defaults.global.tooltipEvents = ["mousemove","click"];

      var ctx = iElement[0].getContext("2d");
      var myNewChart = null;

      if (scope.type === 'line'){
        myNewChart = new Chart(ctx).Line(scope.data, scope.options);                        
      }else if (scope.type === 'bar'){
        myNewChart = new Chart(ctx).Bar(scope.data, scope.options);                
      }else if (scope.type === 'radar'){
        myNewChart = new Chart(ctx).Radar(scope.data, scope.options);                
      }else if (scope.type === 'polar'){
        myNewChart = new Chart(ctx).Polar(scope.data, scope.options);                
      }else if (scope.type === 'pie'){
        myNewChart = new Chart(ctx).Doughnut(scope.data, scope.options);                
      }


      }
  };
  return directiveDefinitionObject;
}]);