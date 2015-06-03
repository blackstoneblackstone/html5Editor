(function($)
{
	$(window).on('load', function(){
		setTimeout(function()
		{

			$('[data-toggle*="gridalicious"]').each(function()
			{
				var $that = $(this);
				$(this).find('.loading').remove().end()
				.find('.loaded').removeClass('hide2').end()
				.gridalicious(
				{
					gutter: $that.attr('data-gridalicious-gutter') || 13, 
					width: $that.attr('data-gridalicious-width') ? parseInt($that.attr('data-gridalicious-width')) : 200,
					selector: '.widget'
				});
			});

		}, 200);
	});
})(jQuery);