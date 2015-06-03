(function($)
{
	// generate easy-pie-charts
	if ($('.easy-pie').length && $.fn.easyPieChart)
	{
		$.each($('.easy-pie'), function(k,v)
		{	
			var color = primaryColor;
			if ($(this).is('.info')) color = infoColor;
			if ($(this).is('.danger')) color = dangerColor;
			if ($(this).is('.success')) color = successColor;
			if ($(this).is('.warning')) color = warningColor;
			if ($(this).is('.inverse')) color = inverseColor;

			
			$(v).easyPieChart({
				barColor: color,
				animate: ($('html').is('.ie') ? false : 3000),
                lineWidth: 4,
                size: 50
			});
		});
	}
})(jQuery);