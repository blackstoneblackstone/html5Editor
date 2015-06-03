$(function()
{

	// USA unemployment
	window.initUSAUnemployment = function()
	{
		$.getJSON( componentsPath + 'modules/admin/maps/vector/assets/lib/data/us-unemployment.json', function(data){
			var val = 2009;
			statesValues = jvm.values.apply({}, jvm.values(data.states)),
			metroPopValues = Array.prototype.concat.apply([], jvm.values(data.metro.population)),
			metroUnemplValues = Array.prototype.concat.apply([], jvm.values(data.metro.unemployment));

			$('#usa-unemployment').vectorMap({
				map: 'us_aea_en',
				markers: data.metro.coords,
				series: {
					markers: [{
						attribute: 'fill',
						scale: ['#FEE5D9', '#A50F15'],
						values: data.metro.unemployment[val],
						min: jvm.min(metroUnemplValues),
						max: jvm.max(metroUnemplValues)
					},{
						attribute: 'r',
						scale: [5, 20],
						values: data.metro.population[val],
						min: jvm.min(metroPopValues),
						max: jvm.max(metroPopValues)
					}],
					regions: [{
						scale: ['#DEEBF7', '#08519C'],
						attribute: 'fill',
						values: data.states[val],
						min: jvm.min(statesValues),
						max: jvm.max(statesValues)
					}]
				},
				backgroundColor: 'transparent',
				zoomOnScroll:false,
				onMarkerLabelShow: function(event, label, index){
					label.html(
							'<b>'+data.metro.names[index]+'</b><br/>'+
							'<b>Population: </b>'+data.metro.population[val][index]+'</br>'+
							'<b>Unemployment rate: </b>'+data.metro.unemployment[val][index]+'%'
					);
				},
				onRegionLabelShow: function(event, label, code){
					label.html(
							'<b>'+label.html()+'</b></br>'+
							'<b>Unemployment rate: </b>'+data.states[val][code]+'%'
					);
				}
			});

			var mapObject = $('#usa-unemployment').vectorMap('get', 'mapObject');

			$("#usa-unemployment-slider").slider({
				value: val,
				min: 2005,
				max: 2009,
				step: 1,
				create: JQSliderCreate,
				slide: function( event, ui ) {
					$('#usa-unemployment-slider-year strong').html(ui.value);
					val = ui.value;
					mapObject.series.regions[0].setValues(data.states[ui.value]);
					mapObject.series.markers[0].setValues(data.metro.unemployment[ui.value]);
					mapObject.series.markers[1].setValues(data.metro.population[ui.value]);
				}
			});
		});
	}
	
	$(window).on('load', function(){

		if ($('#maps_vector_tabs').length)
			return;

		setTimeout(function(){
			initUSAUnemployment();
		}, 100);
	});
	
});