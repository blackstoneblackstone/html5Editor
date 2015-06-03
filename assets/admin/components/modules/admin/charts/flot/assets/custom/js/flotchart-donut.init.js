(function($)
{
	if (typeof charts == 'undefined') 
		return;

	charts.chart_donut = 
	{
		// chart data
		data: [
		    { label: "USA",  data: 38 },
		    { label: "Brazil",  data: 23 },
		    { label: "India",  data: 15 },
		    { label: "Turkey",  data: 9 },
		    { label: "France",  data: 7 },
		    { label: "China",  data: 5 },
		    { label: "Germany",  data: 3 }
		],

		// will hold the chart object
		plot: null,

		// chart options
		options: 
		{
			series: {
				pie: { 
					show: true,
					innerRadius: 0.4,
					highlight: {
						opacity: 0.1
					},
					radius: 1,
					stroke: {
						color: '#fff',
						width: 8
					},
					startAngle: 2,
				    combine: {
	                    color: '#EEE',
	                    threshold: 0.05
	                },
	                label: {
	                    show: true,
	                    radius: 1,
	                    formatter: function(label, series){
	                        return '<div class="label label-inverse">'+label+'&nbsp;'+Math.round(series.percent)+'%</div>';
	                    }
	                }
				},
				grow: {	active: false}
			},
			legend:{show:false},
			grid: {
	            hoverable: true,
	            clickable: true,
	            backgroundColor : { }
	        },
	        colors: [],
	        tooltip: true,
			tooltipOpts: {
				content: "%s : %y.1"+"%",
				shifts: {
					x: -30,
					y: -50
				},
				defaultTheme: false
			}
		},
		
		placeholder: "#chart_donut",
		
		// initialize
		init: function()
		{
			// apply styling
			charts.utility.applyStyle(this);
			
			this.plot = $.plot($(this.placeholder), this.data, this.options);
		}
	};

	$(window).on('load', function(){
		setTimeout(function(){
			charts.chart_donut.init();
		}, 100);
	});
	
})(jQuery);