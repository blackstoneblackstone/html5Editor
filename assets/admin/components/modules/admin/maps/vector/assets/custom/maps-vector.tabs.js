$(function()
{
	
	$('#maps_vector_tabs a[data-toggle="tab"]').on('shown.bs.tab', function (e)
	{
		if ($(this).attr('data-init'))
			return;
		
		$(this).attr('data-init', 1);
		switch ($(this).attr('href'))
		{
			case '#tab1':
				initWorldMapGDP();
				break;
				
			case '#tab2':
				initWorldMapMarkers();
				break;
				
			case '#tab3':
				initUSAUnemployment();
				break;
				
			case '#tab4':
				initRegionSelection();
				break;
				
			case '#tab5':
				initFranceElections();
				break;
				
			case '#tab6':
				initRandomColors();
				break;
				
			case '#tab7':
				initMallMap();
				break;
				
			case '#tab8':
				initProjectionMap();
				break;
		}
	});

	$(window).on('load', function(){
		setTimeout(function(){
			initWorldMapMarkers();
		}, 100);
	});
	
});