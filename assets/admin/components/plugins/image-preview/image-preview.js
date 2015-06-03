this.imagePreview = function()
{	
	xOffset = 30;
	yOffset = 30;

	that = this;
	to = null;

	function show (el, e) 
	{
		el = $(el);
		that.t = el.attr('data-title') || "";
		that.d = el.attr('data-content') || "";

		var c = "<h4>" + that.t + "</h4>";
		var d = that.d ? "<p>" + that.d + "</p>" : '';
		$("body").append("<div id='image-preview'><img src='"+ el.attr('data-image-preview') +"' alt='Image preview' class='img-responsive' />"+ c + d +"</div>");

		$("#image-preview")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px")
			.fadeIn("fast");

			moveIntoView('#image-preview', e.pageX, e.pageY, xOffset);
	}
	
	$('[data-toggle="image-preview"]').on('mousemove', function(e)
	{
		that.t = "";
		that.d = "";
		tthat = this;

		that.to = clearTimeout(that.to);
		that.to = setTimeout(function(){
			show(tthat, e);
		}, 300);
    })
	.on('mouseleave', function()
	{
		that.t = "";
		that.d = "";
		that.to = clearTimeout(that.to);
		$("#image-preview").remove();
    });

	function moveIntoView (elem, pageX, pageY, xOffset)
	{
	    var w = $(window),
	      	elem = $(elem),
	      	docViewTop = w.scrollTop(),
	      	docViewBottom = docViewTop + w.height(),
	      	elTop = pageY,
	      	elBottom = elTop + elem.outerHeight();

	    if(pageX + elem.outerWidth() > w.width())
    	{
	    	elem.css("left", pageX - elem.outerWidth() - xOffset);
    	}

    	if((docViewTop <= elTop) && (docViewBottom >= elBottom))
    	{
	    	elem.css("top", pageY - xOffset);
	    	return;
    	}

	    elem.css("top", pageY - (elBottom - docViewBottom) - xOffset);
	}
};

$(document).ready(function()
{
	if (!Modernizr.touch)
		imagePreview();
});