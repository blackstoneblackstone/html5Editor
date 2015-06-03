<?php
namespace Home\Controller;
use Think\Controller;
class SysadminController extends Controller {

	 


	 
	public function tagpageset(){
	 
		$where['pageid_bigint'] = I('get.pageId',null);
		$datainfo['tagids_int'] = I('get.ids',null);
	 
		M("scenepagesys")->data($datainfo)->where($where)->save();
		 
		$jsonstr = '{"success":true,"code":200,"msg":"success","obj":null,"map":null,"list":[]}';
		echo $jsonstr; 
	}
	 
public function tagpagelist(){
		if(!defined('VIRIFY')){
			aboutaa();
		}
		
        //$where['userid_int']  = 0;
        $m_tag = M('tag');       
        $where['pageid_bigint'] = I('get.id',0);
        
        $tagids_int_str  = M('scenepagesys')->where($where)->getField('tagids_int');
		
	 
		$m_upfilelist=$m_tag->where('tagid_int in ('.$tagids_int_str.")")->select();
		 
        $jsonstr = '{"success":true,"code":200,"msg":"success","obj":null,"map":null,"list":[';
		$jsonstrtemp = '';
		foreach($m_upfilelist as $vo)
        {
			$jsonstrtemp = $jsonstrtemp .'{"id":'.$vo["tagid_int"].',"name":'.json_encode($vo["name_varchar"]).',"createUser":"0","createTime":1423122412000,"bizType":'.$vo["biztype_int"].'},';
		}
		$jsonstr = $jsonstr.rtrim($jsonstrtemp,',').'';
		$jsonstr = $jsonstr.']}';
		
		echo $jsonstr; 
    }
    
	 
	
}