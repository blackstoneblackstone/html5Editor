$(function() 
{
	/* Plupload */
	$("#pluploadUploader").pluploadQueue({
		// General settings
		runtimes : 'gears,browserplus,html5',
		url : 'upload.php',
		max_file_size : '10mb',
		chunk_size : '1mb',
		unique_names : true,

		// Resize images on clientside if we can
		resize : {width : 320, height : 240, quality : 90},

		// Specify what files to browse for
		filters : [
			{title : "Image files", extensions : "jpg,gif,png"},
			{title : "Zip files", extensions : "zip"}
		],

		// Flash settings
		flash_swf_url : 'plupload.flash.swf',

		// Silverlight settings
		silverlight_xap_url : 'plupload.silverlight.xap'
	});

	// Client side form validation
	$('#pluploadForm').submit(function(e) {
        var uploader = $('#pluploadUploader').pluploadQueue();

        // Files in queue upload them first
        if (uploader.files.length > 0) {
            // When all files are uploaded submit form
            uploader.bind('StateChanged', function() {
                if (uploader.files.length === (uploader.total.uploaded + uploader.total.failed)) {
                    $('#pluploadForm').submit();
                }
            });
                
            uploader.start();
        } else {
            alert('You must queue at least one file.');
        }

        return false;
    });
});