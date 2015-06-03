(function($)
{

	$(window).on('load', function(){
		setTimeout(function(){
			$("#news-featured-3").owlCarousel({
		      	slideSpeed : 300,
		      	paginationSpeed : 400,
		      	singleItem: true,
		      	autoPlay: 3000,
		      	autoHeight : true,
    			transitionStyle:"fade"
			});
		},100);
	});

})(jQuery);