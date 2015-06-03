$(function()
{
	/* jQRangeSliders */
	
	// regular Range Slider
	$("#rangeSlider").rangeSlider();
	
	// edit Range Slider
	$("#rangeSliderEdit").editRangeSlider();
	
	// date Range Slider
	$("#rangeSliderDate").dateRangeSlider();
	
	// Range Slider without Arrows
    $("#rangeSliderWArrows").rangeSlider({ arrows: false });
    
    // Range Slider Formatter
    $("#rangeSliderFormatter").rangeSlider({
    	formatter:function(val){
    		var value = Math.round(val * 5) / 5,
    		decimal = value - Math.round(val);
    		return "$" + (decimal == 0 ? value.toString() + ".0" : value.toString());
    	}
    });
    
    
	// regular Range Slider
	$("#rangeSlider").rangeSlider();
	
	// edit Range Slider
	$("#rangeSliderEdit").editRangeSlider();
	
	// date Range Slider
	$("#rangeSliderDate").dateRangeSlider();
	
	// Range Slider without Arrows
    $("#rangeSliderWArrows").rangeSlider({ arrows: false });
    
    // Range Slider Formatter
    $("#rangeSliderFormatter").rangeSlider({
    	formatter:function(val){
    		var value = Math.round(val * 5) / 5,
    		decimal = value - Math.round(val);
    		return "$" + (decimal == 0 ? value.toString() + ".0" : value.toString());
    	}
    });
    
    // Range Slider Ruler
    $("#rangeSliderRuler").rangeSlider({
    	scales: [
	         // Primary scale
	         {
	        	 first: function(val){ return val; },
	        	 next: function(val){ return val + 10; },
	        	 stop: function(val){ return false; },
	        	 label: function(val){ return val; },
	        	 format: function(tickContainer, tickStart, tickEnd){ 
	        		 tickContainer.addClass("myCustomClass");
	        	 }
	         },
	         // Secondary scale
	         {
	        	 first: function(val){ return val; },
	        	 next: function(val){
	        		 if (val % 10 === 9){
	        			 return val + 2;
	        		 }
	        		 return val + 1;
	        	 },
	        	 stop: function(val){ return false; },
	        	 label: function(){ return null; }
	         }]
    });
    
    // Date Range Slider Ruler
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    $("#rangeSliderRulerDate").dateRangeSlider(
    {
    	bounds: {min: new Date(2012, 0, 1), max: new Date(2012, 11, 31, 12, 59, 59)},
    	defaultValues: {min: new Date(2012, 1, 10), max: new Date(2012, 4, 22)},
    	scales: [{
    		first: function(value){ return value; },
    		end: function(value) {return value; },
    		next: function(value){
    			var next = new Date(value);
    			return new Date(next.setMonth(value.getMonth() + 1));
    		},
    		label: function(value){
    			return months[value.getMonth()];
    		},
    		format: function(tickContainer, tickStart, tickEnd){
    			tickContainer.addClass("myCustomClass");
    		}
    	}]
    });
    
    // Range Slider Step
    $("#rangeSliderStep").rangeSlider({step: 10});
    
    // Range Slider Wheel Zoom
    $("#rangeSliderWheelZoom").rangeSlider({wheelMode: "zoom"});
    
    // Range Slider Wheel Scroll
    $("#rangeSliderWheelScroll").rangeSlider({wheelMode: "scroll", wheelSpeed: 30});

  });