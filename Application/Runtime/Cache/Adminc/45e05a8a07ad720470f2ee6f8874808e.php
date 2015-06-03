<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head><meta charset="utf-8" /><title>
	后台管理
</title>
      <script src="/assets/admin/js/listTable.js" type="text/javascript"></script>

    
    <script src="/Public/js/jquery-1.7.1.min.js" type="text/javascript"></script>
 
    <link rel="Stylesheet" href="/assets/admin/css/main.css" /><link rel="stylesheet" type="text/css" href="/assets/admin/css/layout_head.css" /><link rel="stylesheet" type="text/css" href="/assets/admin/css/base.css" /><link rel="stylesheet" type="text/css" href="/assets/admin/css/model.css" />
<style type="text/css">
.thbnail{ max-height:70px; max-width:100px}
</style>
     

</head>

	<script src="/Public/kindeditor/kindeditor.js"></script>
	<script src="/Public/kindeditor/lang/zh_CN.js"></script>
	<script src="/Public/kindeditor/plugins/code/prettify.js"></script>
	<link rel="stylesheet" href="/Public/kindeditor/themes/default/default.css" />
	<link rel="stylesheet" href="/Public/kindeditor/plugins/code/prettify.css" /> 
	
	<script>
	
	host = window.location.host;
	
	KindEditor.ready(function(K){
	
    var editor = K.editor({
      allowFileManager:true
    });
	
	 K('#erweima_upload').click(function() {
	 
      editor.loadPlugin('image', function() {
        editor.plugin.imageDialog({
          fileUrl : K('#bg_pic2').val(),
          clickFn : function(url, title) {
            if(url.indexOf("http") > -1){
              K('#bg_pic2').val(url);
            }else{
              K('#bg_pic2').val("http://"+host+url);
            }
            editor.hideDialog();
          }
        });
      });
    });
	
    
  });
  
 
  
</script>
	
	
<body>
    
     <!--内容显示 Begin-->
    <div class="col_main">
        <input name="ctl00$ContentPlaceHolder1$txt" type="hidden" id="ctl00_ContentPlaceHolder1_txt" />
        <div class="main_hd">
            <div class="title_tab" id="topTab">
                <ul class="tab_navs mt title_tab">
                    <li class="tab_nav js_top  selected" data-id="mphelper"><a href="javascript:void(0);">
                        网站设置</a></li>
                </ul>
            </div>
             
        </div>
        
        
        
       <form action="" method="post">
        <div style="text-align: left; padding: 20px; text-align: left;">
           
            
             
             
            <!--打印帮助关键字配置-->
          
            <hr style="width: 50%; size: 1px; border: none;" />
            <table style="vertical-align: top;">
                <tr>
                    <td style="width: 148px;">
                        网站标题
                    </td>
                    <td>
                          <span class="frm_input_box">
                            <input name="user[web_title]" type="text"   class="frm_input"   value="<?php echo ($user["web_title"]); ?>" /></span>
                    </td>
                </tr>
                <tr>
                    <td style="width: 148px;">
                        网站域名
                    </td>
                    <td>
                          <span class="frm_input_box">
                            <input name="user[web_site]" type="text"   class="frm_input"   value="<?php echo ($user["web_site"]); ?>" /></span>
                    </td>
                </tr>
				
				<tr>
                    <td>
					logo地址
                    </td>				
                    <td>
					 <input type="text" name="user[web_logo]" value="<?php echo ($user["web_logo"]); ?>" id="bg_pic2" class="px" >                
                      <span class="ke-button-common" id="erweima_upload" >
                        <input type="button" class="btn-info" value="点击上传"> 
                      </span>&nbsp&nbsp尺寸为190*45px的透明图片
                    </td>
                </tr>

                <tr>
                    <td style="width: 148px;">
                        版权所有
                    </td>
                    <td>
                          <span class="frm_input_box">
                            <input name="user[web_copyright]" type="text"   class="frm_input"   value="<?php echo ($user["web_copyright"]); ?>" /></span>
                    </td>
                </tr>
                <tr>
                    <td style="width: 148px;">
                        QQ
                    </td>
                    <td>
                          <span class="frm_input_box">
                            <input name="user[web_qq]" type="text"   class="frm_input"   value="<?php echo ($user["web_qq"]); ?>" /></span>
                    </td>
                </tr>
                <tr>
                    <td style="width: 148px;">
                        邮箱
                    </td>
                    <td>
                          <span class="frm_input_box">
                            <input name="user[web_mail]" type="text"   class="frm_input"   value="<?php echo ($user["web_mail"]); ?>" /></span>
                    </td>
                </tr>
                <tr>
                    <td style="width: 148px;">
                        电话
                    </td>
                    <td>
                          <span class="frm_input_box">
                            <input name="user[web_phone]" type="text"   class="frm_input"   value="<?php echo ($user["web_phone"]); ?>" /></span>
                    </td>
                </tr>
                <tr>
                    <td style="width: 148px;">
                        联系地址
                    </td>
                    <td>
                          <span class="frm_input_box">
                            <input name="user[web_address]" type="text"   class="frm_input"   value="<?php echo ($user["web_address"]); ?>" /></span>
                    </td>
                </tr>
                <tr>
                    <td style="width: 148px;">
                        备案号
                    </td>
                    <td>
                          <span class="frm_input_box">
                            <input name="user[web_ipc]" type="text"   class="frm_input"   value="<?php echo ($user["web_ipc"]); ?>" /></span>
                    </td>
                </tr>

				<tr>
                    <td style="width: 148px;">
                        appid
                    </td>
                    <td>
                          <span class="frm_input_box">
                            <input name="user[web_appid]" type="text"   class="frm_input"   value="<?php echo ($user["web_appid"]); ?>" /></span>
                    </td>
                </tr>

				<tr>
                    <td style="width: 148px;">
                        appsecret
                    </td>
                    <td>
                          <span class="frm_input_box">
                            <input name="user[web_appsecret]" type="text"   class="frm_input"   value="<?php echo ($user["web_appsecret"]); ?>" /></span>
                    </td>
                </tr>				
				
				
                <tr>
                    <td >
                        关键词
                    </td>
                    <td>
                        <span class="frm_input_box">
                            <input name="user[web_keywords]" type="text"   class="frm_input"   value="<?php echo ($user["web_keywords"]); ?>" /></span>
   
                    </td>
                </tr>
                <tr>
                    <td>
                         描述
                    </td>
                    <td>
                         
                         <textarea name="user[web_description]" rows="10" cols="70"><?php echo ($user["web_description"]); ?></textarea>
                            
                    </td>
                </tr>
                
                  <tr>
                    <td>
                         是否开启会员注册 
                    </td>
                    <td> 
                        <input type="radio" value="1" name="user[is_open_reg]" <?php if($user[is_open_reg]==1): ?>   checked='checked'  <?php endif; ?> > 开启    <input type="radio" value="0" name="user[is_open_reg]" <?php if($user[is_open_reg]==0): ?>   checked='checked'  <?php endif; ?> >      关闭  
                    </td>
                </tr>
                 <tr>
                    <td >
                        去广告的秀点
                    </td>
                    <td>
                        <span class="frm_input_box">
                            <input name="user[qi_ad_xds]" type="text"   class="frm_input"   value="<?php echo ($user["qi_ad_xds"]); ?>" /></span>
   
                    </td>
                </tr>
                  <tr>
                    <td>
                         是否开启案例审核
                    </td>
                    <td> 
                        <input type="radio" value="1" name="user[is_user_anli_shenghe]" <?php if($user[is_user_anli_shenghe]==1): ?>   checked='checked'  <?php endif; ?> > 开启    <input type="radio" value="0" name="user[is_user_anli_shenghe]"   <?php if($user[is_user_anli_shenghe]==0): ?>   checked='checked'  <?php endif; ?>  > 关闭  
                    </td>
                </tr>
               
            </table>
          <div class="tool_bar border with_form">
                <span id="Span1" class="btn btn_primary btn_input">
                         <input type="hidden"  name="id" value="<?php echo ($user["id"]); ?>" />
                    <input type="submit" name=" " value="保存"   /></span>
            </div>
        </div>
        </form>
        
    </div>
    <!--内容显示 End-->


 
</body>
</html>