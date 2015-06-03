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
    
   <div class="col_main">
        <div class="main_hd">
            <div class="title_tab" id="topTab">
                <ul class="tab_navs mt title_tab">
                    <li class="tab_nav js_top  selected" data-id="mphelper"><a href="javascript:void(0);">
                      <?php if(($flag) == "useranli"): ?>用户案例列表<?php else: ?> 场景模板列表<?php endif; ?> </a></li>
                </ul>
            </div>
            <p class="extra_info">
               <a class="button2" href=' ' style='margin-bottom: 2px;display:none'>返回</a>
            </p>
        </div>
        <div style="padding: 10px;">
            <div>
                <div id="ctl00_ContentPlaceHolder1_UpdatePanel1">
 
 
 
 

      <!--内容显示 Begin-->
     <div class="col_main">
         
        <div style="padding-top: 10px; padding-left: 10px; padding-right: 10px;">
         <form action="" method="post">
           用户案例名称:
            <input name="scenename_varchar" type="text"  class="search" style="width: 100px;" value="<?php echo ($filename_varchar); ?>"/>&nbsp;&nbsp;&nbsp;&nbsp;状态:
          <!--  <select name="delete_int">
	<option   value="">全部</option>
	<option value="0" <?php if(($delete_int) == "0"): ?>selected="selected"<?php endif; ?>>启用</option>
	<option value="1" <?php if(($delete_int) == "1"): ?>selected="selected"<?php endif; ?>>停用</option>
	 
</select>-->
&nbsp;&nbsp;&nbsp;&nbsp; 所属会员:
         <select name="user_id">
         <option value="" >全部</option>
	      <?php if(is_array($userlist)): foreach($userlist as $key=>$item): ?><option value="<?php echo ($item["userid_int"]); ?>" <?php if(($item[userid_int]) == $user_id): ?>selected="selected"<?php endif; ?>><?php echo ($item["email_varchar"]); ?></option><?php endforeach; endif; ?>
 	  </select>
        &nbsp;&nbsp;&nbsp;&nbsp; 排序:
            <select name="order">
	<option   value="sceneid_bigint" <?php if(($order) == "sceneid_bigint"): ?>selected="selected"<?php endif; ?>>添加时间</option>
	<option value="rank" <?php if(($order) == "rank"): ?>selected="selected"<?php endif; ?>>权重值</option>
 	  </select>

            <span id="Js_bind" class="btn btn_primary btn_input">
                <input type="submit" name="ctl00$ContentPlaceHolder1$btnSearch" value="查询" id="ctl00_ContentPlaceHolder1_btnSearch" />
            </span>
             <font color="red"> 状态说明：权重越大越前面</font>
             </form>
        </div>
        <div style="padding: 10px;">
            <div id="ctl00_ContentPlaceHolder1_UpdatePanel1">
	    <?php if(($flag) == "useranli"): ?><table width="100%" border="0" cellspacing="0" cellpadding="0" class="gv">
                        <tr>
                            <th scope="col" width="3%">
                                ID
                            </th>
                              <th align="center" scope="col" abbr="lbtnOperate" width="5%">操作</th>
                            <th scope="col"  ><span style="padding-top: 10px; padding-left: 10px; padding-right: 10px;">案例名称</span></th>
                            <th scope="col" > 所属会员</th>
                            <th scope="col" width="15%">
                              缩略图
                          </th>
                            <th scope="col" width="15%">
                              广告有无
                          </th>
                            <th scope="col" width="7%">
                               审核状态</th>
                            <th scope="col" width="8%">权重</th>
                            <th scope="col" width="15%">
                              是否在案例中显示
                          </th>
                            <th scope="col" width="15%">
                                添加时间
                            </th>
                        </tr>
                        
                                
                              <?php if(is_array($select)): foreach($select as $key=>$item): ?><tr onMouseOver="this.className='RecordRowOver'" onMouseOut="this.className=''">
                                    <td align="center">
                                       <?php echo ($item["sceneid_bigint"]); ?>
                                    </td>
                                    <td align="center" style="width:60px;"> <a href="?c=scene&a=e&id=<?php echo ($item["sceneid_bigint"]); ?>"><img src="/assets/admin/images/edit.png" /> </a>
                                    <a href="javascript:;" onClick="javascript:if(confirm('你确信要删除[<?php echo ($item["scenename_varchar"]); ?>]吗？')) window.location='?c=scene&a=del&id=<?php echo ($item["sceneid_bigint"]); if(($flag) == "useranli"): ?>&flag=useranli<?php endif; ?>'"><img src="/assets/admin/images/delet.png" /> </a>
                                      <a href="?c=scene&a=copytos&id=<?php echo ($item["sceneid_bigint"]); ?>"> 复制为系统模板</a>
                                      
                                      
                                    </td>
                                    <td>
                                        <a href="<?php if(($IS_OPEN_STATIC) == "1"): ?>/v-<?php echo ($item["scenecode_varchar"]); ?>?preview=preview<?php else: ?>/v-<?php echo ($item["scenecode_varchar"]); endif; ?>" target="_blank" title="点击预览"> <?php echo ($item["scenename_varchar"]); ?></a>
                                    </td>
                                    <td> <a href="?c=scene&flag=useranli&user_id=<?php echo ($item["userid_int"]); ?>">  <?php echo (getUserName($item["userid_int"])); ?></a> </td>
                                    <td>
                                        <img src="/Uploads/<?php echo ($item["thumbnail_varchar"]); ?>" class="thbnail">
                                    </td>
                                    <td>
                                          <?php if(($item['hideeqad']) == "1"): ?>无广告<a href="/adminc.php?c=scene&a=hideeqad&id=<?php echo ($item["sceneid_bigint"]); ?>">【显示广告】</a><?php else: ?> 有广告 <a href="/adminc.php?c=scene&a=hideeqad&id=<?php echo ($item["sceneid_bigint"]); ?>&no=1">【去除广告】</a><?php endif; ?>
                                    </td>
                                    <td>
                                      <?php if(($item['shenhe']) == "1"): ?>已审核 <br><a href="/adminc.php?c=scene&a=shenhe&id=<?php echo ($item["sceneid_bigint"]); ?>&no=1">【取消通过】</a><?php else: ?> 未审核<br> <a href="/adminc.php?c=scene&a=shenhe&id=<?php echo ($item["sceneid_bigint"]); ?>">【点击通过】</a><?php endif; ?>
                                    </td>
                                    <td>  <?php echo ($item["rank"]); ?></td>
                                    <td>
                                         <?php if(($item['showstatus_int']) == "1"): ?>显示<a href="/adminc.php?c=scene&a=is_public&id=<?php echo ($item["sceneid_bigint"]); ?>&no=1">【取消显示】</a><?php else: ?> 不显示 <a href="/adminc.php?c=scene&a=is_public&id=<?php echo ($item["sceneid_bigint"]); ?>">【点击显示】</a><?php endif; ?>
                                    </td>
                                    <td>
                                      <?php echo ($item["createtime_time"]); ?>
                                    </td>
                                </tr><?php endforeach; endif; ?>
            
                                <tr>
                                <td colspan="12">
                                 
                  
                     
                                </td>
                                </tr>
                            
                    </table>
                    <?php else: ?>  
                     <table width="100%" border="0" cellspacing="0" cellpadding="0" class="gv">
                        <tr>
                            <th scope="col" width="3%">
                                ID
                            </th>
                              <th align="center" scope="col" abbr="lbtnOperate">操作</th>
                            <th scope="col" width="10%"><span style="padding-top: 10px; padding-left: 10px; padding-right: 10px;">模板名称</span></th>
                            <th scope="col" width="15%">
                              缩略图
                          </th>
                            <th scope="col" width="15%">
                              所属分类
                          </th>
                            <th scope="col" width="7%">
                                状态</th>
                            <th scope="col" width="8%">权重</th>
                            <th scope="col" width="15%">
                              使用次数
                          </th>
                            <th scope="col" width="15%">
                                添加时间
                            </th>
                        </tr>
                        
                                
                              <?php if(is_array($select)): foreach($select as $key=>$item): ?><tr onMouseOver="this.className='RecordRowOver'" onMouseOut="this.className=''">
                                    <td align="center">
                                       <?php echo ($item["sceneid_bigint"]); ?>
                                    </td>
                                    <td align="center" style="width:60px;"> <a href="?c=scene&a=e&id=<?php echo ($item["sceneid_bigint"]); ?>"><img src="/assets/admin/images/edit.png" /> </a>
                                    <a href="javascript:;" onClick="javascript:if(confirm('你确信要删除[<?php echo ($item["scenename_varchar"]); ?>]吗？')) window.location='?c=scene&a=del&id=<?php echo ($item["sceneid_bigint"]); if(($flag) == "useranli"): ?>&flag=useranli<?php endif; ?>'"><img src="/assets/admin/images/delet.png" /> </a>
                                      
                                    </td>
                                    <td>
                                        <?php echo ($item["scenename_varchar"]); ?>
                                    </td>
                                    <td>
                                        <img src="/Uploads/<?php echo ($item["thumbnail_varchar"]); ?>" class="thbnail">
                                    </td>
                                    <td>
                                       <?php echo (getSceneType($item["scenetype_int"])); ?>
                                    </td>
                                    <td>
                                      <?php if(($item['delete_int']) == "0"): ?>启用<?php else: ?> 禁用<?php endif; ?>
                                    </td>
                                    <td>  <?php echo ($item["rank"]); ?></td>
                                    <td>
                                         <?php echo ($item["usecount_int"]); ?>次
                                    </td>
                                    <td>
                                      <?php echo ($item["createtime_time"]); ?>
                                    </td>
                                </tr><?php endforeach; endif; ?>
            
                                <tr>
                                <td colspan="11">
                                 
                  
                     
                                </td>
                                </tr>
                            
                    </table><?php endif; ?>
                    
                       <div class="pages">
                        <?php echo ($page); ?>
                </div>
                
</div>
        </div>
    </div>
    <!--内容显示 End-->




    
           
        

<div id="divIsSetHeight" style="display: none;">
    1
</div>



<script type="text/javascript">
    // <![CDATA[
    //    function ShowVisibleColumnWindow() {
    //        pcVisibleColumn.Show();
    //    }
    // ]]> 
</script>

<script type='text/javascript'>    SetHeight();</script>


                    
</div>
            </div>
        </div>
    </div>

 
</body>
</html>