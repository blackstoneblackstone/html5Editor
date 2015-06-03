<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en" ng-app="app" ng-controller="AppCtrl">
<head>
<meta property="qc:admins" content="25322764376510156375" />
<meta name="baidu-site-verification" content="2MKKT6mbuL" />
<meta charset="utf-8" />
<meta name="description" content="<?php echo ($sys["web_description"]); ?>" />
<meta name="keywords" content="<?php echo ($sys["web_keywords"]); ?>" />
<meta name="viewport"content="width=device-width, initial-scale=1.0" />
<meta property="qc:admins" content="25322764376510156375" />
<meta property="wb:webmaster" content="354b970d8cd61602" />
<title><?php echo ($sys["web_title"]); ?></title>
<script>
var web_logo='<?php echo ($sys["web_logo"]); ?>';
var web_copyright='<?php echo ($sys["web_copyright"]); ?>';
var web_qq='<?php echo ($sys["web_qq"]); ?>';
var web_mail='<?php echo ($sys["web_mail"]); ?>';
var web_phone='<?php echo ($sys["web_phone"]); ?>';
var web_address='<?php echo ($sys["web_address"]); ?>';
var web_ipc='<?php echo ($sys["web_ipc"]); ?>';



var PREFIX_URL = "http://"+window.location.host+"/json/"; //"http://service.eqxiu.com/";
   var JSON_URL = "http://"+window.location.host+"/index.php";
  var PREFIX_S1_URL = "http://"+window.location.host+"/";
  var PREFIX_S2_URL = "http://"+window.location.host+"/";
  var PREFIX_S3_URL = "http://"+window.location.host+"/";
  var PREFIX_HOST = "http://"+window.location.host+"/";
  var PREFIX_FILE_HOST = "http://"+window.location.host+'/Uploads/'; 
  var SYS_FILE_HOST = "http://"+window.location.host+"/Uploads/";
  var CLIENT_CDN = "http://"+window.location.host+"/";
  var INTERVAL_OBJ = {}; // 用于图集使用的定时器对象
  var IS_OPEN_REG=<?php echo ($sys["is_open_reg"]); ?>;
   var QI_AD_XDS=<?php echo ($sys["qi_ad_xds"]); ?>;
   
  function gt_custom_ajax(result, selector) {
    selectorA = selector;
    if (result) {
      //当验证成功时,延迟2秒自动刷新验证码
      /*setTimeout(function() {
        selector(".gt_refresh_button").click();
      }, 2000);*/
      challenge = selector(".geetest_challenge").value;
      validate = selector(".geetest_validate").value;
      seccode = selector(".geetest_seccode").value;
      submit = true;
    }
  }
</script>
	    <!-- 前台 -->
	<link rel="stylesheet" type="text/css" href="/static/css/index.css">
	<link rel="stylesheet" type="text/css" href="/static/css/login.css">
	<style type="text/css">*{font-family:微软雅黑;}</style>
	<script type="text/javascript" src="/static/js/jquery1.8.js?1"></script>
	<script type="text/javascript" src="/static/js/jquery-ui.js"></script>
	<script type="text/javascript" src="/static/js/jquery.mousewheel.js"></script>
	<script type="text/javascript" src="/static/js/mycorebar.js"></script>
	<script type="text/javascript" src="/static/js/index.js"></script>
	<style type="text/css">.shipinjiaocheng{position:absolute;top:60px;right:15px;width:350px;height:233px;border:5px solid #B44A4A;border-radius:6px;background-color:#B44A4A;}.ukuif{border-radius:4px;}</style>
	<script type="text/javascript">$(document).ready(function(){$( "#shipinjiaocheng").draggable({containment:"parent",handle:"#shipinjiaochengb"});});</script>
	<!-- 前台结束 -->
<!-- <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=8D1kIOGsmbbeG9k4U3klKl77"></script> -->
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

    <link rel="stylesheet" href="/Public/css/waiwan/bootstrap/dist/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="/Public/css/waiwan/font-awesome/css/font-awesome.min.css"/>
    <link rel="stylesheet" href="/Public/css/waiwan/jquery-ui.min.css"/>
    <link rel="stylesheet" href="/Public/css/waiwan/jquery.Jcrop.min.css"/>
    <link rel="stylesheet" href="/Public/css/waiwan/select.min.css"/>
    
    

    <!-- compiled CSS --> 
  <link rel="stylesheet" href="/Public/css/eqShow-common-3.1.5.css"/>
    <link rel="stylesheet" href="/Public/css/ui-grid.min.css"/>
    <link rel="stylesheet" href="/Public/css/hint.min.css"/>
    <link rel="stylesheet" href="/Public/css/bootstrap.vertical-tabs.min.css"/>
    <link rel="stylesheet" href="/Public/css/eqShow-3.1.5.css"/>

  


    <script src="/Public/css/waiwan/jquery.min.js"></script>
    <script src="/Public/css/waiwan/jquery-ui.min.js"></script>
    <script src="/Public/css/waiwan/jquery.Jcrop.min.js"></script>
    <script src="/Public/css/waiwan/angular.min.js"></script>
    <script src="/Public/css/waiwan/angular-route.min.js"></script>
    <script src="/Public/css/waiwan/angular-animate.min.js"></script>
    <script src="/Public/css/waiwan/angular-sanitize.min.js"></script>
    <script src="/Public/css/waiwan/ui-bootstrap-tpls.min.js"></script>
    <script src="/Public/css/waiwan/select.min.js"></script>
    <script src="/Public/css/waiwan/sortable.min.js"></script>
    <script src="/Public/css/waiwan/bootstrap.min.js"></script>
    <script src="/Public/css/waiwan/Chart.min.js"></script>
    <script src="/Public/css/waiwan/ZeroClipboard.min.js"></script>
    <!-- compiled JavaScript -->
 
 
    
      <script src="/Public/eq/2.7/ui-grid.min.js"></script>
    <script src="/Public/eq/2.7/bootstrap-wysiwyg.min.js"></script>
    <script src="/Public/eq/2.7/jquery.hotkeys.min.js"></script>
    <script src="/Public/eq/2.7/angular-file-upload.min.js"></script>
    <script src="/Public/eq/2.7/angular-file-upload-directives.min.js"></script>
    <script src="/Public/eq/2.7/angular-locale_zh-cn.min.js"></script>
    <script src="/Public/eq/2.7/hammer.min.js"></script>
    <script src="Public/eq/3.1/eqShow-3.1.5.js"></script>
    
    

<style>
.myGrid {
	width: 998px;
	height: 550px;
}
.myGrid1 {
  width: 650px;
  height: 550px;
}
.choose_template .main .content .mask ul li .roll :hover .cc{
  display: block; 
  
}
</style>

</head>
 
<body>

  <div style="z-index:2000;" id="notify" ng-include="'notifications.tpl.html'" ng-if="notifications.getCurrent().length"></div>
	<div id="eq_main" ng-view></div>


<script>
 

  var submit = false;
  var challenge, validate, seccode, selectorA;

</script>

</body>
</html>