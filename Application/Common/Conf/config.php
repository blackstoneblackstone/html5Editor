<?php

/*
 * 通用配置文件
 *
 * Date:2013-02-01
 */
return array(
    /* 数据库设置 */
    'DB_TYPE' => 'mysql', // 数据库类型
    'SHOW_PAGE_TRACE' => FALSE,
    'TOKEN_ON' => true, // 是否开启令牌验证
    'TOKEN_NAME' => '__yj__', // 令牌验证的表单隐藏字段名称
    'TOKEN_TYPE' => 'md5', //令牌哈希验证规则 默认为MD5
    'TOKEN_RESET' => FALSE, //令牌验证出错后是否重置令牌 默认为true

    'LOAD_EXT_CONFIG' => 'systemConfig',

    'DEFAULT_C_LAYER'       =>  'Controller', // 默认的控制器层名称
    'MODULE_ALLOW_LIST'     =>  array('Home','s'), // 配置你原来的分组列表
    'DEFAULT_MODULE'        =>  'Home', // 配置你原来的默认分组
	'MODULE_DENY_LIST'      =>  array('Common','Runtime','Ucenter'),
	'URL_ROUTER_ON'   => true,// 开启路由
    'IS_USER_ANLI_SHENGHE'=>true,
	'IS_OPEN_STATIC' =>false,
	'IS_COUM_AD'=>false,
	
	'IS_USER_ROLE_SCENE'=>true,
	 
	'WX_APPID' =>'wx40e4c82c3d9df03e',
	'WX_AppSecret'=>'47065ff14dbea4f06521f6d45740e285' 

);
/*$config2 = WEB_ROOT . "Common/Conf/systemConfig.php";
$config2 = file_exists($config2) ? include "$config2" : array();

return array_merge($config1, $config2);*/