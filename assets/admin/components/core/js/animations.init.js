(function($, window)
{
	window.animations = true;

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
		      	$toAnimateElement.addClass('non-viewport');
		      	$toAnimateElement.appear().on('appear', function(e, $a)
		      	{
		        	setTimeout(function() {
		          		$toAnimateElement.removeClass('non-viewport').addClass( elementAnimation + ' animated');
		        	}, toAnimateDelay);
		      	});
	    	}
	  	});
	}

	window.animateElements = function()
	{
		// restore visibility
		$(".layout-app, #menu, #menu-top, #menu_kis, .navbar.main, #footer").css('visibility', 'visible').show();

		// disable animations on touch devices
		if (Modernizr.touch)
			return;

		// disable animations if browser doesn't support css transitions & 3d transforms
		if (!$('html.csstransitions.csstransforms3d').length)
			return;

		// animate sidebar
		$("#menu").addClass('animated fadeInLeft');

		// animate 2nd sidebar
		if (!$('.menu-right-visible').length)
			$("#menu_kis").addClass('animated fadeInRight');
		else
			$("#menu_kis").removeClass('animated fadeInRight');

		// animate main navbar & footer
		$(".navbar.main, #footer").addClass('animated fadeInUp');

		// animate top menu
		$("#menu-top").addClass('animated fadeInDown');

		// animate layout columns
		$(".layout-app .col-app, .row-app > [class*='col-']").not('.col-unscrollable').not('.animated').addClass('animated fadeInDown');

		// animate dashboard friend list
		$(".friends-list > li")
		.css('visibility', 'hidden')
		.each(function(k,v)
		{
			var t = $(this);
			setTimeout(function(){
				t.css('visibility', 'visible').addClass('animated fadeInUp');
			}, 150*k);
		});

		// animate dashboard friend list
		$(".list-group > .list-group-item")
		.css('visibility', 'hidden')
		.each(function(k,v)
		{
			var t = $(this);
			setTimeout(function(){
				t.css('visibility', 'visible').addClass('animated fadeInUp');
			}, 150*k);
		});

		// animate timelines
		$(".timeline-activity > li")
		.css('visibility', 'hidden')
		.each(function(k,v)
		{
			var t = $(this),
				b = 100,
				r = (t.parent().height() / t.parent().find('> li').length) / b,
				r = (Math.round(r) * b) - b,
				r = r < 200 ? 200 : r;
			
			setTimeout(function(){
				t.css('visibility', 'visible').addClass('animated bounceInUp');
			}, r*k);
		});

		// animate statistical widgets
		$(".widget-stats")
		.css('visibility', 'hidden')
		.each(function(k,v)
		{
			var t = $(this);
			setTimeout(function(){
				t.css('visibility', 'visible').addClass('animated fadeInDown');
			}, 200*k);
		});

		// animate generic widgets
		$(".box-generic")
		.filter(function(){
			return !$(this).parents('.timeline-activity').length;
		})
		.filter(':visible')
		.css('visibility', 'hidden')
		.each(function(k,v)
		{
			var t = $(this);
			setTimeout(function(){
				t.css('visibility', 'visible').addClass('animated fadeInUp');
			}, 250*k);
		});

		// animate thumbnails
		$(".thumbnail")
		.css('visibility', 'hidden')
		.each(function(k,v)
		{
			var t = $(this);
			setTimeout(function(){
				t.css('visibility', 'visible').addClass('animated fadeInDown');
			}, 200*k);
		});

		// animate thumbnails
		$(".thumb")
		.filter(function(index) {
			return !$(this).closest('.list-group-item').length;
		})
		.css('visibility', 'hidden')
		.each(function(k,v)
		{
			var t = $(this);
			setTimeout(function(){
				t.css('visibility', 'visible').addClass('animated fadeInDown');
			}, 100*k);
		});

		// animate tabs
		$('.widget-tabs .tab-pane').addClass('animated fadeInUp');
	}

	// animate only after page finished loading
	$(window).on('load', function()
	{

		dataAnimate();

		if (typeof $.fn.appear != 'undefined')
		{
			setTimeout(function(){
				$.force_appear();
			}, 500);
		}

		animateElements();

		// animate page exits
		$('body')
		.on('click', 'a', function(e)
		{
			if (typeof $.LazyJaxDavis != 'undefined')
				return true;

			if ($(this).is('.ajaxify')) 
				return true;

			if ($(this).is('[data-edit]') || $(this).is('[data-gallery]') || $(this).is('.no-ajaxify') || $(this).is('[data-toggle]') || $(this).is('[data-dismiss]') || $(this).attr('target') == '_blank')
				return true;

			if ($(this).is('.not-animated'))
				return true;

			if ($(this).parents('.bootstrap-select').length)
				return true;

			if ($(this).attr('href') == '#')
				return true;

			if ($(this).attr('href').substring(0,11) == "javascript:")
    			return true;

			e.preventDefault();
			var t = $(this);

			$('body').addClass('animated fadeOutLeft');
			setTimeout(function()
			{
				if (t.attr('href') == '#')
					location.reload();
				else
					location = t.attr('href');
			}, 
			500);
		});

		// resize nicescroll areas after animations ended
		setTimeout(function()
		{
			resizeNiceScroll();
			if ($(window).width() < 992)
				disableContentNiceScroll();
		}, 1000);
	});

})(jQuery, window);