(function($)
{
	window.closeDiscover = function()
	{
		var discover = $('#discover'),
			target = discover.find('> div');

		if (!target.length)
			return;

		target.attr('id', target.data('id'));
		target.attr('class', target.data('class'));
		target.insertAfter('#sidebar-discover-wrapper > ul > li > a[href="#' + target.attr('id') + '"]');
	}

	$('#sidebar-discover-wrapper > ul > li > a').on('click', function(e)
	{
		closeDiscover();

		if ($(this).is('[data-toggle="sidebar-discover"]'))
			e.preventDefault();

		if ($('#sidebar-discover-wrapper.open').length)
		{
			e.preventDefault();
			e.stopPropagation();
		}
	
		if ($('#sidebar-discover-wrapper.open').length)
		{
			$('#sidebar-discover-wrapper, [data-toggle="sidebar-discover"]').removeClass('open hover-closed');
			closeDiscover();
			return;
		}

		var that = $(this);

		$('[data-toggle="sidebar-discover"]').removeClass('open');
		that.addClass('open');

		var wrapper = $('#sidebar-discover-wrapper'),
			main = wrapper.find('> ul'),
			discover = wrapper.find('> #discover'),
			target = $(that.attr('href'));

		target.data('id', target.attr('id'));
		target.data('class', target.attr('class'));
		target.removeAttr('class id');

		if (!discover.length)
		{
			discover = $('<div/>').attr('id', 'discover');
			wrapper.append(discover);
		}

		discover.html(target);
		wrapper.addClass('open');
	})
	.on('mouseenter', function()
	{
		if ($(this).is('[data-toggle="sidebar-discover"].open'))
			return;

		if ($('#sidebar-discover-wrapper.open').length)
			$('#sidebar-discover-wrapper').addClass('hover-closed').removeClass('open');
	})
	.on('mouseleave', function()
	{
		$('#sidebar-discover-wrapper.hover-closed').removeClass('hover-closed').addClass('open');
	});
	
	$(window).on('load', function()
	{
		if ($('#menu .active > [data-toggle="sidebar-discover"]').length)
		{
			setTimeout(function(){
				$('#menu .active > [data-toggle="sidebar-discover"]').click();
			},200);
		}
	});
})(jQuery);