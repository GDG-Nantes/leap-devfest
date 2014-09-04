components.directive('leapController', ['$rootScope'
  ,function ($rootScope) {
    var width;
    var height;
    var directiveDefinitionObject = {
      restrict: 'A',
      priority : 900,
      scope: false,  
      controller: function($scope){


        this.leapToSceneFinger = function(frame,leapPos){
          var iBox = frame.interactionBox;

          var left = iBox.center[0] - iBox.size[0]/2;
          var top = iBox.center[1] + iBox.size[1]/2;

          var x = leapPos[0] - left;
          var y = leapPos[1] - top;
          var alpha
          var z=leapPos[2]+200
          
          x /= iBox.size[0];
          y /= iBox.size[1];

          x *= width;
          y *= height;
          
          if(z>400){
              alpha=0
          }else if(z<=400 && z>300){
              alpha=0
          }else if(z<=300 && z>120){
              alpha=1-((z-120)/180)
          }else{
              alpha=1
          }
          return [ x , -y , alpha];       
        }

      this.leapToSceneHand = function(frame,leapPos,leapNormal,leapDirection){
          var iBox = frame.interactionBox;

          var left = iBox.center[0] - iBox.size[0]/2;
          var top = iBox.center[1] + iBox.size[1]/2;

          var x = leapPos[0] - left;
          var y = leapPos[1] - top;
          var alpha
          var z=leapPos[2]+200
          
          x /= iBox.size[0];
          y /= iBox.size[1];

          x *= width;
          y *= height;
          
          if(z>400){
              alpha=0
          }else if(z<=400 && z>300){
              alpha=0.5-((z-300)/200)
          }else{
              alpha=0.5
          }
          
          var hauteur=leapNormal[2]*10*20
          if(hauteur>0 && hauteur<10){
              hauteur=10
          }else if(hauteur<=0 && hauteur>-10){
              hauteur=-10
          }
          
          var largeur=leapDirection[0]*10*25
          if(largeur<0){
              largeur=largeur*-1
          }
          largeur=200-largeur
          
          var rotation=leapNormal[0]*10*360
          
          return [ x , -y , alpha, hauteur,largeur,rotation];
        }


      }, 
      link: function postLink($scope, iElement, iAttrs) { 

          width = document.body.clientWidth;
          height = document.body.clientHeight;

          $scope.frame = {};
          $scope.model ={
            menuActiv : false
          };

          var controller = new Leap.Controller();

          controller.on( 'connect' , function(){
              console.log( 'Successfully connected.' );
          });

          controller.on( 'deviceConnected' , function() {
              console.log('A Leap device has been connected.');
          });

          controller.on( 'deviceDisconnected' , function() {
              console.log( 'A Leap device has been disconnected.' );
          });

          controller.on( 'ready' , function(){   
              console.log("ready")
          });

          var compt = 0;

          controller.on( 'frame' , function(frame){
            compt++;
            if (compt < 6){
              return;
            } 
            compt = 0;
            $scope.$apply(function(){
              $scope.frame = frame;
            });
            
        });
          
        controller.connect();


          
        }
  };
  return directiveDefinitionObject;
}]);