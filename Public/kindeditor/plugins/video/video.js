/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/
function handleTencentVideo(link, callback, arg_obj) {
        var vid = "",
            r, flashvars = "",
            return_url, width = arg_obj['width'],
            height = arg_obj['height'];
        //with vid in url query str
        if (r = link.match(new RegExp("(^|&|\\\\?)vid=([^&]*)(&|$|#)"))) {
            vid = encodeURIComponent(r[2]);
            return_url = 'http://v.qq.com/iframe/player.html?vid=' + vid + '&width=' + width + '&height=' + height + '&auto=0';
            callback(return_url, arg_obj);
        }
        //with cid in url
        else if (r = link.match(new RegExp("(http://)?v\\.qq\\.com/cover[^/]*/\\w+/([^/]*)\\.html"))) {
            var cid = encodeURIComponent(r[2]),
                path = 'http://sns.video.qq.com/fcgi-bin/dlib/dataout_ex?auto_id=137&cid=' + cid + '&otype=json';
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = path;
            script.async = true;

            if (script.onreadystatechange !== undefined) { //ie
                script.onreadystatechange = function() {
                    if (script.readyState == 'loaded') {
                        try {
                            vid = QZOutputJson['videos'][0]['vid'];
                            return_url = 'http://v.qq.com/iframe/player.html?vid=' + vid + '&width=' + width + '&height=' + height + '&auto=0';
                            callback(return_url, arg_obj);
                        } catch (err) {}
                    }
                }
            } else { //others
                script.onload = function() {
                    try {
                        vid = QZOutputJson['videos'][0]['vid'];
                        return_url = 'http://v.qq.com/iframe/player.html?vid=' + vid + '&width=' + width + '&height=' + height + '&auto=0';
                        callback(return_url, arg_obj);
                    } catch (err) {}
                };
            }


            head.appendChild(script);
        }
        //with vid in url
        else if (r = link.match(new RegExp("(http://)?v\\.qq\\.com/(.*)/(.*)\\.html"))) {
            vid = encodeURIComponent(r[3]);
            return_url = 'http://v.qq.com/iframe/player.html?vid=' + vid + '&width=' + width + '&height=' + height + '&auto=0';
            callback(return_url, arg_obj);
        }
    }
    var video_html;
    function createPreviewVideoCallback(url,arg_obj) { 
        video_html='<iframe height=' + arg_obj.height + ' width=' +arg_obj.width + ' frameborder=0 src="' + url + '" allowfullscreen></iframe>';
    }
    function convert_url(url, callback, arg_obj) {
        url = url.replace(/^\s+|\s+$/g, '');
        url = url.replace(/^v\.qq\.com/, 'http://v.qq.com');
        var result_url = url;
        if (url.indexOf('http://v.qq.com') != -1) {
            handleTencentVideo(url, callback, arg_obj);
        }
        /*
        else
        {
            return_url = url.replace(/http:\/\/www\.youku\.com\/watch\?v=([\w\-]+)/i, "http://player.youku.com/embed/$1")
            .replace(/http:\/\/v\.youku\.com\/v_show\/id_([\w\-]+)\.html/i, "http://player.youku.com/embed/$1");
            callback( return_url, arg_obj );
        }
        */

    }

KindEditor.plugin('video', function(K) {
	var self = this, name = 'video', lang = self.lang(name + '.'),
		allowvideoUpload = K.undef(self.allowvideoUpload, true),
		allowFileManager = K.undef(self.allowFileManager, false),
		formatUploadUrl = K.undef(self.formatUploadUrl, true),
		extraParams = K.undef(self.extraFileUploadParams, {}),
		filePostName = K.undef(self.filePostName, 'imgFile'),
		uploadJson = K.undef(self.uploadJson, self.basePath + 'php/upload_json.php');
	self.plugin.video = {
		edit : function() {
			var html = [
				'<div style="padding:20px;">',
				'<div class="ke-dialog-row">',
				'目前微信只支持<a href="http://v.qq.com/" target="_blank">腾讯视频</a>，请把视频上传到腾讯视频然后复制网站(v.qq.com开头的地址)到URL',
				 
				'</div>',
				//url
				'<div class="ke-dialog-row">',
				'<label for="keUrl" style="width:60px;">' + lang.url + '</label>',
				'<input class="ke-input-text" type="text" id="keUrl" name="url" value="" style="width:220px;" /> &nbsp;',
				/*'<input type="button" class="ke-upload-button" value="' + lang.upload + '" /> &nbsp;',
				'<span class="ke-button-common ke-button-outer">',
				'<input type="button" class="ke-button-common ke-button" name="viewServer" value="' + lang.viewServer + '" />',
				'</span>',*/
				'</div>',
				//width
				'<div class="ke-dialog-row">',
				'<label for="keWidth" style="width:60px;">' + lang.width + '</label>',
				'<input type="text" id="keWidth" class="ke-input-text ke-input-number" name="width" value="300" maxlength="4" /> ',
				'</div>',
				//height
				'<div class="ke-dialog-row">',
				'<label for="keHeight" style="width:60px;">' + lang.height + '</label>',
				'<input type="text" id="keHeight" class="ke-input-text ke-input-number" name="height" value="200" maxlength="4" /> ',
				'</div>',
				'</div>'
			].join('');
			var dialog = self.createDialog({
				name : name,
				width : 450,
				title : self.lang(name),
				body : html,
				yesBtn : {
					name : self.lang('yes'),
					click : function(e) {
						var url = K.trim(urlBox.val()),
							width = widthBox.val(),
							height = heightBox.val();
						if (url == 'http://' || K.invalidUrl(url)) {
							alert(self.lang('invalidUrl'));
							urlBox[0].focus();
							return;
						}
						if (!/^\d*$/.test(width)) {
							alert(self.lang('invalidWidth'));
							widthBox[0].focus();
							return;
						}
						if (!/^\d*$/.test(height)) {
							alert(self.lang('invalidHeight'));
							heightBox[0].focus();
							return;
						}
					    convert_url(url,createPreviewVideoCallback,{
				               width: width,
				               height: height
		                }) 
						self.insertHtml(video_html).hideDialog().focus();
					}
				}
			}),
			div = dialog.div,
			urlBox = K('[name="url"]', div),
			viewServerBtn = K('[name="viewServer"]', div),
			widthBox = K('[name="width"]', div),
			heightBox = K('[name="height"]', div);
			urlBox.val('http://');

			if (allowvideoUpload) {
				var uploadbutton = K.uploadbutton({
					button : K('.ke-upload-button', div)[0],
					fieldName : filePostName,
					extraParams : extraParams,
					url : K.addParam(uploadJson, 'dir=video'),
					afterUpload : function(data) {
						dialog.hideLoading();
						if (data.error === 0) {
							var url = data.url;
							if (formatUploadUrl) {
								url = K.formatUrl(url, 'absolute');
							}
							urlBox.val(url);
							if (self.afterUpload) {
								self.afterUpload.call(self, url, data, name);
							}
							alert(self.lang('uploadSuccess'));
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
					dialog.showLoading(self.lang('uploadLoading'));
					uploadbutton.submit();
				});
			} else {
				K('.ke-upload-button', div).hide();
			}

			if (allowFileManager) {
				viewServerBtn.click(function(e) {
					self.loadPlugin('filemanager', function() {
						self.plugin.filemanagerDialog({
							viewType : 'LIST',
							dirName : 'video',
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

			var img = self.plugin.getSelectedvideo();
			if (img) {
				var attrs = K.mediaAttrs(img.attr('data-ke-tag'));
				urlBox.val(attrs.src);
				widthBox.val(K.removeUnit(img.css('width')) || attrs.width || 0);
				heightBox.val(K.removeUnit(img.css('height')) || attrs.height || 0);
			}
			urlBox[0].focus();
			urlBox[0].select();
		},
		'delete' : function() {
			self.plugin.getSelectedvideo().remove();
			// [IE] 删除图片后立即点击图片按钮出错
			self.addBookmark();
		}
	};
	self.clickToolbar(name, self.plugin.video.edit);
});
