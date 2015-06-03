(function($)
{

	window.email = {
		enableResponsiveViews: function(){
			$('.email .email-item-list .list-group-item').on('click', function(e){
				e.preventDefault();
				$('#email_details').addClass('open');
				$('#email_list').addClass('hidden-xs hidden-sm');
				scrollTo('#email_details');
			});
			$('#close-email-details').on('click', function(){
				$('#email_details').removeClass('open');
				$('#email_list').removeClass('hidden-xs hidden-sm');
			});
		},
		disableResponsiveViews: function(){
			$('.email .email-item-list .list-group-item').off('click');
			$('#close-email-details').off('click');
			$('#email_details').removeClass('open');
			$('#email_list').removeClass('hidden-xs hidden-sm');
		}
	};

	// $(window).setBreakpoints({
	// 	distinct: false,
	// 	breakpoints: [
	// 		992
	// 	]
	// });

	$(window).bind('exitBreakpoint992',function() {
		window.email.enableResponsiveViews();
	});

	$(window).bind('enterBreakpoint992',function() {
		window.email.disableResponsiveViews();
	});

	$(window).on('load', function(){
		if ($(window).width() <= 991)
			window.email.enableResponsiveViews();
	});

})(jQuery);