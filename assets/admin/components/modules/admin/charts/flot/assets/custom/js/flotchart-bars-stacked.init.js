(function($)
{
	if (typeof charts == 'undefined') 
		return;

	charts.chart_stacked_bars = 
	{
		// chart data
		data: null,

		// will hold the chart object
		plot: null,

		// chart options
		options: 
		{
			grid: {
				show: true,
			    aboveData: false,
			    color: "#3f3f3f" ,
			    labelMargin: 5,
			    axisMargin: 0, 
			    borderWidth: 0,
			    borderColor:null,
			    minBorderMargin: 5 ,
			    clickable: true, 
			    hoverable: true,
			    autoHighlight: true,
			    mouseActiveRadius: 20,
			    backgroundColor : { }
			},
	        series: {
	        	grow: {active:false},
	        	stack: 0,
                lines: { show: false, fill: true, steps: false },
                bars: { show: true, barWidth: 0.5, fill:1}
		    },
	        xaxis: {ticks:11, tickDecimals: 0},
	        legend: { position: "ne", backgroundColor: null, backgroundOpacity: 0 },
	        colors: [],
	        shadowSize:1,
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
		
		placeholder: "#chart_stacked_bars",
		
		// initialize
		init: function()
		{
			// apply styling
			charts.utility.applyStyle(this);
			
			var d1 = [];
		    for (var i = 0; i <= 10; i += 1)
		        d1.push([i, parseInt(Math.random() * 30)]);
		 
		    var d2 = [];
		    for (var i = 0; i <= 10; i += 1)
		        d2.push([i, parseInt(Math.random() * 20)]);
		 
		    var d3 = [];
		    for (var i = 0; i <= 10; i += 1)
		        d3.push([i, parseInt(Math.random() * 20)]);
		 
		    this.data = new Array();
		 
		    this.data.push({
		     	label: "Data One",
		        data: d1
		    });
		    this.data.push({
		    	label: "Data Two",
		        data: d2
		    });
		    this.data.push({
		    	label: "Data Tree",
		        data: d3
		    });

		    this.plot = $.plot($(this.placeholder), this.data, this.options);
		}
	}

	$(window).on('load', function(){
		setTimeout(function(){
			charts.chart_stacked_bars.init();
		}, 100);
	});
	
})(jQuery);