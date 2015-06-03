(function($){

	$('[data-toggle="lock-answer"]').on('click', function(e){
		e.preventDefault();

		$(this).closest('.lock-answer').find('[data-toggle="lock-answer"]').removeClass('active');
		$(this).addClass('active');
	});

})(jQuery);