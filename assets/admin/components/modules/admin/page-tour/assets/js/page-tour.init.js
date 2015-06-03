$(function()
{
	if (!$('#tlyPageGuide').length)
		return false;
	
	tl.pg.init({
		custom_open_button: '#tour-demo-start',
		targetInside: typeof pageGuideTarget != 'undefined' ? pageGuideTarget : 'body'
	});
	
	setTimeout(function(){
		$('#tour-demo-start').click();
	}, 1000);

});