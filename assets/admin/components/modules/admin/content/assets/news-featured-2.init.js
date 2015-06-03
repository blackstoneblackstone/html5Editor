(function($)
{

	$(window).on('load', function(){
		setTimeout(function(){
			$("#news-featured-2").owlCarousel({
		      	slideSpeed : 300,
		      	paginationSpeed : 400,
		      	navigation: true,
		      	autoPlay: 5000,
		      	items: 4,
				itemsCustom : [
			        [0, 1],
			        [450, 1],
			        [600, 1],
			        [700, 1],
			        [880, 2],
			        [1100, 2],
			        [1200, 3],
			        [1400, 4],
			        [1600, 4]
			    ],
		      	navigationText: ['Newer', 'Older']
			});
		},100);
	});

})(jQuery);