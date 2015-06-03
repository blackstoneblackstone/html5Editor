/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('music', function (K) {
    var self = this, name = 'music',
		allowImageUpload = K.undef(self.allowImageUpload, true),
		formatUploadUrl = K.undef(self.formatUploadUrl, true),
		allowFileManager = K.undef(self.allowFileManager, false),
		uploadJson = K.undef(self.uploadJson, self.basePath + 'php/upload_json.php'),
		 
		extraParams = K.undef(self.extraFileUploadParams, {}),
		filePostName = K.undef(self.filePostName, 'imgFile'),
		fillDescAfterUploadImage = K.undef(self.fillDescAfterUploadImage, false);

	self.plugin.musicDialog = function(options) {
		var musicUrl = options.musicUrl,
			imageWidth = K.undef(options.imageWidth, ''),
			imageHeight = K.undef(options.imageHeight, ''),
			imageTitle = K.undef(options.imageTitle, ''),
			imageAlign = K.undef(options.imageAlign, ''),
			showRemote = K.undef(options.showRemote, true),
			showLocal = K.undef(options.showLocal, true),
			tabIndex = K.undef(options.tabIndex, 0),
			clickFn = options.clickFn;
		var target = 'kindeditor_upload_iframe_' + new Date().getTime();
		var hiddenElements = [];
		for(var k in extraParams){
			hiddenElements.push('<input type="hidden" name="' + k + '" value="' + extraParams[k] + '" />');
		}
		var html = [
			'<div style="padding:20px;">',
			//tabs
			'<div class="tabs"></div>',
			//remote image - start
			'<div class="tab1" style="display:none;">',
			//url
			'<div class="ke-dialog-row">',
			'<label for="remoteUrl" style="width:60px;">网络音乐</label>',
			'<input type="text" id="remoteUrl" class="ke-input-text" name="url" value="" style="width:200px;" /> &nbsp;',
			'<span class="ke-button-common ke-button-outer">',
			'<input type="button" class="ke-button-common ke-button" name="viewServer" value="空间音乐" />',
			'</span>',
			'</div>',
			//size
			'<div class="ke-dialog-row">',
		     '<label   style="width:60px;">自动播放</label> <input type="radio" name="autoplay" class="ke-inline-block" value="0" checked="checked"> 否 <input type="radio" name="autoplay" class="ke-inline-block" value="1" > 是',
			 
			 
			'</div>',
			 
			'</div>',
			//remote image - end
			//local upload - start
			'<div class="tab2" style="display:none;">',
			'<iframe name="' + target + '" style="display:none;"></iframe>',
			'<form class="ke-upload-area ke-form" method="post" enctype="multipart/form-data" target="' + target + '" action="' + K.addParam(uploadJson, 'dir=mp3') + '">',
			//file
			'<div class="ke-dialog-row">',
			hiddenElements.join(''),
			'<label style="width:60px;">上传文件</label>',
			'<input type="text" name="localUrl" class="ke-input-text" tabindex="-1" style="width:200px;" readonly="true" /> &nbsp;',
			'<input type="button" class="ke-upload-button" value="浏览..." />',
			'</div>',
			'</form>',
			'</div>',
			//local upload - end
			'</div>'
		].join('');
		var dialogWidth = showLocal || allowFileManager ? 450 : 250,
			dialogHeight = showLocal && showRemote ? 200 : 250;
		var dialog = self.createDialog({
			name : name,
			width : dialogWidth,
			height : dialogHeight,
			title: '选择音乐',
			body : html,
			yesBtn : {
				name : "确定",
				click : function(e) {
					// Bugfix: http://code.google.com/p/kindeditor/issues/detail?id=319
					if (dialog.isLoading) {
						return;
					}
					// insert local image
					if (showLocal && showRemote && tabs && tabs.selectedIndex === 1 || !showRemote) {
						if (uploadbutton.fileBox.val() == '') {
							alert("请选择音乐");
							return;
						}
						dialog.showLoading("上传中，请稍候 ...");
						uploadbutton.submit();
						localUrlBox.val('');
						return;
					}
					// insert remote image
					var url = K.trim(urlBox.val()), 
						autoplay = '';
					autoplaybox.each(function() {
						if (this.checked) {
							autoplay = this.value;
							return false;
						}
					});
					if (url == 'http://' || K.invalidUrl(url)) {
						alert("请输入有效的URL地址。");
						urlBox[0].focus();
						return;
					} 
					clickFn.call(self, url, autoplay);
				}
			},
			beforeRemove : function() {
				viewServerBtn.unbind();
				autoplaybox.unbind(); 
				refreshBtn.unbind();
			}
		}),
		div = dialog.div;

		var urlBox = K('[name="url"]', div),
			localUrlBox = K('[name="localUrl"]', div),
			viewServerBtn = K('[name="viewServer"]', div), 
			refreshBtn = K('.ke-refresh-btn', div), 
			autoplaybox = K('.tab1 [name="autoplay"]', div);

		var tabs;
		if (showRemote && showLocal) {
			tabs = K.tabs({
				src : K('.tabs', div),
				afterSelect : function(i) {}
			});
			tabs.add({
				title : "网络音乐",
				panel : K('.tab1', div)
			});
			tabs.add({
				title : "本地上传",
				panel : K('.tab2', div)
			});
			tabs.select(tabIndex);
		} else if (showRemote) {
			K('.tab1', div).show();
		} else if (showLocal) {
			K('.tab2', div).show();
		}

		var uploadbutton = K.uploadbutton({
			button : K('.ke-upload-button', div)[0],
			fieldName : filePostName,
			form : K('.ke-form', div),
			target : target,
			width: 60,
			afterUpload : function(data) {
				dialog.hideLoading();
				if (data.error === 0) {
					var url = data.url;
					if (formatUploadUrl) {
					    url = K.formatUrl(url, 'domain');
					} 
					if (self.afterUpload) {
						self.afterUpload.call(self, url, data, name);
					}
					if (!fillDescAfterUploadImage) {
						clickFn.call(self, url, data.title, data.width, data.height, data.border, data.align);
					} else {
						K(".ke-dialog-row #remoteUrl", div).val(url);
						K(".ke-tabs-li", div)[0].click();
						K(".ke-refresh-btn", div).click();
					}
				} else {
					alert(data.message);
				}
			},
			afterError : function(html) {
				dialog.hideLoading();
				self.errorDialog(html);
			}
		});
		uploadbutton.fileBox.change(function(e) {
			localUrlBox.val(uploadbutton.fileBox.val());
		});
		if (allowFileManager) {
			viewServerBtn.click(function(e) {
				self.loadPlugin('filemanager', function() {
					self.plugin.filemanagerDialog({
					    viewType: 'LIST',
						dirName : 'mp3',
						clickFn : function(url, title) {
							if (self.dialogs.length > 1) {
								K('[name="url"]', div).val(url);
								if (self.afterSelectFile) {
									self.afterSelectFile.call(self, url);
								}
								self.hideDialog();
							}
						}
					});
				});
			});
		} else {
			viewServerBtn.hide();
		}
		 
		urlBox.val(options.musicUrl); 
		autoplaybox.each(function() {
			if (this.value === options.autoplay) {
				this.checked = true;
				return false;
			}
		});
		if (showRemote && tabIndex === 0) {
			urlBox[0].focus();
			urlBox[0].select();
		}
		return dialog;
	};
	self.plugin.music = {
		edit : function() {
			var img = self.plugin.getSelectedAudio();
			self.plugin.musicDialog({
				musicUrl : img ? img.attr('data-ke-src') : 'http://',  
				clickFn : function(url, autoplay) { 
					self.exec('insertmusic', url, autoplay);
					// Bugfix: [Firefox] 上传图片后，总是出现正在加载的样式，需要延迟执行hideDialog
					setTimeout(function() {
						self.hideDialog().focus();
					}, 0);
				}
			});
		},
		'delete' : function() {
			var target = self.plugin.getSelectedAudio();
			if (target.parent().name == 'a') {
				target = target.parent();
			}
			target.remove();
			// [IE] 删除图片后立即点击图片按钮出错
			self.addBookmark();
		}
	};
	self.clickToolbar(name, self.plugin.music.edit);
});

