(function($)
{

	$(window).on('load', function(){
		setTimeout(function(){
			$("#news-featured-1").owlCarousel({
		      	slideSpeed : 300,
		      	paginationSpeed : 400,
		      	singleItem: true,
		      	navigation: true,
		      	navigationText: ['Newer', 'Older']
			});
		},100);
	});

})(jQuery);