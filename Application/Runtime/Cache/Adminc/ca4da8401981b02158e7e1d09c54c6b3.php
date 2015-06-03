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
                    <li class="tab_nav js_top  selected" data-id="mphelper">
                    <?php if($filetype_int ==1): ?>图片库列表<?php elseif($filetype_int ==2): ?>音乐库列表 
<?php else: ?>背景库列表
<?php endif; ?>
                    </li>
                </ul>
            </div>
            <p class="extra_info">
               <a class="button2" href='?c=upfilesys&a=add&filetype=<?php echo ($filetype_int); ?>' style='margin-bottom: 2px;'>添加<?php if($filetype_int ==1): ?>图片<?php elseif($filetype_int ==2): ?>音乐 
<?php else: ?>背景
<?php endif; ?></a>
            </p>
        </div>
        <div style="padding: 10px;">
            <div>
                <div id="ctl00_ContentPlaceHolder1_UpdatePanel1">
 
 

      <!--内容显示 Begin-->
     <div class="col_main">
         
        <div style="padding-top: 10px; padding-left: 10px; padding-right: 10px;">
           <form action="" method="post">
            文件名
            <input name="filename_varchar" type="text"  class="search" style="width: 100px;" value="<?php echo ($filename_varchar); ?>" />&nbsp;&nbsp;&nbsp;&nbsp; 排序:
            <select name="order">
	<option   value="fileid_bigint" <?php if(($order) == "fileid_bigint"): ?>selected="selected"<?php endif; ?>>添加时间</option>
	<option value="sizekb_int" <?php if(($order) == "sizekb_int"): ?>selected="selected"<?php endif; ?>>文件大小</option>
 	  </select>

            <span id="Js_bind" class="btn btn_primary btn_input">
                <input type="submit" name="ctl00$ContentPlaceHolder1$btnSearch" value="查询" id="ctl00_ContentPlaceHolder1_btnSearch" />
            </span>
             </form>
        </div>
        <div style="padding: 10px;">
            <div id="ctl00_ContentPlaceHolder1_UpdatePanel1">
	  
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="gv">
                        <tr>
                            <th scope="col" width="3%">
                                ID
                            </th>
                              <th width="15%" align="center" scope="col" abbr="lbtnOperate">操作</th>
                            <th scope="col" width="10%"><span style="padding-top: 10px; padding-left: 10px; padding-right: 10px;">文件名称</span></th>
                            <th scope="col" >
                              缩略图
                          </th>
                            <th scope="col" width="15%">
                              后缀
                          </th>
                            <th scope="col" width="8%">类别</th>
                            <th scope="col" width="15%">
                                添加时间
                            </th>
                        </tr>
                        
                                
                              <?php if(is_array($select)): foreach($select as $key=>$item): ?><tr onMouseOver="this.className='RecordRowOver'" onMouseOut="this.className=''">
                                    <td align="center">
                                       <?php echo ($item["fileid_bigint"]); ?>
                                    </td>
                                    <td align="center" style="width:60px;"> <a href="?c=upfilesys&a=e&id=<?php echo ($item["fileid_bigint"]); ?>"><img src="/assets/admin/images/edit.png" /> </a>
                                    <a href="javascript:;" onClick="javascript:if(confirm('你确信要删除[<?php echo ($item["scenename_varchar"]); ?>]吗？')) window.location='?c=upfilesys&a=del&id=<?php echo ($item["fileid_bigint"]); ?>&filetype=<?php echo ($filetype_int); ?>'"><img src="/assets/admin/images/delet.png" /> </a>
                                      
                                      
                                    </td>
                                    <td>
                                      
                                       <?php echo ($item["filename_varchar"]); ?> 
                                    </td>
                                    <td>
                                      <?php if(($filetype_int) == "2"): ?><audio controls><source src="/Uploads/<?php echo ($item["filesrc_varchar"]); ?>" type="audio/mpeg">你的浏览器不支持在线.</audio>
                                       <?php else: ?>
                                        <img src="/Uploads/<?php echo ($item["filethumbsrc_varchar"]); ?>" class="thbnail"><?php endif; ?>
                                    </td>
                                    <td>
                                       <?php echo ($item["ext_varchar"]); ?>
                                    </td>
                                    <td>    <?php echo (getBiztype($item["biztype_int"])); ?></td>
                                    <td>
                                      <?php echo ($item["create_time"]); ?>
                                    </td>
                                </tr><?php endforeach; endif; ?>
            
                                <tr>
                                <td colspan="9">
                                 
                  
                     
                                </td>
                                </tr>
                            
                    </table>
                   
                    
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