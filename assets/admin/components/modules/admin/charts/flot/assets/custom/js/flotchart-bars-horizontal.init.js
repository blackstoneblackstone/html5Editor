(function($)
{
	if (typeof charts == 'undefined') 
		return;

	charts.chart_horizontal_bars = 
	{
		// chart data
		data: null,

		// will hold the chart object
		plot: null,

		// chart options
		options: 
		{
			grid: {
				color: "#dedede",
			    borderWidth: 1,
			    borderColor: "transparent",
			    clickable: true, 
			    hoverable: true
			},
	        series: {
	        	grow: {active:false},
		        bars: {
		        	show:true,
					horizontal: true,
					barWidth:0.2,
					fill:1
				}
	        },
	        legend: { position: "nw", backgroundColor: null, backgroundOpacity: 0 },
	        yaxis: { 
	        	ticks:3, 
	        	tickColor: 'transparent',
	        	tickFormatter: function(val, axis) { return val + "k";} 
	    	},
	        xaxis: { ticks:4, tickDecimals: 0 },
	        colors: [primaryColor],
	        tooltip: true,
			tooltipOpts: {
				content: "%s : %y.0",
				shifts: {
					x: -30,
					y: -50
				},
				defaultTheme: false
			}
		},
		
		placeholder: "#chart_horizontal_bars",
		
		// initialize
		init: function()
		{
			// apply styling
			// charts.utility.applyStyle(this);
			
			var d1 = [];
		    for (var i = 1; i <= 5; i += 1)
		        d1.push([parseInt(Math.random() * 30), i ]);

		    this.data = new Array();
		    this.data.push({
		    	label: "Sales Volume",
		        data: d1,
		        bars: {
		            horizontal:true, 
		            show: true, 
		            barWidth: 0.5
		        }
		    });

			this.plot = $.plot($(this.placeholder), this.data, this.options);
		}
	};

	$(window).on('load', function(){
		setTimeout(function(){
			charts.chart_horizontal_bars.init();
		}, 100);
	});
	
})(jQuery);