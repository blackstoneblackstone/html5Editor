(function($) 
{
	if (typeof Dropzone != 'undefined')
		Dropzone.autoDiscover = false;
	
	if ($.fn.dropzone != 'undefined')
		$('.dropzone').dropzone();
})(jQuery);