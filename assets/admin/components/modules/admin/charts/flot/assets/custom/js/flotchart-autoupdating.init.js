(function($)
{
	if (typeof charts == 'undefined') 
		return;

	charts.chart_live = 
	{
		// chart data
		data: [],
		totalPoints: 300,
	    updateInterval: 200,

		// we use an inline data source in the example, usually data would
	    // be fetched from a server
		getRandomData: function()
		{
			if (this.data.length > 0)
	            this.data = this.data.slice(1);

	        // do a random walk
	        while (this.data.length < this.totalPoints) 
		    {
	            var prev = this.data.length > 0 ? this.data[this.data.length - 1] : 50;
	            var y = prev + Math.random() * 10 - 5;
	            if (y < 0)
	                y = 0;
	            if (y > 100)
	                y = 100;
	            this.data.push(y);
	        }

	        // zip the generated y values with the x values
	        var res = [];
	        for (var i = 0; i < this.data.length; ++i)
	            res.push([i, this.data[i]])
	        return res;
		},

		// will hold the chart object
		plot: null,

		// chart options
		options: 
		{
			series: { 
	        	grow: { active: false },
	        	shadowSize: 0,
	        	lines: {
            		show: true,
            		fill: true,
            		lineWidth: 2,
            		steps: false
	            }
	        },
	        grid: {
				show: true,
			    aboveData: false,
			    color: "#3f3f3f",
			    labelMargin: 5,
			    axisMargin: 0, 
			    borderWidth: 0,
			    borderColor:null,
			    minBorderMargin: 5 ,
			    clickable: true, 
			    hoverable: true,
			    autoHighlight: false,
			    mouseActiveRadius: 20,
			    backgroundColor : { }
			}, 
			colors: [],
	        tooltip: true,
			tooltipOpts: {
				content: "Value is : %y.0",
				shifts: {
					x: -30,
					y: -50
				},
				defaultTheme: false
			},	
	        yaxis: { min: 0, max: 100 },
	        xaxis: { show: true}
		},
		
		placeholder: "#chart_live",
		
		// initialize
		init: function()
		{
			// apply styling
			charts.utility.applyStyle(this);
			
			this.plot = $.plot($(this.placeholder), [ this.getRandomData() ], this.options);
			setTimeout(this.update, charts.chart_live.updateInterval);
		},

		// update
		update: function()
		{
			if (!$(charts.chart_live.placeholder).length)
				return;

			charts.chart_live.plot.setData([ charts.chart_live.getRandomData() ]);
	        charts.chart_live.plot.draw();
	        
	        setTimeout(charts.chart_live.update, charts.chart_live.updateInterval);
		}
	};

	$(window).on('load', function(){
		setTimeout(function(){
			charts.chart_live.init();
		}, 100);
	});
	
})(jQuery);