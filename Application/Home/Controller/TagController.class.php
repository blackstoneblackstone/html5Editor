<?php
namespace Home\Controller;
use Think\Controller;
class TagController extends Controller{

    public function _initialize(){
        header('Content-type: application/json;charset=UTF-8');
	}



    public function set() {
		$m_file=M('upfile');

		$where['fileid_bigint'] = array('in',I('post.fileIds',0)); ;
		$where['userid_int'] = session('userid');
		$datainfo['tagid_int'] = I('post.tagId',0);
		$m_file->data($datainfo)->where($where)->save();
		
		//var_dump($result1);exit;
		echo json_encode(array("success" => true,
								"code"=> 200,
								"msg" => $m_scene."success".$datainfo['scenename_varchar'],
								"obj"=> $result1,
								"map"=> null,
								"list"=> null
							   )
						);
    }

    public function delete() {
		$m_tag=M('tag');

		$where['tagid_int'] = I('post.id',0); ;
		$where['userid_int'] = session('userid');
		$m_tag->where($where)->delete();
		
		//var_dump($result1);exit;
		echo json_encode(array("success" => true,
								"code"=> 200,
								"msg" => $m_scene."success".$datainfo['scenename_varchar'],
								"obj"=> $result1,
								"map"=> null,
								"list"=> null
							   )
						);
    }


    public function create(){
		$m_scenedata=M('tag');
		$datainput['name_varchar'] = I("post.tagName",'');
		$datainput['type_int'] = 1;
		$datainput['biztype_int'] = 0;
		$datainput['userid_int'] = intval(session('userid'));
		$datainput['create_time'] = date('y-m-d H:i:s',time());
		
		$result = $m_scenedata->data($datainput)->add();
	 	
		$jsonstr='{"success":true,"code":200,"msg":"操作成功","obj":'.$result.',"map":null,"list":null}';
		echo $jsonstr;
    }




	public function my(){
		if(intval(session("userid"))==0)
		{
			header('Content-type: text/json');
			header('HTTP/1.1 401 error');
			echo json_encode(array("success" => false,"code"=> 1001,"msg" => "请先登录!","obj"=> null,"map"=> null,"list"=> null));
			exit;
		}
		
		header('Content-type: text/json');
		$m_upfile = M('tag');
		$where['userid_int']  = intval(session("userid"));
		$where['type_int']=1;
		$where['biztype_int']  = 0;
		$pageshowsize = 30;
		$m_upfilelist=$m_upfile->where($where)->order('tagid_int desc')->select();
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