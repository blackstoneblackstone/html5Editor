(function($)
{
	var imageCropObj = {
		
		$preview: null,
		$pcnt: null,
		$pimg: null,
		xsize: null,
		ysize: null,

		init: function () 
		{
	        this.$preview = $('#preview-pane'),
	        this.$pcnt = $('#preview-pane .preview-container'),
	        this.$pimg = $('#preview-pane .preview-container img'),

	        this.xsize = this.$pcnt.width(),
	        this.ysize = this.$pcnt.height();

	        this.handleTarget1();
	        this.handleTarget2();
		},
		handleTarget1: function ()
		{
			$('#jcrop-target-1').Jcrop({},function(){
				api = this;
				api.setSelect([130,65,130+350,65+285]);
				api.setOptions({ bgFade: true });
				api.ui.selection.addClass('jcrop-selection');
			});
		},
		handleTarget2: function ()
		{
			var that = this;
		    $('#jcrop-target-2').Jcrop(
		    {
		    	onChange: that.updatePreview,
		    	onSelect: that.updatePreview,
		    	aspectRatio: that.xsize / that.ysize
		    },
		    function()
		    {
		    	// Use the API to get the real image size
		    	var bounds = this.getBounds();
		    	that.boundx = bounds[0];
		    	that.boundy = bounds[1];

		    	// Store the API in the jcrop_api variable
		    	that.jcrop_api = this;
		    	
		    	that.jcrop_api.setSelect([130,65,130+350,65+285]);
		    	that.jcrop_api.setOptions({ bgFade: true });
		    	that.jcrop_api.ui.selection.addClass('jcrop-selection');

		    	// Move the preview into the jcrop container for css positioning
		    	that.$preview.appendTo(that.jcrop_api.ui.holder);
		    });
		},
		updatePreview: function (c)
		{
			if (parseInt(c.w) > 0)
			{
				var rx = imageCropObj.xsize / c.w;
				var ry = imageCropObj.ysize / c.h;

				imageCropObj.$pimg.css({
					width: Math.round(rx * imageCropObj.boundx) + 'px',
					height: Math.round(ry * imageCropObj.boundy) + 'px',
					marginLeft: '-' + Math.round(rx * c.x) + 'px',
					marginTop: '-' + Math.round(ry * c.y) + 'px'
				});
			}
		}
	};
	
	$(window).on('load', function() {
		setTimeout(function(){
			imageCropObj.init();
		}, 100);
	});

})(jQuery);