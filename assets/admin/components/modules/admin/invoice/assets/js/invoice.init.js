(function($)
{
	function PDFTarget(target)
	{
		var doc = $('html').clone();
		var target = $(target).clone();
		var form = $('#PDFTargetForm');
		if (!form.length) {
			$('<form id="PDFTargetForm"></form>').appendTo('body');
			form = $('#PDFTargetForm');
		}
		
		form.attr('action', rootPath + 'admin/php/pdf.php');
		form.attr('method', 'POST');
		$('<input type="hidden" name="target" value="" />').appendTo(form);
		
		target.find('.hidden-print').remove();
		doc.find('body').html(target);
		var html = doc.html();
		
		form.find('input').val(html);
		form.submit();
	}

	// save to PDF
	$('[data-toggle*="pdf"]').on('click', function(e){
		e.preventDefault();
		PDFTarget($(this).attr('data-target'));
	});
})(jQuery);