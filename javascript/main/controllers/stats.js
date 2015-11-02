/* global module1:false */
'use strict';

/**
 * Controleur d'exemple
 */
main.controller('StatsCtrl', ['$scope', function($scope) {

    //http://www.chartjs.org/

    $scope.dataNbParticipants = {
	    labels: ["2012", "2013", "2014", "2015"],
	    datasets: [
	        {
	            label: "Nombre d'inscrits'",
	            fillColor: "rgba(218,72,60,0.5)",
	            strokeColor: "rgba(218,72,60,0.8)",
	            highlightFill: "rgba(218,72,60,0.75)",
	            highlightStroke: "rgba(218,72,60,1)",
	            data: [157, 220, 487, 510]
	        },
	        {
	            label: "Nombre d'hommes",
	            fillColor: "rgba(99,136,197,0.5)",
	            strokeColor: "rgba(99,136,197,0.8)",
	            highlightFill: "rgba(99,136,197,0.75)",
	            highlightStroke: "rgba(99,136,197,1)",
	            data: [148, 204, 450, 478]
	        },
	        {
	            label: "Nombre de femmes",
	            fillColor: "rgba(247,198,61,0.5)",
	            strokeColor: "rgba(247,198,61,0.8)",
	            highlightFill: "rgba(247,198,61,0.75)",
	            highlightStroke: "rgba(247,198,61,1)",
	            data: [8, 16, 33, 32]
	        }
	    ]
	};
	$scope.optionsNbParticipants = {
	    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
	    scaleBeginAtZero : true,

	    //Boolean - Whether grid lines are shown across the chart
	    scaleShowGridLines : true,

	    //String - Colour of the grid lines
	    scaleGridLineColor : "rgba(0,0,0,.05)",

	    //Number - Width of the grid lines
	    scaleGridLineWidth : 1,

	    //Boolean - If there is a stroke on each bar
	    barShowStroke : true,

	    //Number - Pixel width of the bar stroke
	    barStrokeWidth : 2,

	    //Number - Spacing between each of the X value sets
	    barValueSpacing : 5,

	    //Number - Spacing between data sets within X values
	    barDatasetSpacing : 1,

        // Array - Array of string names to attach tooltip events
        tooltipEvents: ["mousemove", "touchstart", "touchmove"],

	    //String - A legend template
	    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

	};

	
    $scope.dataPieRegion2014 = [
    {
        value: 408,
        color:"#da483c",
        highlight: "#da5d53",
        label: "Loire Atlantique"
    },
    {
        value: 8,
        color: "#6388c5",
        highlight: "#7694c5",
        label: "Vendée"
    },
    {
        value: 8,
        color: "#0c9a54",
        highlight: "#1c9a5c",
        label: "Poitou Charentes"
    },
    {
        value: 15,
        color: "#f7c63d",
        highlight: "#f7cd56",
        label: "Bretagne"
    },
    {
        value: 13,
        color: "#da483c",
        highlight: "#da5d53",
        label: "Maine et Loire"
    },
    {
        value: 4,
        color: "#6388c5",
        highlight: "#7694c5",
        label: "Indre et Loire"
    },
    {
        value: 18,
        color: "#0c9a54",
        highlight: "#1c9a5c",
        label: "Région Parisienne"
    },
    {
        value: 1,
        color: "#f7c63d",
        highlight: "#f7cd56",
        label: "Haute Vienne"
    },
    {
        value: 1,
        color: "#da483c",
        highlight: "#da5d53",
        label: "Deux Sèvres"
    },
    {
        value: 1,
        color: "#6388c5",
        highlight: "#7694c5",
        label: "Gironde"
    },
    {
        value: 3,
        color: "#0c9a54",
        highlight: "#1c9a5c",
        label: "Rhône"
    },
    {
        value: 1,
        color: "#0c9a54",
        highlight: "#1c9a5c",
        label: "Drome"
    },
    {
        value: 1,
        color: "#f7c63d",
        highlight: "#f7cd56",
        label: "Haute Garonne"
    },
    {
        value: 1,
        color: "#da483c",
        highlight: "#da5d53",
        label: "Puy de Dôme"
    },
    {
        value: 2,
        color: "#6388c5",
        highlight: "#7694c5",
        label: "Charentes Maritime"
    },
    {
        value: 2,
        color: "#0c9a54",
        highlight: "#1c9a5c",
        label: "Hors France"
    }];

    $scope.dataPieRegion2015 = [
    {
        value: 461,
        color:"#da483c",
        highlight: "#da5d53",
        label: "Loire Atlantique"
    },
    {
        value: 15,
        color: "#6388c5",
        highlight: "#7694c5",
        label: "Bretagne"
    },
    {
        value: 6,
        color: "#0c9a54",
        highlight: "#1c9a5c",
        label: "Poitou Charentes"
    },
    {
        value: 6,
        color: "#f7c63d",
        highlight: "#f7cd56",
        label: "Maine et Loire"
    },
    {
        value: 5,
        color: "#da483c",
        highlight: "#da5d53",
        label: "Vendée"
    },
    {
        value: 9,
        color: "#6388c5",
        highlight: "#7694c5",
        label: "Région Parisienne"
    },
    {
        value: 2,
        color: "#0c9a54",
        highlight: "#1c9a5c",
        label: "Charente Maritime"
    },
    {
        value: 2,
        color: "#f7c63d",
        highlight: "#f7cd56",
        label: "Indre et Loire"
    },
    {
        value: 1,
        color: "#da483c",
        highlight: "#da5d53",
        label: "Calvados"
    },
    {
        value: 1,
        color: "#6388c5",
        highlight: "#7694c5",
        label: "Puy de Dôme"
    },
    {
        value: 1,
        color: "#0c9a54",
        highlight: "#1c9a5c",
        label: "Haute Vienne"
    },
    {
        value: 1,
        color: "#0c9a54",
        highlight: "#1c9a5c",
        label: "Rhône"
    }];

   
    $scope.dataPieAge2014 = [
    {
        value: 71,
        color:"#da483c",
        highlight: "#da5d53",
        label: "18-23"
    },
    {
        value: 150,
        color: "#6388c5",
        highlight: "#7694c5",
        label: "23-30"
    },
    {
        value: 135,
        color: "#0c9a54",
        highlight: "#1c9a5c",
        label: "30-35"
    },
    {
        value: 72,
        color: "#f7c63d",
        highlight: "#f7cd56",
        label: "35-40"
    },
    {
        value: 49,
        color: "#da483c",
        highlight: "#da5d53",
        label: "40+"
    },
    {
        value: 10,
        color: "#6388c5",
        highlight: "#7694c5",
        label: "NC"
    }];

    $scope.dataPieAge2015 = [
    {
        value: 111,
        color:"#da483c",
        highlight: "#da5d53",
        label: "18-25"
    },
    {
        value: 111,
        color: "#6388c5",
        highlight: "#7694c5",
        label: "25-30"
    },
    {
        value: 103,
        color: "#0c9a54",
        highlight: "#1c9a5c",
        label: "30-35"
    },
    {
        value: 71,
        color: "#f7c63d",
        highlight: "#f7cd56",
        label: "35-40"
    },
    {
        value: 51,
        color: "#da483c",
        highlight: "#da5d53",
        label: "40+"
    },
    {
        value: 147,
        color: "#6388c5",
        highlight: "#7694c5",
        label: "NC"
    }];

    $scope.optionsPie = {
	    //Boolean - Whether we should show a stroke on each segment
	    segmentShowStroke : true,

	    //String - The colour of each segment stroke
	    segmentStrokeColor : "#fff",

	    //Number - The width of each segment stroke
	    segmentStrokeWidth : 2,

	    //Number - The percentage of the chart that we cut out of the middle
	    percentageInnerCutout : 50, // This is 0 for Pie charts

	    //Number - Amount of animation steps
	    animationSteps : 100,

	    //String - Animation easing effect
	    animationEasing : "easeOutBounce",

	    //Boolean - Whether we animate the rotation of the Doughnut
	    animateRotate : true,

	    //Boolean - Whether we animate scaling the Doughnut from the centre
	    animateScale : false,

        // Boolean - Determines whether to draw tooltips on the canvas or not
        showTooltips: true,

        // Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
        customTooltips: false,

        // Array - Array of string names to attach tooltip events
        tooltipEvents: ["mousemove", "touchstart", "touchmove"],

	    //String - A legend template
	    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

	};

}]);