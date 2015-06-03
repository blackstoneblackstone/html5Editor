<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<!--[if lt IE 7]> <html class="ie lt-ie9 lt-ie8 lt-ie7 app sidebar sidebar-fusion footer-sticky navbar-sticky"> <![endif]-->
<!--[if IE 7]>    <html class="ie lt-ie9 lt-ie8 app sidebar sidebar-fusion footer-sticky navbar-sticky"> <![endif]-->
<!--[if IE 8]>    <html class="ie lt-ie9 app sidebar sidebar-fusion footer-sticky navbar-sticky"> <![endif]-->
<!--[if gt IE 8]> <html class="ie app sidebar sidebar-fusion footer-sticky navbar-sticky"> <![endif]-->
<!--[if !IE]><!--><html class="app sidebar sidebar-fusion footer-sticky navbar-sticky"><!-- <![endif]-->
<head>
<title><?php echo ($sys["web_copyright"]); ?>后台管理</title>
<!-- Meta -->
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<!-- 
	**********************************************************
	In development, use the LESS files and the less.js compiler
	instead of the minified CSS loaded by default.
	**********************************************************
	-->
<link rel="stylesheet" id="skin" href="" />
<link rel="stylesheet" href="assets/admin/css/admin/admin.stylesheet.min.css" />
<!--[if lt IE 9]><link rel="stylesheet" href="./assets/admin/components/library/bootstrap/css/bootstrap.min.css" /><![endif]-->
<!--<link rel="stylesheet" href="./assets/css/admin/module.admin.stylesheet-complete.min.css" />-->
<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
   <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
   <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
<![endif]-->
<script src="assets/admin/components/library/jquery/jquery.min.js?v=v1.9.6&sv=v0.0.1"></script>
<script src="assets/admin/components/library/jquery/jquery-migrate.min.js?v=v1.9.6&sv=v0.0.1"></script>
<script src="assets/admin/components/library/modernizr/modernizr.js?v=v1.9.6&sv=v0.0.1"></script>
<script>if (/*@cc_on!@*/false && document.documentMode === 10) { document.documentElement.className+=' ie ie10'; }</script>
<script type="text/javascript">
     skin.href="assets/admin/css/admin/admin.stylesheet.ico.css";
</script>
</head>

<body class="">
<!-- Main Container Fluid -->
<div class="container-fluid menu-hidden">
	<!-- Main Sidebar Menu -->
	<div id="menu" class="hidden-print hidden-xs sidebar-blue sidebar-brand-primary">
		<div id="sidebar-fusion-wrapper">
			<div id="brandWrapper"> <a href="adminc.php" class="display-block-inline pull-left logo"><img src="<?php echo ($sys["web_logo"]); ?>" alt=""></a> <a href="adminc.php"><span class="text">后台管理</span></a> </div>
			<div id="logoWrapper">
				<div id="logo"> <a href="/" title="网站首页" target="_blank" class="btn btn-sm btn-inverse"><i class="fa fa-fw icon-home-fill-1"></i></a> <a href="" class="btn btn-sm btn-inverse"><i class="fa fa-fw fa-envelope"></i><span class="badge pull-right badge-primary"></span></a>
				  <div id="toggleNavbarColor" data-toggle="navbar-color"> <a href="" class="not-animated color color-blue active"></a> <a href="" class="not-animated color color-white"></a> <a href="" class="not-animated color bg-primary"></a> <a href="" class="not-animated color color-inverse"></a> </div>
				</div>
			</div>
			<ul class="menu list-unstyled" id="navigation_current_page">
				<li class="hasSubmenu"> <a href="#sidebar-fusion-dashboard" data-toggle="collapse"><i class="fa fa-user-md"></i><span>用户管理</span></a>
					<ul id="sidebar-fusion-dashboard" class="collapse">
						 
                       	<li><a href="#" onClick="mainFrame.location.href='/adminc.php?c=user'" ><i class="fa fa-user "></i>用户列表</a></li>
					 
					</ul>
				</li>
				<li class="hasSubmenu"> <a href="#sidebar-fusion-social" class="glyphicons globe_af" data-toggle="collapse"><span class="badge pull-right badge-primary"> </span><i></i><span>用户案例</span></a>
					<ul id="sidebar-fusion-social" class="animated fadeIn collapse">
						<li><a  href="#" onClick="mainFrame.location.href='/adminc.php?c=scene&flag=useranli'"><i class="fa fa-flash"></i> 案例列表</a></li>
						 
						 
					</ul>
				</li>
				<li class="hasSubmenu"> <a href="#sidebar-fusion-realestate" data-toggle="collapse"><i class="fa fa-home"></i><span>模板管理</span></a>
					<ul id="sidebar-fusion-realestate" class="collapse">
						<li><a href="#" onClick="mainFrame.location.href='/adminc.php?c=scene'" ><i class="fa "></i>模板列表</a></li>
                       <li><a href="#" onClick="mainFrame.location.href='/adminc.php?c=collect'" ><i class="fa "></i>采集模板</a></li>
                        
					 
					</ul>
				</li>
				 <li class="hasSubmenu"> <a href="#sidebar-fusion-upload" data-toggle="collapse"><i class="fa fa-home"></i><span>素材管理</span></a>
					<ul id="sidebar-fusion-upload" class="collapse">
						<li><a href="#" onClick="mainFrame.location.href='/adminc.php?c=upfilesys&filetype=1'" ><i class="fa "></i>图片库列表</a></li>
					 <li><a href="#" onClick="mainFrame.location.href='/adminc.php?c=upfilesys&filetype=0'" ><i class="fa "></i>背景库列表</a></li>
					 <li><a href="#" onClick="mainFrame.location.href='/adminc.php?c=upfilesys&filetype=2'" ><i class="fa "></i>音乐库列表</a></li>
					 
					</ul>
				</li>
                
              
				<li class="hasSubmenu"> <a href="#sidebar-fusion-maps" class="" data-toggle="collapse"><i class="fa fa-cog"></i><span>系统管理</span></a>
					<ul id="sidebar-fusion-maps" class="animated fadeIn collapse">
						<li><a  href="#" onClick="mainFrame.location.href='/adminc.php?c=sys&a=admin'" ><i class="fa  "></i> 管理员列表</a></li>
						<li><a  href="#" onClick="mainFrame.location.href='/adminc.php?c=sys&a=set'" ><i class="fa "></i> 网站设置</a></li>
					 	 
					 	
					</ul>
				</li>
			</ul>
		</div>
	</div>
	<!-- // Main Sidebar Menu END -->
	<!-- Content -->
	<div id="content">
		<div class="navbar hidden-print navbar-primary main" role="navigation">
			<div class="user-action user-action-btn-navbar pull-left border-right">
				<button class="btn btn-sm btn-navbar btn-primary btn-stroke"><i class="fa fa-bars fa-2x"></i></button>
			</div>
			<div class="col-md-3 padding-none visible-md visible-lg">
				<!--<div class="input-group innerLR">
					<input type="text" class="form-control input-sm" placeholder="请输入搜索关键字 ...">
					<span class="input-group-btn">
					<button class="btn btn-primary" type="button"><i class="fa fa-search"></i></button>
					</span> </div>-->
				<!-- /input-group -->
			</div>
			<div class="user-action pull-right menu-right-hidden-xs menu-left-hidden-xs">
				<div class="dropdown username hidden-xs pull-left"> <a class="dropdown-toggle " data-toggle="dropdown" href="#"> <span class="media margin-none"> <span class="pull-left"><img src="/assets/images/defaultuser.jpg" alt="user" class="img-circle"></span> <span class="media-body"> <?php echo ($Adminusername); ?> <span class="caret"></span> </span> </span> </a>
					<ul class="dropdown-menu pull-right">
						<!--<li><a href="../social_messages.html?lang=en" class="glyphicons envelope"><i></i>信息提示</a></li>-->
						<li><a  href="#" onClick="mainFrame.location.href='/adminc.php?c=sys&a=admin'" class="glyphicons settings"><i></i>系统设置</a></li>
                        <li><a  href="#" onClick="mainFrame.location.href='/adminc.php?c=sys&a=edit&id=<?php echo ($Adminuserid); ?>'" class="glyphicons settings"><i></i>修改密码</a></li>
						<li><a href="/adminc.php?c=auth&a=logout" class="glyphicons log_out">退出登录<i></i></a></li>
					</ul>
				</div>
				<div class="dropdown dropdown-icons padding-none"> <a data-toggle="dropdown" href="#" class="btn btn-primary btn-circle dropdown-toggle"><i class="fa fa-user"></i> </a>
					<ul class="dropdown-menu">
						<li data-toggle="tooltip" data-title="settings" data-placement="left" data-container="body"><a href="#" onClick="mainFrame.location.href='/adminc.php?c=sys&a=edit&id=<?php echo ($Adminuserid); ?>'"  ><i class="fa icon-settings-wheel-fill"></i></a></li>
					</ul>
				</div>
			</div>
			<div class="clearfix"></div>
		</div>
		<!-- // END navbar -->
		<div class="layout-app" style="top:59px; bottom:36px;">
			<!-- row -->
			<div class="row-app">
				<!-- col-separator -->
				<iframe id="rightframe" name="mainFrame" scrolling="no" src="/adminc.php?c=index&a=main" frameborder="0" height="100%" width="100%" onLoad="iFrameHeight()" class="col-app"></iframe>
				<script type="text/javascript" language="javascript">
					function iFrameHeight() {
						var ifm= document.getElementById("rightframe");
						var subWeb = document.frames ? document.frames["rightframe"].document : ifm.contentDocument;
						if(ifm != null && subWeb != null) {
							ifm.height = subWeb.body.scrollHeight;
						}
					}
				</script>
			</div>
			<!-- // END row	 -->
		</div>
	</div>
	<!-- // Content END -->
	<div class="clearfix"></div>
	<!-- // Sidebar menu & content wrapper END -->
	<!-- Footer -->
	<div id="footer" class="hidden-print">
		<!--  Copyright Line -->
		<div class="copy">Copyright © 2015-2018 <?php echo ($sys["web_site"]); ?> All Rights Reserved.</div>
		<!--  End Copyright Line -->
	</div>
	<!-- // Footer END -->
</div>
<!-- // Main Container Fluid END -->
<!-- Global -->
<script data-id="App.Config">
	var basePath = '/',
		commonPath = 'assets/admin/',
		rootPath = '',
		DEV = false,
		componentsPath = 'assets/admin/components/',
		layoutApp = true,
		module = 'admin';
	
	var primaryColor = '#eb6a5a',
		dangerColor = '#b55151',
		successColor = '#609450',
		infoColor = '#4a8bc2',
		warningColor = '#ab7a4b',
		inverseColor = '#45484d';
	
	var themerPrimaryColor = primaryColor;
</script>
<script src="assets/admin/components/library/bootstrap/js/bootstrap.min.js?v=v1.9.6&sv=v0.0.1"></script>
<script src="assets/admin/components/plugins/nicescroll/jquery.nicescroll.min.js?v=v1.9.6&sv=v0.0.1"></script>
<script src="assets/admin/components/plugins/breakpoints/breakpoints.js?v=v1.9.6&sv=v0.0.1"></script>
<script src="assets/admin/components/plugins/preload/pace/pace.min.js?v=v1.9.6&sv=v0.0.1"></script>
<script src="assets/admin/components/core/js/preload.pace.init.js?v=v1.9.6"></script>
<script src="assets/admin/components/core/js/sidebar.main.init.js?v=v1.9.6"></script>
<script src="assets/admin/components/core/js/sidebar.collapse.init.js?v=v1.9.6"></script>
<script src="assets/admin/components/core/js/core.init.js?v=v1.9.6"></script>
<script src="assets/admin/components/core/js/animations.init.js?v=v1.9.6"></script>
</body>
</html>