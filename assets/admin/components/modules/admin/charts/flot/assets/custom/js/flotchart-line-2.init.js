(function($)
{
	if (typeof charts == 'undefined') 
		return;

	charts.chart_lines_fill_nopoints_2 = 
	{
		// chart data
		data: 
		{
			d1: []
		},

		// will hold the chart object
		plot: null,

		// chart options
		options: 
		{
			colors: [ primaryColor ],
			grid: {
				color: "#dedede",
			    borderWidth: 1,
			    borderColor: "transparent",
			    clickable: true, 
			    hoverable: true
			},
	        series: {
	        	grow: {active:false},
	            lines: {
            		show: true,
            		fill: false,
            		lineWidth: 5,
            		steps: false,
            		color: primaryColor
            	},
	            points: {show:false}
	        },
	        legend: { position: "nw", backgroundColor: null, backgroundOpacity: 0 },
	        yaxis: { 
	        	ticks:3, 
	        	tickSize: 40,
	        	tickFormatter: function(val, axis) { return val + "k";} 
	    	},
	        xaxis: { ticks:4, tickDecimals: 0, tickColor: 'transparent' },
	        shadowSize:0,
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

		placeholder: "#chart_lines_fill_nopoints_2",
		
		// initialize
		init: function()
		{	
			// generate some data
			this.data.d1 = [[1, 3+charts.utility.randNum()], [2, 6+charts.utility.randNum()], [3, 30+charts.utility.randNum()], [4, 110+charts.utility.randNum()],[5, 80+charts.utility.randNum()],[6, 18+charts.utility.randNum()],[7, 50+charts.utility.randNum()],[8, 15+charts.utility.randNum()],[9, 18+charts.utility.randNum()],[10, 60+charts.utility.randNum()],[11, 110+charts.utility.randNum()],[12, 27+charts.utility.randNum()],[13, 30+charts.utility.randNum()],[14, 33+charts.utility.randNum()],[15, 24+charts.utility.randNum()],[16, 80+charts.utility.randNum()],[17, 30+charts.utility.randNum()],[18, 33+charts.utility.randNum()],[19, 36+charts.utility.randNum()],[20, 39+charts.utility.randNum()],[21, 42+charts.utility.randNum()],[22, 70+charts.utility.randNum()],[23, 36+charts.utility.randNum()],[24, 39+charts.utility.randNum()],[25, 42+charts.utility.randNum()],[26, 45+charts.utility.randNum()],[27,60+charts.utility.randNum()],[28, 51+charts.utility.randNum()],[29, 55+charts.utility.randNum()], [30, 100+charts.utility.randNum()]];
			
			// make chart
			this.plot = $.plot(
				this.placeholder, 
				[{
         			label: "Net Revenue", 
         			data: this.data.d1
         		}], 
         		this.options);
		}
	};

	$(window).on('load', function(){
		setTimeout(function(){
			charts.chart_lines_fill_nopoints_2.init();
		}, 100);
	});
	
})(jQuery);