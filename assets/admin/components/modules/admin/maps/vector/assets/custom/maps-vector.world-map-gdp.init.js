$(function()
{

	// GDP by country
	window.initWorldMapGDP = function()
	{
		$('#world-map-gdp').vectorMap({
			map: 'world_mill_en',
			series: {
				regions: [{
					values: gdpData,
					scale: [dangerColor, successColor],
					normalizeFunction: 'polynomial'
				}]
			},
			backgroundColor: 'transparent',
			zoomOnScroll:false,
			onLabelShow: function(e, el, code){
				el.html(el.html()+' (GDP - '+gdpData[code]+')');
			}
		});
	}
	
	$(window).on('load', function(){

		if ($('#maps_vector_tabs').length)
			return;

		setTimeout(function(){
			initWorldMapGDP();
		}, 100);
	});
	
});