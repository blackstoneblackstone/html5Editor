$(function()
{
	$('#modals-bootbox-alert').click(function()
	{
		bootbox.alert("Hello World!", function(result) 
		{
			$.gritter.add({
				title: 'Callback!',
				text: "I'm just a BootBox Alert callback!"
			});
		});
	});
	$('#modals-bootbox-confirm').click(function()
	{
		bootbox.confirm("Are you sure?", function(result) 
		{
			$.gritter.add({
				title: 'Callback!',
				text: "BootBox Confirm Callback with result: "+ result
			});
		});
	});
	$('#modals-bootbox-prompt').click(function()
	{
		bootbox.prompt("What is your name?", function(result) 
		{                
			if (result === null) {                                             
				$.gritter.add({
					title: 'Callback!',
					text: "BootBox Prompt Dismissed!"
				});                            
			} else {
				$.gritter.add({
					title: 'Hi ' + result,
					text: "BootBox Prompt Callback with result: "+ result
				});                          
			}
		});
	});
	$('#modals-bootbox-custom').click(function()
	{
		bootbox.dialog({
		  	message: "I am a custom dialog",
		  	title: "Custom title",
		  	buttons: {
		    	success: {
		      		label: "Success!",
		      		className: "btn-success",
		      		callback: function() {
		        		$.gritter.add({
							title: 'Callback!',
							text: "Great success"
						});
		      		}
		    	},
			    danger: {
			      	label: "Danger!",
			      	className: "btn-danger",
			      	callback: function() {
			        	$.gritter.add({
							title: 'Callback!',
							text: "Uh oh, look out!"
						});
			      	}
			    },
			    main: {
			      	label: "Click ME!",
			      	className: "btn-primary",
			      	callback: function() {
			        	$.gritter.add({
							title: 'Callback!',
							text: "Primary button!"
						});
			      	}
			    }
			}
		});
	});
});