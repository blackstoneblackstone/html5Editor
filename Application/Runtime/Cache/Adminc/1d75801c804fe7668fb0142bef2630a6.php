<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head><meta charset="utf-8" /><title>
	后台管理
</title>
    
    
    <script src="/Public/js/jquery-1.7.1.min.js" type="text/javascript"></script>
 
    <link rel="Stylesheet" href="/assets/admin/css/main.css" /><link rel="stylesheet" type="text/css" href="/assets/admin/css/layout_head.css" /><link rel="stylesheet" type="text/css" href="/assets/admin/css/base.css" /><link rel="stylesheet" type="text/css" href="/assets/admin/css/model.css" />

     <script src="/assets/admin/js/date/WdatePicker.js"></script>

</head>
<body>
    
     <!--内容显示 Begin-->
    <div class="col_main">
        <input name="ctl00$ContentPlaceHolder1$txt" type="hidden" id="ctl00_ContentPlaceHolder1_txt" />
        <div class="main_hd">
            <div class="title_tab" id="topTab">
                <ul class="tab_navs mt title_tab">
                    <li class="tab_nav js_top  selected" data-id="mphelper"><a href="javascript:void(0);">
                        编辑会员</a></li>
                </ul>
            </div>
             
        </div>
        
        
        
       <form action="" method="post">
        <div style="text-align: left; padding: 20px; text-align: left;">
           
            
             
             
            <!--打印帮助关键字配置-->
          
            <hr style="width: 50%; size: 1px; border: none;" />
            <table style="vertical-align: top;">
                <tr>
                    <td style="width: 98px;">
                        登录名
                    </td>
                    <td>
                         <?php echo ($user["email_varchar"]); ?>
                    </td>
                </tr>
                <tr>
                    <td >
                        用户名
                    </td>
                    <td>
                        <span class="frm_input_box">
                            <input name="user[uname]" type="text"   class="frm_input"   value="<?php echo ($user["uname"]); ?>" /></span>
   
                    </td>
                </tr>
                  <tr>
                    <td >
                        新密码
                    </td>
                    <td>
                        <span class="frm_input_box">
                            <input name="password_varchar" type="text"   class="frm_input"   value="" /></span>(为空则不修改)
   
                    </td>
                </tr>
                
                
                  <tr>
                    <td >
                        秀点
                    </td>
                    <td>
                        <span class="frm_input_box">
                            <input name="user[xd]" type="text"   class="frm_input" style="width: 200px;" value="<?php echo ($user["xd"]); ?>" /></span>
   
                    </td>
                </tr>
                 </tr>
                  <tr>
                    <td >
                        创建场景个数
                    </td>
                    <td>
                        <span class="frm_input_box">
                            <input name="user[allow_nums]" type="text"   class="frm_input" style="width: 200px;" value="<?php echo ($user["allow_nums"]); ?>" /></span>
   
                    </td>
                </tr>
                
                 <tr>
                    <td >
                        用户组
                    </td>
                    <td>
                        <select name="user[role]">
                         <option value="0" <?php if(($user[role]) == "0"): ?>selected="selected"<?php endif; ?>> 普通</option>
                          <option value="1" <?php if(($user[role]) == "1"): ?>selected="selected"<?php endif; ?>> VIP</option>
                            <option value="2" <?php if(($user[role]) == "2"): ?>selected="selected"<?php endif; ?>> 顶级VIP</option>
                        </select>
   
                    </td>
                </tr>
                <tr>
                    <td >
                        到期时间
                    </td>
                    <td>
                        <span class="frm_input_box">
                            <input name="user[end_time]" type="text"   class="frm_input" style="width: 200px;" id="end_time" value="<?php if($user['end_time'] > 0): echo (date("Y-m-d",$user["end_time"])); endif; ?>"   onClick="WdatePicker()" /></span>
   
                    </td>
                </tr>
                <tr>
                    <td>
                         启用状态
                    </td>
                    <td>
                        <table id="ctl00_ContentPlaceHolder1_rdiIsEnable_help" border="0">
	<tr>
		<td><input id="ctl00_ContentPlaceHolder1_rdiIsEnable_help_0" type="radio" name="user[status_int]" value="1" <?php if(($user['status_int']) == "1"): ?>checked="checked"<?php endif; ?>/><label for="ctl00_ContentPlaceHolder1_rdiIsEnable_help_0">启用</label></td>
	</tr><tr>
		<td><input id="ctl00_ContentPlaceHolder1_rdiIsEnable_help_1" type="radio"   name="user[status_int]" value="0" <?php if(($user['status_int']) == "0"): ?>checked="checked"<?php endif; ?>/><label for="ctl00_ContentPlaceHolder1_rdiIsEnable_help_1">禁用</label></td>
	</tr>
</table>
                    </td>
                </tr>
                 <?php if ($adminRole==1): ?>
                 <tr>
                    <td>
                         模板管理权限
                    </td>
                    <td>
                        <table   border="0">
	<tr>
		<td><input  id="status_int4" type="radio" name="user[level_int]" value="4" <?php if(($user['level_int']) == "4"): ?>checked="checked"<?php endif; ?>/><label for="status_int4">启用</label></td>
	</tr><tr>
		<td><input  id="status_int0" type="radio"   name="user[level_int]" value="0" <?php if(($user['level_int']) == "0"): ?>checked="checked"<?php endif; ?>/><label for="status_int0">禁用</label></td>
	</tr>
</table>
                    </td>
                </tr>
                <?php endif; ?>
                <tr>
                    <td>
                    </td>
                    <td>
                    </td>
                </tr>
            </table>
          <div class="tool_bar border with_form">
                <span id="Span1" class="btn btn_primary btn_input">
                         <input type="hidden"  name="id" value="<?php echo ($user["userid_int"]); ?>" />
                    <input type="submit" name=" " value="保存"   /></span>
            </div>
        </div>
        </form>
        
    </div>
    <!--内容显示 End-->


 
</body>
</html>