(function($)
{
	$(window).on('load', function(){
		// custom select for Boostrap using dropdowns
		if ($('.selectpicker').length) 
			$('.selectpicker').selectpicker();
	})

})(jQuery);