$(function()
{

	// random colors
	var palette = ['#66C2A5', '#FC8D62', '#8DA0CB', '#E78AC3', '#A6D854'],
		generateColors = function(){
	        var colors = {},
	            key;
	
	        for (key in colorsMap.regions) {
	          colors[key] = palette[Math.floor(Math.random()*palette.length)];
	        }
	        return colors;
	      },
	      colorsMap;
	      
	window.initRandomColors = function()
	{
		colorsMap = new jvm.WorldMap({
			map: 'es_merc_en',
			container: $('#random-colors-map'),
			backgroundColor: 'transparent',
			zoomOnScroll:false,
			series: {
				regions: [{
					attribute: 'fill'
				}]
			}
		});
		colorsMap.series.regions[0].setValues(generateColors());
		$('#update-colors-button').click(function(e){
			e.preventDefault();
			colorsMap.series.regions[0].setValues(generateColors());
		});
	}
	
	$(window).on('load', function(){

		if ($('#maps_vector_tabs').length)
			return;

		setTimeout(function(){
			initRandomColors();
		}, 100);
	});
	
});