(function($)
{
	if (typeof $.fn.bootstrapSwitch != 'undefined' && $('.make-switch').length)
		$('.make-switch:not(.has-switch)').bootstrapSwitch();
})(jQuery);