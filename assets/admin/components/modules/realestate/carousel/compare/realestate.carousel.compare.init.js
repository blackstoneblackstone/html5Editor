(function($)
{

	$(window).on('load', function()
	{
		setTimeout(function()
		{
			$("#realestate-carousel-compare").owlCarousel({
				autoPlay: 5000,
				items: 3,
				itemsCustom : [
			        [0, 1],
			        [450, 1],
			        [600, 2],
			        [700, 2],
			        [1000, 3],
			        [1200, 4],
			        [1400, 4],
			        [1600, 4]
			    ]
			});
		}, 
		100);
	});

})(jQuery);