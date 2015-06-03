(function($)
{
	$('#widget-progress-bar .progress-bar').width("50%");
	setInterval(function(){
		var w = mt_rand(30, 100);
		$('#widget-progress-bar .steps-percent').html(w + "%");
		$('#widget-progress-bar .progress-bar').width(w + "%");
	}, 2000);
})(jQuery);