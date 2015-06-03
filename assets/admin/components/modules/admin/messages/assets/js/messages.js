$(function()
{
	$('.widget-messages').each(function(){
		equalHeight($(this).find('.widget-body > .row-merge > [class*="col"]'));
		$(this).on('click', '.listWrapper li:not(.active), .detailsWrapper .load', function(e)
		{
			e.preventDefault();
			var p = $(this).parents('.widget-messages:first');
			p.find('.listWrapper li').removeClass('active');
			$(this).addClass('active');
			p.find('.ajax-loading').stop().fadeIn(1000, function(){
				setTimeout(function(){ p.find('.ajax-loading').fadeOut(); }, 1000);
			});
		});
	});
	
	$(window).resize(function()
	{
		if ($('.widget-messages').length)
			equalHeight($('.widget-messages').find('.widget-body > .row-merge > [class*="col"]'));
	});
	
	// trigger window resize event
	$(window).on('load', function(){
		$(this).resize();
	});
});