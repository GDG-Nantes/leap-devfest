components.directive('menuNavigation', ['$rootScope', '$http','$q'
  ,function ($rootScope, $http,$q) {
   var directiveDefinitionObject = {
    templateUrl: 'partials/components/menu-navigation.html',
    replace: true,
    restrict: 'E',
    scope: false,    
    link: function postLink($scope, iElement, iAttrs) { 

      var ul = null,
        ulElements = null,
        liElements = null,
        liPositionMap = {},
        lastLI = null,
        limitLastLI = 0,
        menuDataText = {};

      

      $scope.$watch('menus', function(menus, oldMenus){
        if (!$scope.menus){
          return;
        }

        for (var indexLevel0 = 0; indexLevel0 < $scope.menus.length; indexLevel0++){
          var level0 = $scope.menus[indexLevel0];
          menuDataText[level0.id] = level0.label;
          if (level0.submenus.length>0){
            for (var indexLevel1 = 0; indexLevel1 < level0.submenus.length; indexLevel1++){
              var level1 = level0.submenus[indexLevel1];
              menuDataText[level1.id] = level1.label;
              if (level1.submenus.length>0){
                for (var indexLevel2 = 0; indexLevel2 < level1.submenus.length; indexLevel2++){
                  var level2 = level1.submenus[indexLevel2];
                  menuDataText[level2.id] = level2.label;
                }
              }
            }
          }
        }
      }, true);

      document.addEventListener('mousemove', function(event){
          //manageInteractions([event.clientX, event.clientY], ul, ulElements, liElements);
       });


      $rootScope.$on('leapState', function(evt, leapState){
      //$scope.$watch('leapState', function(leapState, oldLeapState){

        if (leapState.handActive){          
          manageInteractions(leapState.fingerPos, ul, ulElements, liElements);
        }

      },true);


      function manageInteractions(fingerPos, ul, ulElements, liElements){
        var xLeap = fingerPos[0],
            yLeap = fingerPos[1];

        if (!ul){
          liElements = document.querySelectorAll('#menu li');
          ulElements = document.querySelectorAll('#menu ul');
          ul = document.querySelector('#menu > ul');
        }

        // Initialisation du menu
        if (xLeap < 100){        
            if (!ul.classList.contains('activ')){
                ul.classList.add('activ');
                $scope.model.menuActiv = true;
            }
            manageLists(false);
        }else{
            manageLists(true);
        }

        function manageLists(removeUls){
            var liInterac = null;
            for (var i = 0; i < liElements.length; i++){
                var li = liElements[i];
                li.classList.remove('hover');
                li.classList.remove('last');
                li.classList.remove('move');
                if (li.children.length > 1 && li.querySelector('#'+li.id+' > .bg-last-li')){
                  var lastElt = li.querySelector('#'+li.id+' > .bg-last-li');                    
                  lastElt.style.width = 0;
                  lastElt.classList.remove('move');       
                  li.classList.add('last');      
                }
                li.style.background = '';
                if (li.parentNode.classList.contains('activ')){                
                    var pos = getElementPosition(li);
                    if(pos.x1 < xLeap && pos.x2 > xLeap 
                        && pos.y1 < yLeap && pos.y2 > yLeap){
                        liInterac = li;
                    }
                }
            }
            if (removeUls){            
                for (var i = 0; i < ulElements.length; i++){
                    ulElements[i].classList.remove('activ');
                }
            }

            if (liInterac){
                if (!liInterac.classList.contains('last')){
                    liInterac.classList.add('hover');
                }
                var ulElement = null;
                if (liInterac.children.length > 0){
                    for (var i = 0; i < liInterac.children.length; i++){
                        if (liInterac.children[i].nodeName === 'UL'){
                            ulElement = liInterac.children[i];
                            break;
                        }
                    }
                }

                // Si ulElement est null ça veut dire qu'on a pas trouvé de UL sous le li => dernier niveau
                if (ulElement){
                  lastLI = null;
                  limitLastLI = 0;
                  ulElement.classList.add('activ');
                }else{
                    manageLastLi(liInterac);
                }
                var parent = liInterac.parentNode;        
                while (parent.nodeName === 'UL'){
                    parent.classList.add('activ');
                    var liParent = parent.parentNode;
                    if (liParent.nodeName === 'LI'){
                        liParent.classList.add('hover');
                    }
                    parent = liParent.parentNode;
                }
            }else if (removeUls){              
              $scope.model.menuActiv = false;
              // On gère le cas de sélection 
              if (lastLI && xLeap > limitLastLI){
                var liParent = lastLI.parentNode.parentNode;
                var liRoot = liParent.parentNode.parentNode;            
                var html = liRoot.querySelector('div.title').textContent 
                    +'  <i class=\'fa fa-angle-right\'></i>  '
                    + menuDataText[liParent.id]
                    + '  <i class=\'fa fa-angle-right\'></i>  ' 
                    + '<div class=\'ariane-curent\'>' + lastLI.textContent +'</div>';
                $rootScope.$broadcast('itemSelectEvent', {
                  'html' : html,
                  id : lastLI.id
                });

                lastLI = null;
                limitLastLI = 0;
              }
            }
        }

        function manageLastLi(li){
            var pos = getElementPosition(li);
            var percent = Math.round(((xLeap - pos.x1) / (pos.x2 - pos.x1)) * 100);
            li.querySelector('.bg-last-li').classList.add('move');
            li.classList.add('move');
            li.querySelector('.bg-last-li').style.width = percent+'%';
            lastLI = li;
            limitLastLI = li.getClientRects()[0].right;            
        }

      }


      function getElementPosition(element) {
          if (element.id){
              if (liPositionMap[element.id]){
                  var pos = liPositionMap[element.id];
                  if (element.getAttribute('directLast') != null
                  && element.scrollWidth > 300){
                    // Si y a pas de hover c'est qu'on est sur le dernier élément
                    pos.x2 = pos.x1 + 800;
                  }else{
                    pos.x2 = pos.x1 + 300;
                  }
                  return pos;
              }else{
                  var rect = element.getClientRects()[0];
                  var elementX = rect.left - 10;
                  var elementY = rect.top;
                  var elementW = rect.left + 300 - 10;
                  var elementH = rect.bottom;
               
                  liPositionMap[element.id] = {x1: elementX, y1: elementY, x2: elementW, y2: elementH};    
                  return liPositionMap[element.id];
              }
          }
      }

        
    }
  };
  return directiveDefinitionObject;
}]);