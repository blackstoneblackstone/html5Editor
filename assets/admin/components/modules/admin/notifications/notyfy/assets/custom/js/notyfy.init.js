$(function()
{
	$('[data-toggle="notyfy"]').click(function () 
	{
		var self = $(this);
		if(self.data('layout') == 'inline') 
		{
			$(self.data('custom')).notyfy(
			{
				text: text[self.data('type')],
				type: self.data('type'),
				dismissQueue: true,
				buttons: (self.data('type') != 'confirm') ? false : [{
					addClass: 'btn btn-success btn-small glyphicons btn-icon ok_2',
					text: '<i></i> Ok',
					onClick: function ($notyfy) {
						$notyfy.close();
						$(self.data('custom')).notyfy({
							force: true,
							text: 'You clicked "<strong>Ok</strong>" button.',
							type: 'success'
						});
					}
				}, {
					addClass: 'btn btn-danger btn-small glyphicons btn-icon remove_2',
					text: 'Cancel',
					onClick: function ($notyfy) {
						$notyfy.close();
						$(self.data('custom')).notyfy({
							force: true,
							text: 'You clicked "Cancel" button',
							type: 'error'
						});
					}
				}]
			});
			return false;
		}

		notyfy({
			text: notification[self.data('type')],
			type: self.data('type'),
			dismissQueue: true,
			layout: self.data('layout'),
			buttons: (self.data('type') != 'confirm') ? false : [{
				addClass: 'btn btn-success btn-small btn-icon glyphicons ok_2',
				text: '<i></i> Ok',
				onClick: function ($notyfy) {
					$notyfy.close();
					notyfy({
						force: true,
						text: 'You clicked "<strong>Ok</strong>" button',
						type: 'success',
						layout: self.data('layout')
					});
				}
			}, {
				addClass: 'btn btn-danger btn-small btn-icon glyphicons remove_2',
				text: '<i></i> Cancel',
				onClick: function ($notyfy) {
					$notyfy.close();
					notyfy({
						force: true,
						text: '<strong>You clicked "Cancel" button<strong>',
						type: 'error',
						layout: self.data('layout')
					});
				}
			}]
		});
		return false;
	});
	
var notification = [];

notification['alert'] = 'Best check yo self, you\'<strong>re not looking too good</strong>.';
notification['primary'] = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
notification['error'] = '<strong>Change a few things up and try submitting again.</strong> This Error message.';
notification['success'] = 'You <strong>successfully</strong> read this important alert message.';
notification['information'] = 'This alert needs your attention, but it\'s not super <strong>important</strong>.';
notification['warning'] = '<strong>Warning!</strong> Best check yo self, you\'re not looking too good.';
notification['confirm'] = 'Do you want to continue?';

});