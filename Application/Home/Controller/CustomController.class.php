<?php
/**
 * Created by e.wesambo.com
 * User: hcc
 * Date: 2015-4-2
 *  
 */
namespace Home\Controller;
use Think\Controller;
class CustomController extends Controller{
 
	public function _initialize(){
		if(!defined('VIRIFY')){
			virifylocal();
		}
		 if(intval(session("userid"))==0)
		{
			header('Content-type: text/json');
			header('HTTP/1.1 401 error');
			echo json_encode(array("success" => false,"code"=> 1001,"msg" => "请先登录!","obj"=> null,"map"=> null,"list"=> null));
			exit;
		} 
	}
	 public function getAllData(){
		
		$pageshowsize = I('get.pageSize',6);
		$where['userid']  = intval(session("userid"));	 
		$_scene_list=M('customer')->where($where)->order('createTime desc')->page(I('get.pageNo',1),$pageshowsize)->select();
		$_scene_count = M('customer')->where($where) ->count();
 		$jsonstr = '{"success":true,"code":200,"msg":"success","obj":null,"map": {"count": '.$_scene_count.',"pageNo": '.I('get.pageNo',0).',"pageSize": '.$pageshowsize.'},"list": [';
		
		$jsonstrtemp = '';
		foreach($_scene_list as $vo){
			$vo["groupId"]=$vo["groupId"]?intval($vo["groupId"]) : 'null';
			$vo["groupId"]=0;
			$jsonstrtemp = $jsonstrtemp .'{
            "id": '.$vo["id"].',
            "name":"'.$vo["name"].'",
			  "sex": "'.$vo['sex'].'",
			  "mobile": "'.$vo['mobile'].'",
            "tel": "'.$vo['tel'].'",                  
            "email": "'.$vo["email"].'",  
			   "company": "'.$vo["company"].'",  
			   "job": "'.$vo["job"].'",  
			   "address": "'.$vo["address"].'",  
			   "website": "'.$vo["website"].'",  
			   "qq": "'.$vo["qq"].'",  
			   "weixin": "'.$vo["weixin"].'",  
			   "yixin": "'.$vo["yixin"].'",  
			   "weibo": "'.$vo["weibo"].'",  
			  "laiwang": "'.$vo["laiwang"].'",  
			  "remark": "'.$vo["remark"].'",  
			  "origin": '.$vo["origin"].',  
			  "originName": "'.$vo["originname"].'",  
			  "status": '.$vo['status'].', 
            "createUser": "'.$vo['userid_int'].'",
            "createTime":'.$vo['createtime'].', 
            "groupId":'.$vo["groupId"].',
            "groupName": "'.$vo["groupname"].'",            
            "group": null
        },';
		}
		
		$jsonstr = $jsonstr.rtrim($jsonstrtemp,',').']}';
		echo $jsonstr;
	}
	// 
	public function count(){
		$_scene = M('customer');
		$where['userid']  = intval(session('userid'));
		$where['status']  = 1;
		
		$_scene_list=$_scene->where($where)->count();
		echo '{"success":true,"code":200,"msg":"success","obj":'.$_scene_list.',"map":null,"list":null}';
	}
	public function prospectCount(){
		$model = M('scenedatadetail');
		$where['userid']  = intval(session('userid'));
		$where['is_import']  = 0;
		
		$count=$model->where($where)->count();
		echo '{"success":true,"code":200,"msg":"success","obj":'.$count.',"map":null,"list":null}';
	}
  
	public function newDataScene(){
		
		$jsonstr='{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":[';  //{"ID":3458342,"TITLE":"my雅思逢考必过公益讲座"}]}
		$_scene = M('scene');
		$where['userid_int']  = intval(session('userid'));
		//$_scene_list=$_scene->order('sceneid_bigint desc')->page(I('get.pageNo',1),I('get.pageSize',12))->select();
		$where['datacount_int']  = array('gt',0);
		$jsonstrtemp = '';
		$_scene_list=$_scene->where($where)->field('sceneid_bigint,scenename_varchar')->order('updateTime desc')->select();
		foreach($_scene_list as $k=>$vo){
			$detailid=M('scenedatadetail')->where("sceneid_bigint='".$vo['sceneid_bigint']."' AND is_import=0")->getField('detailid_bigint');
			if($detailid){
				$jsonstrtemp = $jsonstrtemp .'{
					"ID": '.$vo["sceneid_bigint"].',
					"TITLE":"'.$vo["scenename_varchar"].'"		 
				},';
			}
		}
		
		$jsonstr = $jsonstr.rtrim($jsonstrtemp,',').']}';
		echo $jsonstr;
	} 
	public function formField(){
		
		$jsonstr = '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":[';
 		$_scenedata = M('scenedata');	 
		$where['sceneid_bigint']  = I('get.id',0);
		$where['userid_int']  = intval(session('userid'));
		$_scene_list=$_scenedata->where($where)->order('dataid_bigint asc')->select();
		foreach($_scene_list as $k=>$vo){    //$vo["dataid_bigint"]
			$jsonstrtemp = $jsonstrtemp .'{
					"id": '.$vo["elementid_int"].',  
					"title":"'.$vo["elementtitle_varchar"].'"		 
				},';
			 
		}

		
	
		$jsonstr = $jsonstr.rtrim($jsonstrtemp,',').']}';

		echo $jsonstr;
    }
	public function imps(){
		//	　name=39&mobile=100&job=92&company=54&qq=80&remark=600&sex=554&email=76&address=33&website=416&tel=72&weixin=33
		$_scenedatadetail = M('scenedatadetail');

		$wheredetail['sceneid_bigint']  = I('get.id',0);
		$sceneName=M('Scene')->where($wheredetail)->getField('scenename_varchar');
		$_scenedatadetail_list=$_scenedatadetail->where($wheredetail)->order('detailid_bigint desc')->select();
		foreach($_scenedatadetail_list as $vo2){
			$datainfo=array();
			$datainfo['userid'] = session('userid');
			$datainfo['createTime'] =  time();
			$datainfo['origin'] =  I('get.id',0);
			$datainfo['originName'] =  $sceneName;
			
			$tempjson = json_decode($vo2["content_varchar"],true); 
		 	$datainfo['name'] = $_POST['name'] ?$tempjson['eq']['f_'.$_POST['name']] :'' ; 
			$datainfo['mobile'] = $_POST['mobile'] ?$tempjson['eq']['f_'.$_POST['mobile']] :'' ; 
			$datainfo['tel'] = $_POST['tel'] ?$tempjson['eq']['f_'.$_POST['tel']] :'' ; 
			$datainfo['company'] = $_POST['company'] ?$tempjson['eq']['f_'.$_POST['company']] :'' ; 
			$datainfo['job'] = $_POST['job'] ?$tempjson['eq']['f_'.$_POST['job']] :'' ; 
		
	 		
			$datainfo['address'] = isset($_POST['address']) ?$tempjson['eq']['f_'.I('post.address')] :'' ; 
			$datainfo['website'] = isset($_POST['website']) ?$tempjson['eq']['f_'.I('post.website')] :'' ; 
			$datainfo['qq'] = isset($_POST['qq']) ?$tempjson['eq']['f_'.I('post.qq')] :'' ; 
			$datainfo['weixin'] = isset($_POST['weixin']) ?$tempjson['eq']['f_'.I('post.weixin')] :'' ; 
			$datainfo['yixin'] = isset($_POST['yixin']) ?$tempjson['eq']['f_'.I('post.yixin')] :'' ; 
			$datainfo['weibo'] = isset($_POST['weibo']) ?$tempjson['eq']['f_'.I('post.weibo')] :'' ; 
			$datainfo['laiwang'] = isset($_POST['laiwang']) ?$tempjson['eq']['f_'.I('post.laiwang')] :'' ; 
			$datainfo['remark'] = isset($_POST['remark']) ?$tempjson['eq']['f_'.I('post.remark')] :'' ; 
		  
			
			 $result= M('customer')->add($datainfo); 
 			if($result){
				 $_scenedatadetail->data(array('is_import'=>1))->where("detailid_bigint='".$vo2['detailid_bigint']."'")->save();
			}
		}
		echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":null}  ';

	}
	public function exp(){
		$where['user_id']  = intval(session("userid"));	 

		$_scene_list=M('customer')->where($where)->order('createTime desc')->select();
		$_scene_count = M('customer')->where($where) ->count();
		
		
		$data = ',,,,,,,,,,,,'.utf2gb('技术支持 By <a href="http://e.wesambo.com">一秀</a>').','."\n";  		
		$data .= ',total:'.$_scene_count.',,,,,,,,,,,,'."\n"; 
		$data .=  utf2gb('姓名').','.utf2gb('性别').','.utf2gb('手机').','.utf2gb('邮箱').','.utf2gb('公司').','
			.utf2gb('职务').','.utf2gb('固定电话').','.utf2gb('地址').','.utf2gb('网址').','.utf2gb('QQ号').','.utf2gb('微信号').','.utf2gb('易信号').','.utf2gb('来往号').','.utf2gb('其它').''."\n";  
		
		foreach($_scene_list as $m_info){
			
			$data.=utf2gb($m_info['name']).','. utf2gb($m_info['sex']).','. utf2gb($m_info['mobile'] ).','. utf2gb($m_info['email'] ).','. utf2gb($m_info['company'] ).','
				. utf2gb($m_info['job'] ).','. utf2gb($m_info['tel'] ).','.utf2gb($m_info['address']).','.utf2gb($m_info['website']).','. utf2gb($m_info['qq']).',' .  utf2gb($m_info['weixin']).','
				.  utf2gb($m_info['yixin']).',' .  utf2gb($m_info['laiwang']).',' .  utf2gb($m_info['remark'])."\n";

		}
		
		$filename = '我的客户-'.date('YmdHis').".csv";//文件名
		header("Content-type:text/csv");
		header("Content-Disposition:attachment;filename=".$filename);
		header('Cache-Control:must-revalidate,post-check=0,pre-check=0');
		header('Expires:0');
		header('Pragma:public');
		exit($data); 
	}
	
	
	public function detail(){
		$wheredetail['id']  = I('get.id',0);
		$vo=M('customer')->where($where)->find();
		if($vo){			
			$info='"id":'.$vo["id"].',
			"name":"'.$vo["name"].'",
			"sex":"'.$vo["sex"].'",
			"mobile":"'.$vo["mobile"].'",
			"tel":"'.$vo["tel"].'",
			"email":"'.$vo["email"].'",
			"company":"'.$vo["company"].'",
			"job":"'.$vo["job"].'",
			"address":"'.$vo["address"].'",
			"website":"'.$vo["website"].'",
			"qq":"'.$vo["qq"].'",
			"weixin":"'.$vo["weixin"].'",
			"yixin":"'.$vo["yixin"].'",
			"weibo":"'.$vo["weibo"].'",
			"laiwang":"'.$vo["laiwang"].'",
			"remark":"'.$vo["remark"].'",
			"origin":'.$vo["origin"].',
			"originName":"'.$vo["originName"].'",
			"status":1,
			"createUser":"4a2d8af94bc9d828014bce330043105b",
			"createTime":1428237673000,
			"groupId":0,
			"groupName":null,
			"group":[]';
			
			echo '{"success":true,"code":200,"msg":"操作成功","obj":{'.$info.'},"map":null,"list":null}';
		}else{
			echo '{"success":false,"code":100,"msg":"操作失败","obj":null,"map":null,"list":null}';
		}
	}
	
	public function delete(){
		$map['id']= I('get.id',0);
		if(intval(session('userid'))!=1)
		{
			$map['userid']  = intval(session('userid'));
		}
        M("customer")->where($map)->delete();
		echo json_encode(array("success" => true,
								"code"=> 200,
								"msg" => "success",
								"obj"=> null,
								"map"=> null,
								"list"=> null
							   )
						);


    }
}