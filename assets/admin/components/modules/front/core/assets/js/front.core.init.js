(function($, window)
{

	$('.dropdown-menu.login input').on('focus', function(e){
		e.stopPropagation();
	});

	$(window).on('load', function()
	{
		window.loadTriggered = true;

		$('[data-height]').each(function(){
			$(this).css({ height: $(this).data('height') });
		});

		if (typeof Holder != 'undefined')
		{
			Holder.add_theme("dark", {background:"#424242", foreground:"#aaa", size:9}).run();
			Holder.add_theme("white", {background:"#fff", foreground:"#c9c9c9", size:9}).run();
			Holder.add_theme("primary", {background:primaryColor, foreground:"#fff", size:9}).run();
		}

		if ($('.scripts-async').length)
			$('.scripts-async .container-fluid').css('visibility', 'visible');
	});

	// weird chrome bug, sometimes the window load event isn't triggered
	setTimeout(function(){
		if (!window.loadTriggered)
			$(window).trigger('load');
	}, 500);

})(jQuery, window);