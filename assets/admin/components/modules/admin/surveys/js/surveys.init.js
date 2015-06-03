(function($){

	$('[data-toggle="survey-answer"]').on('click', function(e){
		e.preventDefault();

		$(this).closest('.survey-answer').find('[data-toggle="survey-answer"]').removeClass('active');
		$(this).addClass('active');
	});

})(jQuery);