$(function()
{
	/*
	 * Input Masks
	 */
	$.extend($.inputmask.defaults, {
        'autounmask': true
    });

	$("#inputmask-date").inputmask("d/m/y", {autoUnmask: true});
    $("#inputmask-date-1").inputmask("d/m/y",{ "placeholder": "*"});
    $("#inputmask-date-2").inputmask("d/m/y",{ "placeholder": "dd/mm/yyyy" });
    $("#inputmask-phone").inputmask("mask", {"mask": "(999) 999-9999"});
    $("#inputmask-tax").inputmask({"mask": "99-9999999"});
    $("#inputmask-decimal").inputmask('decimal', { rightAlignNumerics: false });
    $("#inputmask-currency").inputmask('\u20AC 999,999,999.99', { numericInput: true, rightAlignNumerics: false, greedy: false});
    $("#inputmask-ssn").inputmask("999-99-9999", {clearMaskOnLostFocus: true });

});