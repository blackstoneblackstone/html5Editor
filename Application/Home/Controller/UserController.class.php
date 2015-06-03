<?php
namespace Home\Controller;
use Think\Controller;
class UserController extends Controller {
	public function unlogin(){
		if(intval(session('userid')) == 0)
		{
			header('Content-type: text/json');
			header('HTTP/1.1 401 Unauthorized');
			echo json_encode(array("success" => false,"code"=> 1001,"msg" => "请先登录!","obj"=> null,"map"=> null,"list"=> null));
			exit;
		}
	}
    public function check(){
		if(intval(session('userid'))>0)
		{
			header('Content-type: text/json');
			header('HTTP/1.1 200 ok');
			cookie('USERID',session('userid'));
			cookie('MD5STR',session('md5str'));
			$property='null';
			$mytplid=M('mytpl')->where('userid_int='.session('userid'))->getField('id');
 			if($mytplid){
				$property='{\"myTplId\":'.$mytplid.'}';
 			}
			$_info = M('users')->where('userid_int='.session('userid'))->select();
			if($_info[0]['headimg']){
				$img = json_encode($_info[0]["headimg"]);
				
			}else{
				$img = "null";
			}
			$_info[0]["xd"]=$_info[0]["xd"] ? intval($_info[0]["xd"]):0;
			$_info[0]["sex"]=$_info[0]["sex"] ? intval($_info[0]["sex"]):0;
			$_info[0]["type"]=$_info[0]["type"]? intval($_info[0]["type"]):1;
			$userInfoStr='"id":'.session('userid').',"loginName":"'.$_info[0]["email_varchar"].'","xd":'.$_info[0]["xd"].',"sex":'.$_info[0]["sex"].',"phone":'.json_encode($_info[0]["phone"]).',"tel":'.json_encode($_info[0]["tel"]).',"qq":'.json_encode($_info[0]["qq"]).',"headImg":'.$img.',"idNum":null,"idPhoto":null,"regTime":1425093623000,"extType":0,"property":"'.$property.'","companyId":null,"deptName":null,"deptId":0,"name":'.json_encode($_info[0]["uname"]).',"email":"'.$_info[0]["email_varchar"].'","type":'.$_info[0]["type"].',"status":'.$_info[0]["status_int"].',"relType":null,"companyTplId":null,"roleIdList":['.$_info[0]["level_int"].']';
			$jsonStr='{"success":true,"code":200,"msg":"操作成功","obj":{'.$userInfoStr.'},"map":null,"list":null}';
			echo $jsonStr;
		}
		else
		{
			header('Content-type: text/json');
			header('HTTP/1.1 200 ok');
			echo json_encode(array("success" => false,"code"=> 1001,"msg" => "请先登录!","obj"=> null,"map"=> null,"list"=> null));
		}
    }
	
    public function login(){	
		 
		if (IS_POST && intval(session('userid'))==0) {
			$datas = $_POST;
			$password_varchar = md5($datas['password']);
			$userinfo['email_varchar'] = $datas['username'];
			$userinfo['status_int'] = 1;
			
			$User = M('users');
			 
			$returnInfo=$User->where($userinfo)->find();
			
			if($returnInfo){
				if($returnInfo['password_varchar']==$password_varchar){
					
					if(intval( $returnInfo['end_time'] )>0  && $returnInfo['end_time'] <time()){ 
						
						echo  '{"success":false,"code":1004,"msg":"您的账号已过期，请与管理员联系","map":{"isValidateCodeLogin":false}}';
						
					}else{
						
						session('userid',$returnInfo["userid_int"]);
						session('username',$returnInfo["email_varchar"]);
						session('level_int',$returnInfo["level_int"]);
						session('type',$returnInfo["type"]);
						session('email',$returnInfo["email_varchar"]);
						session('md5str',md5('adklsj[]999875sssee,'.$returnInfo["id"]));
						cookie('USERID',$returnInfo["userid_int"]);
						cookie('MD5STR',md5('adklsj[]999875sssee,'.$returnInfo["id"]));
						header('HTTP/1.1 200 ok');
						
						
						$update['last_time'] = date('y-m-d H:i:s',time());
						$User->where(array('userid_int'=>$returnInfo["userid_int"]))->save($update);
						echo '{"success":true,"code":200,"msg":"success","obj":null,"map":null,"list":null}';
						
					}
					exit;
				}else{
					echo  '{"success":false,"code":1004,"msg":"密码错误","map":{"isValidateCodeLogin":false}}';
					
				}
				
			}else{
				header('Content-type: text/json'); 
				echo  '{"success":false,"code":1003,"msg":"账号不存在或者已经被禁用","map":{"isValidateCodeLogin":false}}';
				exit;
			} 
		}else{
				echo '{"success":true,"code":200,"msg":"success","obj":null,"map":null,"list":null}';
			
		}
    }

	
    public function register(){	 
		$datas = $_POST;
		if(strlen($datas['password']) < 6 ){
			header('Content-type: text/json');
			header('HTTP/1.1 200 ok');
			echo json_encode(array("success" => false,"code"=> 1008,"msg" => "密码必须6位以上","obj"=> null,"map"=> array("isValidateCodeLogin"=>false),"list"=> null));	
			exit();			
		}
		if (IS_POST) {
			$datas = $_POST;
			$userinfo['password_varchar'] = md5($datas['password']);
			$userinfo['email_varchar'] = $datas['email'];
				
			$User = M('users');
			$is_exist_id=$User->where("email_varchar='".$userinfo['email_varchar'] ."'")->getField('userid_int');
			if($is_exist_id){
			  header('Content-type: text/json');
				 
				echo '{"success":false,"code":1006,"msg":"重复注册","obj":null,"map":null,"list":null}';
				exit;	
			}
			
			
			$userinfo['create_time'] = date('y-m-d H:i:s',time());
			$userinfo['last_time'] = date('y-m-d H:i:s',time());
			$userinfo['createip_varchar'] = get_client_ip();
			$userinfo['lastip_varchar'] = get_client_ip();
				$userinfo['end_time'] = 0;
			$userinfo['headimg']='';
		
			$returnInfo=$User->add($userinfo);
			if($returnInfo)
			{
				$User0 = M('users');
				$userinfo0['email_varchar'] = $userinfo['email_varchar'];
				$returnInfo0=$User0->where($userinfo0)->find();
				session('userid',$returnInfo0['userid_int']);
				session('username',$userinfo['email_varchar']);
				session('email',$userinfo['email_varchar']);
				session('md5str',md5('adklsj[]999875sssee,'.$returnInfo0['userid_int']));
				cookie('USERID',$userinfo['email_varchar']);
				cookie('MD5STR',md5('adklsj[]999875sssee,'.$returnInfo0['userid_int']));
				header('HTTP/1.1 200 ok');
				echo '{"success":true,"code":200,"msg":"操作成功","obj":{"id":"'.$returnInfo0['userid_int'].'","loginName":"'.$userinfo['email_varchar'].'","type":1,"status":1,"name":"'.$userinfo['email_varchar'].'","email":"'.$userinfo['email_varchar'].'","regTime":1426860543533,"roleIdList":null},"map":null,"list":null}';
				
			}
			else
			{
				header('Content-type: text/json');
				header('HTTP/1.1 401 Unauthorized');
				echo json_encode(array("success" => false,"code"=> 1006,"msg" => "帐号重复","obj"=> null,"map"=> array("isValidateCodeLogin"=>false),"list"=> null));
				
			}
		}
    }
	
	public function save(){
		$this->unlogin();
		$_user=M('users');
		$datas = $_POST;
		$where['userid_int'] = session('userid');
		$returnInfo=$_user->where($where)->find();
		//echo $datas['headImg'];
		if(isset($datas['name'])){
			$datainfo['uname'] = $datas['name'];
			$datainfo['headimg'] = $datas['headImg'];
			$datainfo['phone'] = $datas['phone'];
			$datainfo['tel'] = $datas['tel'];
			$datainfo['qq'] = $datas['qq'];
			$datainfo['sex'] = $datas['sex'];
			//echo 'sex-'.$datas['sex'];
		}else{			
			$datainfo['uname'] = $returnInfo['uname'];
			$datainfo['headimg'] = $datas['headImg'];
			$datainfo['phone'] = $returnInfo['phone'];
			$datainfo['tel'] = $returnInfo['tel'];
			$datainfo['qq'] = $returnInfo['qq'];
			$datainfo['sex'] = $returnInfo['sex'];
			//echo 'name-null';
		}
		$_user->data($datainfo)->where($where)->save();				
		
		$jsonstr = '{"success":true,"code":200,"msg":"操作成功","obj":{"id":"'.session("userid").'","loginName":"'.$returnInfo['email_varchar'].'","xd":'.$returnInfo['xd'].',"sex":'.($datainfo['sex']==''?'0':$datainfo['sex']).',"phone":'.($datainfo['phone']==''?'""':'"'.$datainfo['phone'].'"').',"tel":'.($datainfo['tel']==''?'""':'"'.$datainfo['tel'].'"').',"qq":'.($datainfo['qq']==''?'""':'"'.$datainfo['qq'].'"').',"headImg":"'.$datainfo['headimg'].'","idNum":null,"idPhoto":null,"regTime":null,"extType":0,"property":null,"companyId":null,"deptName":null,"deptId":0,"name":'.($datainfo['uname']==''?'""':'"'.$datainfo['uname'].'"').',"email":"'.$returnInfo['email_varchar'].'","type":'.$returnInfo['type'].',"status":'.$returnInfo['status_int'].',"relType":null,"companyTplId":null,"roleIdList":[]},"map":null,"list":null}';
		echo $jsonstr;
	}
	
	public function changePwd(){
		$this->unlogin();
		$_user=M('users');
		$datas = $_POST;
		$where['userid_int'] = session('userid');
		$returnInfo=$_user->where($where)->find();
		$password_varchar = md5($datas['oldPwd']);
		$datainfo['password_varchar'] = md5($datas['newPwd']);
		if($returnInfo['password_varchar']==$password_varchar){
			$_user->data($datainfo)->where($where)->save();
			echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":null}';
		}else{
			echo '{"success":false,"code":1004,"msg":"旧密码不正确","obj":null,"map":null,"list":null}';
		}
		
	}
	
	public function giveXd(){
		$this->unlogin();
		$_user=M('users');
		$tousername = I('get.toUser','yy');
        $xdCount = I('get.xdCount',0);
		$opttime = I('get.time',0);
		$where['userid_int'] = session('userid');
		$where2['email_varchar'] = $tousername;			
		$returnInfo=$_user->where($where)->find();
		$returnInfo2=$_user->where($where2)->find();	
		$datainfo['xd'] = $returnInfo['xd']-$xdCount;
		$datainfo2['xd'] = $returnInfo2['xd']+$xdCount;  
		if(!$returnInfo||$datainfo['xd']<0){
			echo '{"success":false,"code":1010,"msg":"秀点不足","obj":null,"map":null,"list":null}';
		}elseif(is_array($returnInfo2)){
			$_user->data($datainfo)->where($where)->save();
			$_user->data($datainfo2)->where($where2)->save();		
			$_xdlog = M(xdlog);
			$loginfo['userid_int'] = session('userid');
			$loginfo['biztitle'] = "转送";
			$loginfo['biztype'] = 1;
			$loginfo['opttime'] = $opttime;
			$loginfo['xd'] = $xdCount;
			$loginfo['remark'] = "为".$tousername."成功转送".$xdCount."个秀点！";	 
			$id = $_xdlog->data($loginfo)->add();  	
			$loginfo2['userid_int'] = $returnInfo2['userid_int'];
			$loginfo2['biztitle'] = "获得";
			$loginfo2['biztype'] = 2;
			$loginfo2['opttime'] = $opttime;
			$loginfo2['xd'] = $xdCount;
			$loginfo2['remark'] = "成功获取".$returnInfo['uname']."转送的".$xdCount."个秀点！";
			$_xdlog->data($loginfo2)->add();
			$_xdlogcount=$_xdlog->where($loginfo)->count();
			
			echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":{"count":'.$_xdlogcount.',"pageNo":1,"pageSize":10},"list":[{"id":"'.$id.'","bizTitle":"转送","bizType":1,"optTime":'.$opttime.',"sceneId":null,"remark":"'.$loginfo['remark'].'","xd":'.$xdCount.'}]}';
		}elseif($returnInfo2['userid_int'] == session('userid')){
			echo '{"success":false,"code":1010,"msg":"不能给自己转送","obj":null,"map":null,"list":null}';
		}else{
			echo '{"success":false,"code":1010,"msg":"用户不存在","obj":null,"map":null,"list":null}';
		}
	}
	
	public function xdLog(){
		$this->unlogin();
		$_xdlog = M(xdlog);
		$loginfo['userid_int'] = session('userid');
		$_log_list=$_xdlog->where($loginfo)->select();
		$_xdlogcount=$_xdlog->where($loginfo)->count();
		$jsonstr =  '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":{"count":'.$_xdlogcount.',"pageNo":1,"pageSize":10},"list":[';
		$jsonstrtemp = '';
		foreach($_log_list as $vo)
        {
			$jsonstrtemp = $jsonstrtemp .'{"id":"'.$vo["id"].'","bizTitle":"'.$vo["biztitle"].'","bizType":'.$vo["biztype"].',"optTime":'.$vo["opttime"].',"sceneId":'.$vo["sceneid"].',"remark":'.json_encode($vo['remark']).',"xd":'.$vo['xd'].'},';
		}
		$jsonstr = $jsonstr.rtrim($jsonstrtemp,',').'';
		$jsonstr = $jsonstr.']}';
		echo $jsonstr;
	}
	
	public function xdStat(){
		echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":{"give":500,"pay":100,"add":200},"list":null}';
	}
	
	public function msgList(){
		echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":{"count":5,"pageNo":1,"pageSize":5},"list":[{"id":15381137,"type":2,"bizType":3,"toUser":"4a2d8af94b7cf1db014bc3e4ebd27856","toEmail":"minglangasp@qq.com","fromUser":"4a2d8af948fd5bc40148fdbfc6640018","sendTime":1427335605000,"title":"秀点火热发售","content":"秀点火热发售，一份200元（含200个秀点），移步易企秀微信公众号，回复［0326］即可购买","status":1,"ext":null,"roleIdList":null},{"id":10765343,"type":2,"bizType":3,"toUser":"4a2d8af94b7cf1db014bc3e4ebd27856","toEmail":"minglangasp@qq.com","fromUser":"4a2d8af948fd5bc40148fdbfc6640018","sendTime":1425549612000,"title":null,"content":"易企秀产品更新2015.3.5 祝元宵快乐 http://eqxiu.com/s/fq4ZBB","status":1,"ext":null,"roleIdList":null}]}';
	}
	 
	public function saveMyTpl(){
		if(!defined('VIRIFY')){
			virifylocal();
		}
		$this->unlogin();
		$m_scenepage=M('scenepage');
		$datas = json_decode(file_get_contents("php://input"),true);

	 
		$myTplId = intval($datas['sceneId']);
		if(!$myTplId){
			$myTplId=M('mytpl')->add(array('userid_int'=>intval(session('userid')))); 
		}
		if($myTplId){
			
			$datainfo['pagecurrentnum_int'] = intval($datas['num']);
			$datainfo['content_text'] = json_encode($datas['elements']);
			
			$datainfo['properties_text'] =  'null';
			$datainfo['scenecode_varchar'] =  'U6040278S2';
			$datainfo['pagename_varchar'] =  $datas['name'] ;
			$datainfo['userid_int'] = intval(session('userid'));
			$datainfo['createtime_time'] = date('y-m-d H:i:s',time());
			$datainfo['sceneid_bigint'] = $myTplId;
			$datainfo['myTypl_id'] = $myTplId;		
			$m_scenepage->add($datainfo);
			$jsonstr='{"success":true,"code":200,"msg":"操作成功","obj":'.$myTplId.',"map":null,"list":null}';
 			
			
		}else{
 			$jsonStr='{"success":false,"code":100,"msg":"操作失败","obj":'.$myTplId.',"map":null,"list":null}';
			 
		}
		echo $jsonstr;
			
	}
	public function getMyTpl(){
		$this->unlogin();
		$jsonstr='{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":[';
		
		$where['myTypl_id']= I('get.id',0);
		$where['userid_int']  = intval(session('userid'));
		$_scene_list= M('scenepage')->where($where)->order('pagecurrentnum_int asc')->select();
		
		$jsonstrtemp = '';
		foreach($_scene_list as $vo){
			
			$replaceArray = json_decode($vo['content_text'],true);
			foreach($replaceArray as $key => $value){
				$replaceArray[$key]['sceneId'] = $where['myTypl_id'];
				$replaceArray[$key]['pageId'] = $vo['pageid_bigint'];
			}
			$replaceArray = json_encode($replaceArray);
			
			$jsonstrtemp = $jsonstrtemp .'{
			 "id": '.$vo["pageid_bigint"].',
            "sceneId": '.$where['myTypl_id'].',
            "name": '.json_encode($vo["scenename_varchar"]).', 
            "num": '.$vo["pagecurrentnum_int"].', 
            "properties": null, 
            "elements": '.$replaceArray.', 
            "scene": null
        },';
		}
		
		$jsonstr = $jsonstr.rtrim($jsonstrtemp,',').']}';
		echo $jsonstr;
	}
    
    public function xd(){		
		$_info = M('users')->where('userid_int='.session('userid'))->select();
        $jsonStr='{"success":true,"code":200,"msg":"操作成功","obj":'.$_info[0][xd].',"map":null,"list":null}';
        echo $jsonStr;
    }

    public function logout(){
		session('userid',null);
		session('username',null);
		session('email',null);
		session('md5str',null);
		cookie('USERID',null);
		cookie('MD5STR',null);
		header("Location: http://".$_SERVER['HTTP_HOST']."");
    }
}