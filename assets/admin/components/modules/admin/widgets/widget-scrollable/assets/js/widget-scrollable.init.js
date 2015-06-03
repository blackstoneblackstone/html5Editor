(function($)
{

	/* Slim Scroll Widgets */
	$('.widget-scroll').each(function(){
		$(this).find('.widget-body > div').height($(this).attr('data-scroll-height')).niceScroll();
	});
	
	/* Other non-widget Slim Scroll areas */
	$('*:not(#menu) .slim-scroll').each(function(){
		$(this).height($(this).attr('data-scroll-height')).niceScroll();
	});

})(jQuery);