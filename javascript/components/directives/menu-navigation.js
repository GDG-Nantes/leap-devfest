components.directive('menuNavigation', ['$rootScope', '$http'
  ,function ($rootScope, $http) {
   var directiveDefinitionObject = {
    templateUrl: 'partials/components/menu-navigation.html',
    replace: true,
    restrict: 'E',
    require :'^leapController',
    scope: true,    
    link: function postLink($scope, iElement, iAttrs, leapCtrl) { 

      var ul = null,
        ulElements = null,
        liElements = null,
        liPositionMap = {},
        lastLI = null,
        limitLastLI = 0,
        menuDataText = {};

      $http({
          url: './assets/json/menu.json',
          method: "GET"
      }).success(function(data, status, headers, config) {
        

        // Création du niveau 0
        var ulNiv = document.createElement('ul');
        ulNiv.classList.add('ul_niv_0');
        iElement[0].appendChild(ulNiv);            

        for (var indexLevel0 = 0; indexLevel0 < data.length; indexLevel0++){
          var level0 = data[indexLevel0];
          menuDataText[level0.id] = level0.label;
          var liNiv0 = document.createElement('li');
          liNiv0.classList.add('li_niv_0');            
          liNiv0.classList.add('h-'+(data.length));
          liNiv0.id = level0.id;
          var contentParent = document.createElement('div');
          contentParent.classList.add('li_niv_0_content');
          var icon = document.createElement('div');
          icon.classList.add('icon');
          icon.classList.add('fa');
          icon.classList.add('fa-5x');
          if (Array.isArray(level0.icon)){
            for (var i = 0; i < level0.icon.length; i++){
              icon.classList.add(level0.icon[i]);
            }
          }else{
            icon.classList.add('fa-'+level0.icon);
          }
          contentParent.innerHTML = '<div class=\'title\'>'+ level0.label+'</div>';
          contentParent.appendChild(icon);
          liNiv0.appendChild(contentParent);
          ulNiv.appendChild(liNiv0);
          if (level0.submenus.length>0){
            var ulNiv1 = document.createElement('ul');
            ulNiv1.classList.add('ul_niv_1');
            liNiv0.appendChild(ulNiv1);
            for (var indexLevel1 = 0; indexLevel1 < level0.submenus.length; indexLevel1++){
              var level1 = level0.submenus[indexLevel1];
              menuDataText[level1.id] = level1.label;
              var liNiv1 = document.createElement('li');
              liNiv1.classList.add('li_niv_1');            
              liNiv1.classList.add('h-'+(level0.submenus.length));
              liNiv1.id = level1.id;
              liNiv1.innerHTML = level1.label;
              ulNiv1.appendChild(liNiv1);

              if (level1.submenus.length>0){
                var ulNiv2 = document.createElement('ul');
                ulNiv2.classList.add('ul_niv_2');
                liNiv1.appendChild(ulNiv2);
                for (var indexLevel2 = 0; indexLevel2 < level1.submenus.length; indexLevel2++){
                  var level2 = level1.submenus[indexLevel2];
                  menuDataText[level2.id] = level2.label;
                  var liNiv2 = document.createElement('li');
                  liNiv2.classList.add('li_niv_2');         
                  liNiv2.classList.add('h-'+(level1.submenus.length));   
                  liNiv2.id = level2.id;
                  liNiv2.innerHTML = level2.label;
                  var bgLastLi = document.createElement('div');
                  bgLastLi.classList.add('bg-last-li');
                  bgLastLi.classList.add('top-'+(level1.submenus.length));
                  liNiv2.appendChild(bgLastLi);
                  bgLastLi = document.createElement('div');
                  bgLastLi.classList.add('valid-div');
                  bgLastLi.classList.add('top-db-'+(level1.submenus.length));
                  liNiv2.appendChild(bgLastLi);
                  ulNiv2.appendChild(liNiv2);
                }
              }
            }
          }
        }
      
        liElements = document.querySelectorAll('#menu li');
        ulElements = document.querySelectorAll('#menu ul');
        ul = document.querySelector('#menu > ul');

      }).error(function(data, status, headers, config) {
        
        console.log('Error with Angular : '+data);

      });

      /*$scope.$watch('frame', function(frame, oldFrame){

        if (frame.hands && frame.hands.length > 0 && frame.hands[0].fingers.length > 0){
          var hand = frame.hands[0];
          var handPos = leapCtrl.leapToSceneHand(frame,hand.palmPosition,hand.palmNormal,hand.direction);
          var finger = hand.fingers[0];
          var fingerPos = leapCtrl.leapToSceneFinger(frame,finger.tipPosition);

          manageInteractions(fingerPos, ul, ulElements, liElements);

        }

      });*/


      function manageInteractions(fingerPos, ul, ulElements, liElements){
        var xLeap = fingerPos[0],
            yLeap = fingerPos[1];

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
                if (li.children.length > 0 && li.children[0].nodeName === 'DIV'){
                    if (li.children[0].classList.contains('bg-last-li')){
                        li.children[0].style.width = 0;
                        li.children[0].classList.remove('move');       
                        li.classList.add('last');
                    }         
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
            li.children[0].classList.add('move');
            li.classList.add('move');
            li.children[0].style.width = percent+'%';
            lastLI = li;
            limitLastLI = li.getClientRects()[0].right;            
        }

      }


      function getElementPosition(element) {
          if (element.id){
              if (liPositionMap[element.id]){
                  return liPositionMap[element.id];
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