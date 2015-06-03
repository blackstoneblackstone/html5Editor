(function($){
	
	$(window).on('load', function(){
		setTimeout(function(){

			$(".sparkline").each(function()
			{
				var d = $(this).data('data') || "html";
				$(this).sparkline(
					d, {
					    type: 'bar',
					    height: '70',
					    barWidth: 10,
					    barSpacing: 8,
					    zeroAxis: false,
					    stackedBarColor: [primaryColor, "#dedede"],
					    colorMap: $(this).data('colors') ? $(this).data('colors').split(",") : [],
					    enableTagOptions: true
					    // tooltipFormat: '<span style="color: {{color}}">&#9679;</span> {{prefix}}{{value}}{{suffix}}'
					}
				);
			});

		}, 100);
	});

})(jQuery);