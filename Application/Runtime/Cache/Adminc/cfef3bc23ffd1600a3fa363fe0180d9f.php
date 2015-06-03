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
<body>
<script src="http://demo.aeys.net/tpl/static/artDialog/jquery.artDialog.js?skin=default"></script>
<script src="http://demo.aeys.net/tpl/static/artDialog/plugins/iframeTools.js"></script>
<div class="col_main">
        <div class="main_hd">
            <div class="title_tab" id="topTab">
                <ul class="tab_navs mt title_tab">
                    <li class="tab_nav js_top  selected" data-id="mphelper"><a href="javascript:void(0);">
                      采集模板功能 </a></li>
                </ul>
            </div>
            <p class="extra_info">
               <a class="button2" href=' ' style='margin-bottom: 2px;display:none'>返回</a>
            </p>
        </div>
        

        
        <div style="padding: 10px;">
   
            
                <div id="ctl00_ContentPlaceHolder1_UpdatePanel1">
      <!--内容显示 Begin-->
     <div class="col_main">
         
        <div style="padding-top: 10px; padding-left: 10px; padding-right: 10px;">
           模板代码:
            <input name="scenename_varchar" type="text" id='text'  class="search"  /> 
            <br><br>
            模板分类：<select name="tagid" id="dtagid">
            <option value="">选择</option>
<option value="101">行业</option>
<option value="102">个人</option>
<option value="103">企业</option>
<option value="104">节假</option>
<option value="105">风格</option>
</select> -
<select name="tagid" id="tagid"> </select>

<br><br>
            <span id="Js_bind" class="btn btn_primary btn_input">
                <input type="submit" name="collect" value="采集" id="collect" />
            </span>
            <br><br>
             <font color="red"> 说明：复制模板的预览URL后面的参数,</font>
        </div>
        <div>
        <ul id="cjzt">
        
        </ul>
        </div>
 例：http://xxx.com/s/aW2oj593 后面的<font color="red">aW2oj593</font>就是模板代码

    </div>
           
</div>


            </div>
<script type="text/javascript">
    $(document).ready(function(){
    $("#collect").click(function(){
		var url = $("#text").val();
        var dtagid = $('#dtagid').val(); 
        var tagid = $('#tagid').val();    
        if(url != '') {
        $('#collect').val('正在拼命下载中...');
        $.get("adminc.php?c=collect&a=collect",{cs:url,dtagid:dtagid,tagid:tagid}, function(data){
        if(data.url != null){ 
        var html="<li><a href="+data.url+" target=\"_blank\">点击浏览</a></li>";
        $('#cjzt').after(html);
        }else{$('#cjzt').after();
        }
        alert(data.msg);
        $("#collect").val('采集');;
        },"json");
        }else{
         alert('参数不能为空');
        }
	 });
  $("#dtagid").change(function(){ 
//  var url = $("#text").val();
  var biztype = $("#dtagid").val();
  $("#tagid").empty();
   $.get("adminc.php?c=collect&a=Type",{biztype:biztype}, function(data){
if(data != null){
   $("#tagid ").append(data);
    }else{$('#tagid').after();
        }
   });
    }); 
	});
</script>
 
</body>
</html>