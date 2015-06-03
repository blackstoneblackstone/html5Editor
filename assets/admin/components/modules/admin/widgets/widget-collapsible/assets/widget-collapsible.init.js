(function($)
{
	$('.widget[data-toggle="collapse-widget"] .widget-body')
		.on('show.bs.collapse', function(){
			$(this).parents('.widget:first').attr('data-collapse-closed', "false");
		})
		.on('shown.bs.collapse', function(){
			setTimeout(function(){ $(window).resize(); }, 500);
		})
		.on('hidden.bs.collapse', function(){
			$(this).parents('.widget:first').attr('data-collapse-closed', "true");
		});
	
	$('.widget[data-toggle="collapse-widget"]').each(function()
	{
		// append toggle button
		if (!$(this).find('.widget-head > .collapse-toggle').length)
			$('<span class="collapse-toggle"></span>').appendTo($(this).find('.widget-head'));
		
		// make the widget body collapsible
		$(this).find('.widget-body').not('.collapse').addClass('collapse');
		
		// verify if the widget should be opened
		if ($(this).attr('data-collapse-closed') !== "true")
			$(this).find('.widget-body').addClass('in');
		
		// bind the toggle button
		$(this).find('.collapse-toggle').on('click', function(){
			$(this).parents('.widget:first').find('.widget-body').collapse('toggle');
		});
	});
})(jQuery);