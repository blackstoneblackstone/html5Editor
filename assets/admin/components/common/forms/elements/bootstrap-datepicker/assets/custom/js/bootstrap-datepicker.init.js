if (typeof $.fn.bdatepicker == 'undefined')
	$.fn.bdatepicker = $.fn.datepicker.noConflict();

$(function()
{

	/* DatePicker */
	// default
	$("#datepicker1").bdatepicker({
		format: 'yyyy-mm-dd',
		startDate: "2013-02-14"
	});

	// component
	$('#datepicker2').bdatepicker({
		format: "dd MM yyyy",
		startDate: "2013-02-14"
	});

	// today button
	$('#datepicker3').bdatepicker({
		format: "dd MM yyyy",
		startDate: "2013-02-14",
		todayBtn: true
	});

	// advanced
	$('#datetimepicker4').bdatepicker({
		format: "dd MM yyyy - hh:ii",
        autoclose: true,
        todayBtn: true,
        startDate: "2013-02-14 10:00",
        minuteStep: 10
	});
	
	// meridian
	$('#datetimepicker5').bdatepicker({
		format: "dd MM yyyy - HH:ii P",
	    showMeridian: true,
	    autoclose: true,
	    startDate: "2013-02-14 10:00",
	    todayBtn: true
	});

	// other
	if ($('#datepicker').length) $("#datepicker").bdatepicker({ showOtherMonths:true });
	if ($('#datepicker-inline').length) $('#datepicker-inline').bdatepicker({ inline: true, showOtherMonths:true });

});