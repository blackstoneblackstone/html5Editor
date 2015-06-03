$(function()
{

	// reverse projection map
	var mapProjection,
	    markerIndex = 0,
	    markersCoords = {};
	
	window.initProjectionMap = function()
	{
		mapProjection = new jvm.WorldMap({
			map: 'us_lcc_en',
			backgroundColor: 'transparent',
			zoomOnScroll:false,
			markerStyle: {
				initial: {
					fill: primaryColor
				}
			},
			regionStyle: {
				initial: { fill: infoColor }
			},
			container: $('#projection-map'),
			onMarkerLabelShow: function(e, label, code){
				mapProjection.label.text(markersCoords[code].lat.toFixed(2)+', '+markersCoords[code].lng.toFixed(2));
			},
			onMarkerClick: function(e, code){
				mapProjection.removeMarkers([code]);
				mapProjection.label.hide();
			}
		});
		
		mapProjection.container.click(function(e){
			// var latLng = mapProjection.pointToLatLng(e.offsetX, e.offsetY),
			// targetCls = $(e.target).attr('class');

			// Firefox Fix
			var x = e.pageX - mapProjection.container.offset().left,
              	y = e.pageY - mapProjection.container.offset().top,
              	latLng = mapProjection.pointToLatLng(x, y),
              	targetCls = $(e.target).attr('class');

			// if (latLng && (!targetCls || (targetCls && $(e.target).attr('class').indexOf('jvectormap-marker') === -1))) {
			if (latLng && (!targetCls || targetCls.indexOf('jvectormap-marker') === -1)) {
				markersCoords[markerIndex] = latLng;
				mapProjection.addMarker(markerIndex, {latLng: [latLng.lat, latLng.lng]});
				markerIndex += 1;
			}
		});
	}
	
	$(window).on('load', function(){

		if ($('#maps_vector_tabs').length)
			return;

		setTimeout(function(){
			initProjectionMap();
		}, 100);
	});
	
});