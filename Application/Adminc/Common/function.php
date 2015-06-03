<?php


/**
 * TODO e.wesambo.com
 * @param $count 要分页的总记录数
 * @param int $pagesize 每页查询条数
 * @return \Think\Page
 */
function getpage($count, $pagesize = 10) {
	$p = new Think\Page($count, $pagesize);
	$p->setConfig('header', '<li class="rows">共<b>%TOTAL_ROW%</b>条记录&nbsp;第<b>%NOW_PAGE%</b>页/共<b>%TOTAL_PAGE%</b>页</li>');
	$p->setConfig('prev', '上一页');
	$p->setConfig('next', '下一页');
	$p->setConfig('last', '末页');
	$p->setConfig('first', '首页');
	$p->setConfig('theme', '%FIRST%%UP_PAGE%%LINK_PAGE%%DOWN_PAGE%%END%%HEADER%');
	$p->lastSuffix = false;//最后一页不显示为总页数
	return $p;
}

function getPageMode($mode){
	$array=array('上下翻页','上下惯性翻页','左右翻页','左右惯性翻页','左右连续翻页');
	return $array[$mode];
}
function getCateName($mode){
	
	$array=array('tpType'=>'图片','bgType'=>'背景','musType'=>'音乐','scene_type'=>'场景' );
	return $array[$mode];
}
function getUserName($id){
	$userinfo=M('users')->where("userid_int='$id'")->field('uname,email_varchar')->find();
	
	return $userinfo['uname']?$userinfo['uname']:$userinfo['email_varchar'];
}

function getSceneType($value){
	$title=M('cate')->where("value='$value'")->getField('title');
	
	return $title;
	
}