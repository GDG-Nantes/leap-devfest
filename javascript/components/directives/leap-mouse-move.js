components.directive('leapMouseMove', ['$rootScope'
  ,function ($rootScope) {
   var directiveDefinitionObject = {
    restrict: 'A',
    scope: false, 
    link: function postLink($scope, iElement, iAttrs) { 

      var element = iElement[0];
      var boundingRect = element.getBoundingClientRect();
      console.log('Id : '+element.id);
      console.log(boundingRect);

      //var unregister = $scope.$watch('leapState', function(leapState, oldleapState){
      var unregister = $rootScope.$on('leapState', function(evt, leapState){
    
        if (leapState.handActive && leapState.leapMotion){
          var screenPosition = leapState.fingerPos;
          dispatchEvent(element, 
            mouseEvent('mousemove', 
              screenPosition[0], // Screen X
              screenPosition[1], // Screen Y
              screenPosition[0], // Client X
              screenPosition[1]  // Client Y
              ))
          ;
          
        }

      },true);


      function mouseEvent(type, sx, sy, cx, cy) {
        var evt;
        var e = {
          bubbles: true,
          cancelable: (type != "mousemove"),
          view: window,
          detail: 0,
          screenX: sx, 
          screenY: sy,
          clientX: cx, 
          clientY: cy,
          ctrlKey: false,
          altKey: false,
          shiftKey: false,
          metaKey: false,
          button: 0,
          relatedTarget: undefined
        };
        if (typeof( document.createEvent ) == "function") {
          evt = document.createEvent("MouseEvents");
          evt.initMouseEvent(type, 
            e.bubbles, e.cancelable, e.view, e.detail,
            e.screenX, e.screenY, e.clientX, e.clientY,
            e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
            e.button, document.body.parentNode);
        } else if (document.createEventObject) {
          evt = document.createEventObject();
          for (prop in e) {
          evt[prop] = e[prop];
        }
          evt.button = { 0:1, 1:4, 2:2 }[evt.button] || evt.button;
        }
        return evt;
      }
      function dispatchEvent (el, evt) {
        if (el.dispatchEvent) {
          el.dispatchEvent(evt);
        } else if (el.fireEvent) {
          el.fireEvent('on' + type, evt);
        }
        return evt;
      }

      $rootScope.$on('changeRouteEvent', function(){
        unregister();
      });

    }
  };
  return directiveDefinitionObject;
}]);