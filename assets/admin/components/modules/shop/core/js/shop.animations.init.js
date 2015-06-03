(function($)
{

	var animations = true;

	window.animateElements = function()
	{
		dataAnimate();

		if (typeof $.fn.appear != 'undefined')
		{
			setTimeout(function(){
				$.force_appear();
			}, 500);
		}

		// animate slide1
		$('#slide1 h1, #slide1 h2, #slide1 .block')
		.each(function(k,v)
		{
			var t = $(this);
			setTimeout(function(){
				t.css('visibility', 'visible').addClass('animated fadeIn');
			}, 150*k);
		});

		setTimeout(function(){
			$(".owl-carousel").css('visibility', 'visible')
			.not('#owl-featured')
			.addClass('animated fadeInDown');
		}, 300);

		// animate owl-carousel items
		$("#owl-featured .owl-item")
		.each(function(k,v)
		{
			var t = $(this);
			setTimeout(function(){
				t.css('visibility', 'visible').addClass('animated bounceIn');
			}, 150*k);
		});
	}

	// handles Animate
	function dataAnimate()
	{
		if (typeof $.fn.appear == 'undefined')
			return;

	  	$('[data-animate]').each(function()
	  	{
	    	var $toAnimateElement = $(this);
	    	var toAnimateDelay = $(this).attr('data-delay') || 200;

		    if( !$toAnimateElement.hasClass('animated') ) 
		    { 
		      	var elementAnimation = $toAnimateElement.attr('data-animate');
		      	$toAnimateElement.addClass('non-viewport')
		      	$toAnimateElement.appear().on('appear', function(e, $a)
		      	{
		        	setTimeout(function() {
		          		$toAnimateElement.removeClass('non-viewport').addClass( elementAnimation + ' animated');
		        	}, toAnimateDelay);
		      	});
	    	}
	  	});
	}
	
	// animate only after page finished loading
	$(window).on('load', function()
	{
		// disable animations on touch devices
		if (Modernizr.touch)
		{
			$(".owl-carousel").css('visibility', 'visible');
			$('#slide1 h1, #slide1 h2, #slide1 .block').css('visibility', 'visible');
			return;
		}

		animateElements();

	});

})(jQuery);