(function($)
{

	$("#owl-featured").owlCarousel({
		autoPlay: 5000,
		items: 3,
		itemsCustom : [
	        [0, 1],
	        [450, 2],
	        [600, 2],
	        [700, 3],
	        [1000, 2],
	        [1200, 3],
	        [1400, 3],
	        [1600, 3]
	    ]
	})
	.find('a').on('click', function(e){
		e.stopPropagation();
	});

})(jQuery);