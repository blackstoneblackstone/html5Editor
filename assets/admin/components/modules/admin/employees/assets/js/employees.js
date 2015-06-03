$(function()
{
	window.equalHeight = function(boxes, substract)
	{
		if (typeof substract == 'undefined')
			var substract = 0;
		
		boxes.height('auto');
		if (parseInt($(window).width()) <= 400)
			return;
			
		var maxHeight = Math.max.apply( Math, boxes.map(function(){ return $(this).height() - substract; }).get());
		boxes.height(maxHeight);
	}

	$('.widget-employees').each(function(){
		if (typeof $.fn.select2 != 'undefined') 
			$(this).find('select').select2();
		
		equalHeight($(this).find('.widget-body > .row-merge > [class*="col"]'));
		$(this).on('click', '.listWrapper li:not(.active), .detailsWrapper .load', function(e)
		{
			e.preventDefault();
			var p = $(this).parents('.widget-employees:first');
			p.find('.listWrapper li').removeClass('active');
			$(this).addClass('active');
			p.find('.ajax-loading').stop().fadeIn(1000, function(){
				setTimeout(function(){ p.find('.ajax-loading').fadeOut(); }, 1000);
			});
		});
	});
	
	// bind window resize event
	$(window).resize(function()
	{
		if ($('.widget-employees').length)
			equalHeight($('.widget-employees').find('.widget-body > .row-merge > [class*="col"]'));
	});
	
	// trigger window resize event
	$(window).on('load', function(){
		$(this).resize();
	});
});