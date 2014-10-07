main.factory('Request', ['$q', '$http', '$rootScope',
	function($q, $http, $rootScope){

	
	function callJson(){
		$q.all([$http.get('./assets/json/speakers.json')
        ,$http.get('./assets/json/sessions.json')
        ,$http.get('./assets/json/hours.json')])
      .then(function success(results){
        var speakerJson = results[0].data;
        var sessionsJson = results[1].data;
        var hoursJson = results[2].data;

        var speakerMenu = {
          id:'speakers',
          label : 'Speakers',
          icon : 'users',
          submenus : [{
            id:'speakers-mobile',
            label:'Mobile',
            submenus : []
          },
          {
            id:'speakers-web',
            label:'Web',
            submenus : []
          },
          {
            id:'speakers-cloud',
            label:'Cloud',
            submenus : []
          },
          {
            id:'speakers-discovery',
            label:'Découverte',
            submenus : []
          }]
          };

        var sessionsMenu = {
          id:'confs',
          label : 'Conférences',
          icon : 'bullhorn',
          submenus : [{
            id:'confs-mobile',
            label:'Mobile',
            submenus : []
          },
          {
            id:'confs-web',
            label:'Web',
            submenus : []
          },
          {
            id:'confs-cloud',
            label:'Cloud',
            submenus : []
          },
          {
            id:'confs-discovery',
            label:'Découverte',
            submenus : []
          }]
          };

        var statsMenu = {
          id:'stats',
          label : 'Statistiques',
          icon : 'pie-chart',
          submenus : [{
            id : "stats-2013",
            label : "Statistiques 2013",
            submenus: [{
              id: "stats-2013-global", 
              label : "Stats 2013"
            }]
          },
          {
            id : "stats-2014",
            label : "Statistiques 2014",
            submenus: [
            {
              "id" : "stats-2014-cfp",
              "label" : "CFP"
            },
            {
              "id" : "stats-2014-participants",
              "label" : "Participants"
            }
            ]
          }]
          };

        // Creation du menu
        var keysSpeakers = Object.keys(speakerJson);        
        for (var i=0; i < keysSpeakers.length; i++){
          var speakerId = keysSpeakers[i];
          var speaker = speakerJson[speakerId];
          var index = 0;
          if (speaker.type === 'mobile'){
            index = 0;
          }else if (speaker.type === 'web'){
            index = 1;
          }else if (speaker.type === 'cloud'){
            index = 2;
          }else{
            index = 3;
          }
          speaker.id = 'speakers-'+speakerId;
          speaker.label = speaker.name;
          speaker.photo = 'img-'+speakerId;
          if (speaker.show){
            speakerMenu.submenus[index].submenus.push(speaker);
          }
        }

        for (var i=0; i < sessionsJson.sessions.length; i++){
          var session = sessionsJson.sessions[i];
          var index = -1;
          if (session.type === 'mobile'){
            index = 0;
          }else if (session.type === 'web'){
            index = 1;
          }else if (session.type === 'cloud'){
            index = 2;
          }else if (session.type === 'discovery'){
            index = 3;
          }
          if (index != -1){            
            session.label = session.title;
            session.hour = hoursJson[session.hour];
            for (var indexSpeaker = 0; indexSpeaker < session.speakers.length; indexSpeaker++){
            	var speaker = speakerJson[session.speakers[indexSpeaker]];
            	speaker.session = session;
            }
            sessionsMenu.submenus[index].submenus.push(session);
          }
        }



        $rootScope.menus = [speakerMenu, sessionsMenu, statsMenu];
        $rootScope.speakerJson = speakerJson;
        $rootScope.sessionsJson = sessionsJson;
        $rootScope.hoursJson = hoursJson;

         

      }, function error(errors){

      });	
	};

	return {
		callJson : callJson
	}
}])