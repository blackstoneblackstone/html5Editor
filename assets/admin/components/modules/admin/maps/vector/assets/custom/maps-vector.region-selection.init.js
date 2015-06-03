$(function()
{

	// regions selection
	window.initRegionSelection = function()
	{
		map = new jvm.WorldMap({
			container: $('#regions-selection'),
			map: 'de_merc_en',
			regionsSelectable: true,
			markersSelectable: true,
			markers: [
			          {latLng: [52.50, 13.39], name: 'Berlin'},
			          {latLng: [53.56, 10.00], name: 'Hamburg'},
			          {latLng: [48.13, 11.56], name: 'Munich'},
			          {latLng: [50.95, 6.96], name: 'Cologne'},
			          {latLng: [50.11, 8.68], name: 'Frankfurt am Main'},
			          {latLng: [48.77, 9.17], name: 'Stuttgart'},
			          {latLng: [51.23, 6.78], name: 'Dusseldorf'},
			          {latLng: [51.51, 7.46], name: 'Dortmund'},
			          {latLng: [51.45, 7.01], name: 'Essen'},
			          {latLng: [53.07, 8.80], name: 'Bremen'}
			],
			markerStyle: {
				initial: {
					fill: '#4DAC26'
				},
			    selected: {
			    	fill: '#CA0020'
			    }
			},
			regionStyle: {
				initial: {
					fill: '#B8E186'
				},
			    selected: {
			    	fill: '#F4A582'
			    }
			},
			series: {
				markers: [{
					attribute: 'r',
			        scale: [5, 15],
			        values: [
			                 887.70,
			        		 755.16,
			        		 310.69,
			        		 405.17,
			        		 248.31,
			        		 207.35,
			        		 217.22,
			        		 280.71,
			        		 210.32,
			        		 325.42
			        ]
				}]
			},
			backgroundColor: 'transparent',
			zoomOnScroll:false,
			onRegionSelected: function(){
				if (window.localStorage) {
					window.localStorage.setItem(
							'jvectormap-selected-regions',
			        		JSON.stringify(map.getSelectedRegions())
					);
				}
			},
			onMarkerSelected: function(){
				if (window.localStorage) {
					window.localStorage.setItem(
							'jvectormap-selected-markers',
			        		JSON.stringify(map.getSelectedMarkers())
					);
			        }
			}
		});
		map.setSelectedRegions( JSON.parse( window.localStorage.getItem('jvectormap-selected-regions') || '[]' ) );
		map.setSelectedMarkers( JSON.parse( window.localStorage.getItem('jvectormap-selected-markers') || '[]' ) );
	}
	
	$(window).on('load', function(){

		if ($('#maps_vector_tabs').length)
			return;

		setTimeout(function(){
			initRegionSelection();
		}, 100);
	});
	
});