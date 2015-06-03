/*
 * Helper function for JQueryUI Sliders Create event
 */
function JQSliderCreate()
{
	$(this)
		.removeClass('ui-corner-all ui-widget-content')
		.wrap('<span class="ui-slider-wrap"></span>')
		.find('.ui-slider-handle')
		.removeClass('ui-corner-all ui-state-default');
}

$(function()
{
    
    /*
	 * JQueryUI Slider: Default slider
	 */
	if ($('.slider-single').size() > 0)
	{
		$( ".slider-single" ).slider({
			create: JQSliderCreate,
			value: 10,
	        animate: true,
	        start: function() { if (typeof mainYScroller != 'undefined') mainYScroller.disable(); },
	        stop: function() { if (typeof mainYScroller != 'undefined') mainYScroller.enable(); }
	    });
	}
	
	/*
	 * JQueryUI Slider: Multiple Vertical Sliders
	 */
	$( ".sliders-vertical > span" ).each(function() 
	{
        var value = parseInt( $( this ).text(), 10 );
        $( this ).empty().slider({
        	create: JQSliderCreate,
            value: value,
            range: "min",
            animate: true,
            orientation: "vertical",
            start: function() { if (typeof mainYScroller != 'undefined') mainYScroller.disable(); },
	        stop: function() { if (typeof mainYScroller != 'undefined') mainYScroller.enable(); }
        });
    });
	
	/*
	 * JQueryUI Slider: Range Slider
	 */
	if ($('.range-slider').size() > 0)
    {
		$( ".range-slider .slider" ).each(function()
		{
			var t = $(this).parent(),
				i = t.find('input'),
				min = $(this).data('min') || 0,
				max = $(this).data('max') || 500,
				values = $(this).data('values') ? $(this).data('values').split(',') : [i.first().val(), i.last().val() || max];

			$(this).slider({
				create: JQSliderCreate,
		        range: true,
		        min: min,
		        max: max,
		        values: values,
		        slide: function( event, ui ) {
		        	if (i.length == 1)
		            	t.find(".amount").val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
		            else
		            	i.each(function(k,v){ $(i[k]).val(ui.values[k]); });
		        }
		    });

			if (i.length == 1)
		    	t.find(".amount").val( $(this).slider( "values", 0 ) +
    			" - " + $(this).slider( "values", 1 ) );
		});
    }
	
	/*
	 * JQueryUI Slider: Snap to Increments
	 */
	if ($('.increments-slider').size() > 0)
    {
		$( ".increments-slider .slider" ).slider({
			create: JQSliderCreate,
			value:100,
	        min: 0,
	        max: 500,
	        step: 50,
	        slide: function( event, ui ) {
	            $( ".increments-slider .amount" ).val( "$" + ui.value );
	        },
	        start: function() { if (typeof mainYScroller != 'undefined') mainYScroller.disable(); },
	        stop: function() { if (typeof mainYScroller != 'undefined') mainYScroller.enable(); }
	    });
		$( ".increments-slider .amount" ).val( "$" + $( ".increments-slider .slider" ).slider( "value" ) );
    }
	
	/*
	 * JQueryUI Slider: Vertical Range Slider
	 */
	if ($('.vertical-range-slider').size() > 0)
    {
		$( ".vertical-range-slider .slider" ).slider({
			create: JQSliderCreate,
			orientation: "vertical",
	        range: true,
	        min: 0,
	        max: 500,
	        values: [ 100, 400 ],
	        slide: function( event, ui ) {
	            $( ".vertical-range-slider .amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
	        },
	        start: function() { if (typeof mainYScroller != 'undefined') mainYScroller.disable(); },
	        stop: function() { if (typeof mainYScroller != 'undefined') mainYScroller.enable(); }
	    });
    	$( ".vertical-range-slider .amount" ).val( "$" + $( ".vertical-range-slider .slider" ).slider( "values", 0 ) +
    			" - $" + $( ".vertical-range-slider .slider" ).slider( "values", 1 ) );
    }
	
	/*
	 * JQueryUI Slider: Range fixed minimum
	 */
	if ($('.slider-range-min').size() > 0)
	{
		$( ".slider-range-min .slider" ).slider({
			create: JQSliderCreate,
            range: "min",
            value: 150,
            min: 1,
            max: 700,
            slide: function( event, ui ) {
                $( ".slider-range-min .amount" ).val( "$" + ui.value );
            },
            start: function() { if (typeof mainYScroller != 'undefined') mainYScroller.disable(); },
	        stop: function() { if (typeof mainYScroller != 'undefined') mainYScroller.enable(); }
        });
        $( ".slider-range-min .amount" ).val( "$" + $( ".slider-range-min .slider" ).slider( "value" ) );
	}
	
	/*
	 * JQueryUI Slider: Range fixed maximum
	 */
	if ($('.slider-range-max').size() > 0)
	{
		$( ".slider-range-max .slider" ).slider({
			create: JQSliderCreate,
            range: "max",
            min: 1,
            max: 700,
            value: 150,
            slide: function( event, ui ) {
                $( ".slider-range-max .amount" ).val( "$" + ui.value );
            },
            start: function() { if (typeof mainYScroller != 'undefined') mainYScroller.disable(); },
	        stop: function() { if (typeof mainYScroller != 'undefined') mainYScroller.enable(); }
        });
        $( ".slider-range-max .amount" ).val( "$" + $( ".slider-range-max .slider" ).slider( "value" ) );
	}
});