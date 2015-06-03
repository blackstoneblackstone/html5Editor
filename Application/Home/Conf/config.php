<?php
/**
 
 * Time: 下午2:13
 */

return array(
    'URL_ROUTER_ON'   => true,// 开启路由
    'LOAD_EXT_CONFIG' => 'router',
    'URL_PATHINFO_DEPR' => '-',
	'URL_CASE_INSENSITIVE'=>true,
    'URL_HTML_SUFFIX'       => ".html",  // URL伪静态后缀设置
    'URL_DENY_SUFFIX' => C('TOKEN.URL_DENY_SUFFIX'), // URL禁止访问的后缀设置
    'URL_MODEL' =>1,// URL伪静态设置/开启，关闭


    /* 模板相关配置 */
    'TMPL_PARSE_STRING' => array(
        '__UPLOAD__' => __ROOT__ . '/Uploads',
        '__STATIC__' => __ROOT__ . '/Public',
        '__IMG__'    => __ROOT__ . '/Public/Home/images',
        '__CSS__'    => __ROOT__ . '/Public/Home/css',
        '__JS__'     => __ROOT__ . '/Public/Home/js',
        '--PUBLIC--'=>__ROOT__ . '/Public' ,
    ),

);