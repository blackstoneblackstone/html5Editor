(function($)
{
	$('ul.collapse')
	.on('show.bs.collapse', function(e)
	{
		e.stopPropagation();

		if ($(this).closest('#menu').length)
		{
			var t = $(this).parents('.hasSubmenu').length;
			if (t != 1) return;

			var a = $('#menu > div > ul > li.hasSubmenu.active > ul').not(this);

			a
			.removeClass('in').addClass('collapse').removeAttr('style')
			.closest('.hasSubmenu.active').removeClass('active');
		}
	})
	.on('shown.bs.collapse', function(e)
	{
		e.stopPropagation();
		
		if ($(this).closest('#menu').length)
			$('#menu *').getNiceScroll().resize();
	});
	
	$('#menu_switch').on('change', function(){
		var w = $(this).parents('#menu'),
			w_fusion = w.find('#sidebar-fusion-wrapper'),
			nav = $(this).val();

		if (w_fusion.length)
		{
			w_fusion.find('> ul').addClass('hide');
			w_fusion.find('#' + nav).removeClass('hide');
			$('#menu *').getNiceScroll().resize();
		}
	});

	$('.btn-avatar [data-toggle="tab"]').on('show.bs.tab', function(e){
		e.stopPropagation();
		$('.btn-avatar [data-toggle="tab"]').parent().removeClass('active');
	});

})(jQuery);