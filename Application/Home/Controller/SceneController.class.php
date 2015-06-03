<?php
/**
 * Created by PhpStorm.
 * User: cony
 * Date: 14-3-7
 * Time: 下午3:40
 */
namespace Home\Controller;
use Think\Controller;
class SceneController extends Controller{ 

    public function unlogin(){
		if(intval(session('userid')) == 0) 
		{
			header('Content-type: text/json');
			header('HTTP/1.1 401 Unauthorized');
			echo json_encode(array("success" => false,"code"=> 1001,"msg" => "请先登录!","obj"=> null,"map"=> null,"list"=> null));
			exit;
		}
    }
	

    public function _initialize(){
        header('Content-type: application/json;charset=UTF-8');
		if(intval(session('userid')) != 100)
		{
			//$wheresessionuser["userid_int"] = intval(session('userid'));
			
		}
		if(!defined('VIRIFY')){
			virifylocal();
		}
	}

    public function addpv(){
         $returnInfo = D("Scene")->addpv();
    }
	
    public function usepage(){
         $returnInfo = D("Scene")->usepage();
    }
	

    public function index(){
		$this->unlogin();
        if (IS_POST) {
			// 登录验证
            //$returnLoginInfo = D("Shoppingcart")->addcart();
            // 生成认证条件
			// 登录成功
			//echo json_encode($returnLoginInfo);
		}
		else
		{
			$_scene = M('scene');
			//$where['uid']  = $datainfo['uid'];
			$where['sceneid_bigint']  = I('get.id',0);
			if(intval(session('userid'))!=1)
			{
				$where['userid_int']  = intval(session('userid'));
			}
			$where['delete_int']  = 0;
			$_scene_list=$_scene->where($where)->order('sceneid_bigint desc')->select();     
			//$this->assign('webtitle','购物车');
            //$this->display();
			echo json_encode(array("success" => true,
									"code"=> 200,
									"msg" => "success",
									"obj"=> 1,
									"map"=> null,
									"list"=> null
								   )
							);
		}
    }
	
    public function create(){
		$this->unlogin();
        if (IS_POST) {
			// 登录验证
            $returnInfo = D("Scene")->addscene();
            // 生成认证条件
			// 登录成功
			//echo json_encode($returnLoginInfo);
		}
    }
	
	
    public function createBySys(){
		$this->unlogin();
        if (IS_POST) {
			// 登录验证
            $returnInfo = D("Scene")->addscenebysys();
            // 生成认证条件
			// 登录成功
			//echo json_encode($returnLoginInfo);
		}
    }
	
    public function createByCopy(){
		$this->unlogin();
        $returnInfo = D("Scene")->addscenebycopy();
    }
	
    public function on(){
		$this->unlogin();
        $returnInfo = D("Scene")->openscene(1);
    }
	
    public function off(){
		$this->unlogin();
        $returnInfo = D("Scene")->openscene(2);
    }
	
	public function publish(){
		$m_scene=M('Scene');	 

		$where['sceneid_bigint'] = I('get.id',0);
		$datainfo['publishTime'] = time();
		$where['userid_int'] = session('userid');
		if($m_scene->data($datainfo)->where($where)->save()){
			$jsonstr='{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":null}';	
			
		}else{
			$jsonstr='{"success":false,"code":101,"msg":"操作失败","obj":null,"map":null,"list":null}';	
			
			}
			
 		echo $jsonstr;
	}

    public function savepage(){
		$this->unlogin();
        if (IS_POST) {
			// 登录验证
			if((session('level_int')=='4'&& session('type')=='1')){	      
                $returnInfo = D("Scenepagesys")->savepagesys();
			}else{
				$returnInfo = D("Scene")->savepage();
			}            
			//echo json_encode($returnLoginInfo);
		}
    }
	

    public function saveSettings(){
		$this->unlogin();
        if (IS_POST) {
			// 登录验证 
            $returnInfo = D("Scene")->savesetting();
            // 生成认证条件
			// 登录成功
			//echo json_encode($returnLoginInfo);
		}
    }
	



	
    public function pageList(){
		$this->unlogin();
		   $sceneid = I('get.id',0);
		  
		if($sceneid=='1100'||$sceneid=='1101'||$sceneid=='1102'||$sceneid=='1103'){
			
			if((session('level_int')=='4'&& session('type')=='1')){	
				$_scenepage = M('scenepagesys');
				//$where['uid']  = $datainfo['uid'];
				$where['biztype_int']  = $sceneid;
				$where['myTypl_id']=0;
				
				$_scene_list=$_scenepage->where($where)->order('pagecurrentnum_int asc')->select();
				// 
				$jsonstr = '{"success":true,"code":200,"msg":"success","obj":null,"map":null,"list":[';
				$jsonstrtemp = '';
				foreach($_scene_list as $vo){
					$jsonstrtemp = $jsonstrtemp .'{"id":'.$vo["pageid_bigint"].',"sceneId":'.$vo["biztype_int"].',"num":'.$vo["pagecurrentnum_int"].',"name":"'.$vo["pagename_varchar"].'","properties":null,"elements":null,"scene":null},';
				}
				$jsonstr = $jsonstr.rtrim($jsonstrtemp,',').']}';
				echo $jsonstr;   
			}else{
				header('HTTP/1.1 403 Unauthorized');
				exit('{"success":false,"code":403,"msg":"未授权","obj":null,"map":null,"list":null}');
			}
			
		}else{
			$_scenepage = M('scenepage');
			//$where['uid']  = $datainfo['uid'];
			$where['sceneid_bigint']  = I('get.id',0);
			$where['myTypl_id']=0;
			if(intval(session('userid'))!=1)
			{
				$where['userid_int']  = intval(session('userid'));
			}
			$_scene_list=$_scenepage->where($where)->order('pagecurrentnum_int asc')->select();
			
			//var_dump($_scene_list);exit;     
			//$this->display();
			$jsonstr = '{"success":true,"code":200,"msg":"success","obj":null,"map":null,"list":[';
			$jsonstrtemp = '';
			foreach($_scene_list as $vo){
				$jsonstrtemp = $jsonstrtemp .'{"id":'.$vo["pageid_bigint"].',"sceneId":'.$vo["sceneid_bigint"].',"num":'.$vo["pagecurrentnum_int"].',"name":"'.$vo["pagename_varchar"].'","properties":null,"elements":null,"scene":null},';
			}
			$jsonstr = $jsonstr.rtrim($jsonstrtemp,',').']}';
			echo $jsonstr;
		}
    }

	
    public function pvcount(){
		$this->unlogin();
		$_scene = M('scene');
		$where['userid_int']  = intval(session('userid'));
		$where['delete_int']  = 0;
		$_scene_list=$_scene->where($where)->sum('hitcount_int');
		echo '{"success":true,"code":200,"msg":"success","obj":'.$_scene_list.',"map":null,"list":null}';
    }
	
    public function opencount(){
		$this->unlogin();
		$_scene = M('scene');
		$where['userid_int']  = intval(session('userid'));
		$where['delete_int']  = 0;
		$where['showstatus_int']  = 1;
		$_scene_list=$_scene->where($where)->count();
		echo '{"success":true,"code":200,"msg":"success","obj":'.$_scene_list.',"map":null,"list":null}';
    }
	
    public function view(){
		$_scene = M('scene');
		$isPreview = I('get.preview',0);
		//$where['uid']  = $datainfo['uid'];
		if(is_numeric(I('get.id',0))){
			$where2['sceneid_bigint']  = I('get.id',0);
		}
		else
		{
			$where2['scenecode_varchar']  = I('get.id',0);
		}
		$where2['delete_int']  = 0;
		$_scene_list2=$_scene->where($where2)->select();
		if($_scene_list2[0]['showstatus_int']!=1)
		{
			if($_scene_list2[0]['userid_int']!=intval(session('userid')))
			{
				$where3['sceneid_bigint']  = 267070;
				$_scene_list2=$_scene->where($where3)->select();
			}  
		}  

		$advuserinfo['userid_int'] = $_scene_list2[0]['userid_int'];
		$advUser = M('users');
		$returnadvInfo=$advUser->where($advuserinfo)->select();
		
		$_scenepage = M('scenepage');
		$where['sceneid_bigint']  = $_scene_list2[0]['sceneid_bigint'];
		$_scene_list=$_scenepage->where($where)->order('pagecurrentnum_int asc')->select();

		$_scene_list2[0]['lastpageid']=$_scene_list2[0]['lastpageid']>0? intval($_scene_list2[0]['lastpageid']):0;

		//var_dump($_scene_list);exit;     
		//$this->display();
		$jsonstr = '{"success": true,"code": 200,"msg": "操作成功","obj": {"id": '.$_scene_list2[0]['sceneid_bigint'].',"name": '.json_encode($_scene_list2[0]['scenename_varchar']).',"createUser": "'.$_scene_list2[0]['userid_int'].'","type": '.$_scene_list2[0]['scenetype_int'].',"pageMode": '.$_scene_list2[0]['movietype_int'].',"image": {"imgSrc": "'.$_scene_list2[0]['thumbnail_varchar'].'",
		"lastPageId":'.$_scene_list2[0]['lastpageid'].',
		"hideEqAd":'.$_scene_list2[0]['hideeqad'];
		if($isPreview){
			$this->unlogin();
			$jsonstr = $jsonstr.',"isAdvancedUser": true';
		}else{
			$jsonstr = $jsonstr.',"isAdvancedUser": '.$_scene_list2[0]['isadvanceduser'];
		}	
		if($_scene_list2[0]["musicurl_varchar"]!='')
		{
			$jsonstr = $jsonstr.',"bgAudio": {"url": "'.$_scene_list2[0]["musicurl_varchar"].'","type": "'.$_scene_list2[0]["musictype_int"].'"}';
		}
		$_scene_list2[0]['hitcount_int']=$_scene_list2[0]['hitcount_int']?intval($_scene_list2[0]['hitcount_int']):0;
		$jsonstr = $jsonstr.'	
        },
        "isTpl": 0,
        "isPromotion": 0,
        "status": 1,
        "openLimit": 0,
        "startDate": null,
        "endDate": null,
        "updateTime": 1426045746000,
		"createTime": 1426572693000,
		"publishTime":1426572693000,
        "applyTemplate": 0,
        "applyPromotion": 0,
        "sourceId": null,
        "code": "'.$_scene_list2[0]['scenecode_varchar'].'",
        "description": '.json_encode($_scene_list2[0]['desc_varchar']).',
        "sort": 0,
        "pageCount": 0,
        "dataCount": 0,
        "showCount": '.$_scene_list2[0]['hitcount_int'].',
		"eqcode" :"'.$_scene_list2[0]['eqcode'].'",
        "userLoginName": null,
        "userName": null
    },
    "map": null,
    "list": [';
		$jsonstrtemp = '';
		foreach($_scene_list as $vo)
        {
			//		$datas['elements'][$key]['content']=strpos($val['content'],'eqs/link?id=')!==false ? str_replace('eqs/link?id=','?c=scene&a=link&id='):	$val['content'];	
			if(strpos($vo["content_text"],'eqs\/link?id')!==false){
				$vo["content_text"]=str_replace('eqs\/link?id','?c=scene&a=link&id',$vo["content_text"]);
				
			}
			 
		    
			$jsonstrtemp = $jsonstrtemp .'{"id": '.$vo["pageid_bigint"].',"sceneId": '.$vo["sceneid_bigint"].',"num": '.$vo["pagecurrentnum_int"].',
				"name": null,"properties":'.$vo["properties_text"].',"elements": '.$vo["content_text"].',"scene": null},';
		}
		// 
		if(C('IS_COUM_AD')){
			$jsonstrtemp=get_scene_ad($jsonstrtemp,$_scene_list2,$isPreview); 
		}
		
		$jsonstr = $jsonstr.rtrim($jsonstrtemp,',').'';
		$jsonstr = $jsonstr.']}';
		echo $jsonstr;
    }

	
    public function design(){
		$this->unlogin();
		 $pageid = I('get.id',0);
	
		if(session('level_int') =='4'&& session('type')=='1'){   	
			$sceneid=M('scenepagesys')->where('pageid_bigint='.$pageid)->getField('biztype_int');
			 
			// echo $sceneid.'dddd';
		} 
        if($sceneid&&$sceneid<1104){
			
			//echo $_info[level_int] . '   '.$_info[type].session('userid');
			//$_info = M('users')->field('type,level_int')->where('userid_int='.session('userid'))->find();			
			//if($_info[level_int]=='4'&& $_info[type]=='1'){            
			
			
            $_scenepage = M('scenepagesys');
            //$where['uid']  = $datainfo['uid'];
            $where['pageid_bigint']  = I('get.id',0);
            if(intval(session('userid'))!=1)
            {
                //$where['userid_int']  = intval(session('userid'));
            }
            $_scene_list=$_scenepage->where($where)->select();
			// echo D()->getLastSql();
            // print_r($_scene_list);die();
            $_scene = M('scene');
            //$where['uid']  = $datainfo['uid'];
            if(intval(session('userid'))!=1)
            {
                //$where2['userid_int']  = intval(session('userid'));
            }
            $where2['delete_int']  = 0;
            $where2['sceneid_bigint']  = $_scene_list[0]['biztype_int'];
            $_scene_list2=$_scene->where($where2)->select();  
			   
			//echo D()->getLastSql();
			//print_r($_scene_list);die();
            $replaceArray = json_decode($_scene_list[0]['content_text'],true);
            foreach($replaceArray as $key => $value){
                $replaceArray[$key]['sceneId'] = $_scene_list[0]['biztype_int'];
                $replaceArray[$key]['pageId'] = $where['pageid_bigint'];
            }
            $replaceArray = json_encode($replaceArray);

            $jsonstr = '{"success": true,"code": 200,"msg": "success","obj": {"id": '.$_scene_list[0]['pageid_bigint'].',"sceneId": '.$_scene_list[0]['biztype_int'].',"num": '.$_scene_list[0]['pagecurrentnum_int'].',"name": null,"properties": {"thumbSrc":"'.$_scene_list[0]["thumbsrc_varchar"].'"},"elements": '.$replaceArray.',"scene": {"id": '.$_scene_list2[0]['sceneid_bigint'].',"name": '.json_encode($_scene_list2[0]['scenename_varchar']).',"createUser": "'.$_scene_list2[0]['userid_int'].'","createTime": 1425998747000,"type": '.$_scene_list2[0]['scenetype_int'].',"pageMode": 0,"image": {"imgSrc": "'.$_scene_list2[0]['movietype_int'].'","isAdvancedUser": false';
			 
		
		    if($_scene_list2[0]['musicurl_varchar']!=''){
                $jsonstr = $jsonstr.',"bgAudio": {"url": "'.$_scene_list2[0]["musicurl_varchar"].'","type": "'.$_scene_list2[0]["musictype_int"].'"}';
            }
            $jsonstr = $jsonstr.'},"isTpl": 0,"isPromotion": 0,"status": 1,"openLimit": 0,	"submitLimit": 0,	"startDate": null,	"endDate": null,	"accessCode": null,	"thirdCode": null,	"updateTime": 1426038857000,	"publishTime": 1426038857000,	"applyTemplate": 0,	"applyPromotion": 0,	"sourceId": null,	"code": "'.$_scene_list2[0]['scenecode_varchar'].'",	"description": "'.($_scene_list2[0]['desc_varchar']).'",	"sort": 0,"pageCount": 0,	"dataCount": 0,	"showCount": 0,	"userLoginName": null,"userName": null}},	"map": null,"list": null}';
            echo $jsonstr;
        }else{
			$_scenepage = M('scenepage');
			//$where['uid']  = $datainfo['uid'];
			$where['pageid_bigint']  = I('get.id',0);
			if(intval(session('userid'))!=1)
			{
				$where['userid_int']  = intval(session('userid'));
			}
			$_scene_list=$_scenepage->where($where)->select();
			 
			$_scene = M('scene');
			//$where['uid']  = $datainfo['uid'];
			if(intval(session('userid'))!=1)
			{
				$where2['userid_int']  = intval(session('userid'));
			}
			$where2['delete_int']  = 0;
			$where2['sceneid_bigint']  = $_scene_list[0]['sceneid_bigint'];
			$_scene_list2=$_scene->where($where2)->select();     
	
			$replaceArray = json_decode($_scene_list[0]['content_text'],true);
			foreach($replaceArray as $key => $value){
				$replaceArray[$key]['sceneId'] = $_scene_list[0]['sceneid_bigint'];
				$replaceArray[$key]['pageId'] = $where['pageid_bigint'];
			}
			$replaceArray = json_encode($replaceArray);
	
			$jsonstr = '{"success": true,"code": 200,"msg": "success","obj": {"id": '.$_scene_list[0]['pageid_bigint'].',"sceneId": '.$_scene_list[0]['sceneid_bigint'].',"num": '.$_scene_list[0]['pagecurrentnum_int'].',"name": null,"properties": '.$_scene_list[0]["properties_text"].',"elements": '.$replaceArray.',"scene": {"id": '.$_scene_list2[0]['sceneid_bigint'].',"name": '.json_encode($_scene_list2[0]['scenename_varchar']).',"createUser": "'.$_scene_list2[0]['userid_int'].'","createTime": 1425998747000,"type": '.$_scene_list2[0]['scenetype_int'].',"pageMode": '.$_scene_list2[0]['movietype_int'].',"image": {"imgSrc": "'.$_scene_list2[0]['movietype_int'].'","isAdvancedUser": false';
			if($_scene_list2[0]['musicurl_varchar']!=''){
				$jsonstr = $jsonstr.',"bgAudio": {"url": "'.$_scene_list2[0]["musicurl_varchar"].'","type": "'.$_scene_list2[0]["musictype_int"].'"}';
			}
			$jsonstr = $jsonstr.'},"isTpl": 0,"isPromotion": 0,"status": 1,"openLimit": 0,	"submitLimit": 0,	"startDate": null,	"endDate": null,	"accessCode": null,	"thirdCode": null,	"updateTime": 1426038857000,	"publishTime": 1426038857000,	"applyTemplate": 0,	"applyPromotion": 0,	"sourceId": null,	"code": "'.$_scene_list2[0]['scenecode_varchar'].'",	"description": "'.($_scene_list2[0]['desc_varchar']).'",	"sort": 0,"pageCount": 0,	"dataCount": 0,	"showCount": '.$_scene_list2[0]['hitcount_int'].',	"userLoginName": null,"userName": null}},	"map": null,"list": null}';
			echo $jsonstr;
		}
    }


    public function detail(){
		$this->unlogin();
		$_scene = M('scene');
		if(intval(session('userid'))!=1)
		{
			$where['userid_int']  = intval(session('userid'));
		}
		$where['sceneid_bigint']  = I('get.id',0);
		$where['delete_int']  = 0;
		$_scene_list=$_scene->where($where)->select();     
		$_scene_list[0]['lastpageid']=$_scene_list[0]['lastpageid']>0? intval($_scene_list[0]['lastpageid']):0;

		$jsonstr = '{
			"success": true,
			"code": 200,
			"msg": "success",
			"obj": {
				"id": '.$_scene_list[0]['sceneid_bigint'].',
				"name": '.json_encode($_scene_list[0]['scenename_varchar']).',
				"createUser": "'.$_scene_list[0]['userid_int'].'",
				"createTime": 1425998747000,
				"type": '.$_scene_list[0]['scenetype_int'].',
				"pageMode": '.$_scene_list[0]['movietype_int'].',
				"eqcode": "'.$_scene_list[0]['eqcode'].'",
				"image": {
					"imgSrc": "'.$_scene_list[0]['thumbnail_varchar'].'",
					"isAdvancedUser": '.$_scene_list[0]['isadvanceduser'].',
                    "lastPageId":'.$_scene_list[0]['lastpageid'].',
                    "hideEqAd":'.$_scene_list[0]['hideeqad'];
				
				if($_scene_list[0]["musicurl_varchar"]!='')
				{
					$jsonstr = $jsonstr.',"bgAudio": {"url": "'.$_scene_list[0]["musicurl_varchar"].'","type": "'.$_scene_list[0]["musictype_int"].'"}';
				}
				$jsonstr = $jsonstr.'},
				"isTpl": 0,
				"isPromotion": 0,
				"status": '.$_scene_list[0]['showstatus_int'].',
				"openLimit": 0,
				"submitLimit": 0,
				"startDate": null,
				"endDate": null,
				"accessCode": null,
				"thirdCode": null,
				"updateTime": 1426041829000,
				"publishTime": 1426041829000,
				"applyTemplate": 0,
				"applyPromotion": 0,
				"sourceId": null,
				"code": "'.$_scene_list[0]['scenecode_varchar'].'",
				"description": '.json_encode($_scene_list[0]['desc_varchar']).',
				"sort": 0,
				"pageCount": 0,
				"dataCount": '.$_scene_list[0]["datacount_int"].',
				"showCount": '.$_scene_list[0]['hitcount_int'].',
				"userLoginName": null,
				"userName": null
			},
			"map": null,
			"list": null
		}';
		echo $jsonstr;

    }


	public function createpage(){
		$this->unlogin();
		
		if((session('level_int')=='4'&& session('type')=='1')){	
		
			D("Scenepagesys")->addpagesys();				
		}else{

			$_scenepage = M('scenepage');
			$_scene = M('scene');
			$where['pageid_bigint']  = I('get.id',0);
			$iscopy  = I('get.copy',"false");
		$getid = I('get.id',0);
			if((session('level_int')!='4')){	
				$where['userid_int']  = intval(session('userid'));
			}
			$_scene_list=$_scenepage->where($where)->select();
		 
			if(!$_scene_list)
			{
				header('HTTP/1.1 403 Unauthorized');
				echo json_encode(array("success" => false,"code"=> 403,"msg" => "false","obj"=> null,"map"=> null,"list"=> null));
				exit;
			}
			$datainfo['scenecode_varchar'] = $_scene_list[0]['scenecode_varchar'];
			$datainfo['sceneid_bigint'] = $_scene_list[0]['sceneid_bigint'];
			$datainfo['pagecurrentnum_int'] = $_scene_list[0]['pagecurrentnum_int']+1;
			$datainfo['createtime_time'] = date('y-m-d H:i:s',time());
			if($iscopy=="true")
			{
				$datainfo['content_text'] = $_scene_list[0]['content_text'];
			}
			else
			{
				$datainfo['content_text'] = "[]";
			}
			$datainfo['properties_text'] = 'null';
			$datainfo['userid_int'] = session('userid');
			$result = $_scenepage->add($datainfo);
			
			$where2['sceneid_bigint']  = $_scene_list[0]['sceneid_bigint'];
			if(intval(session('userid'))!=1)
			{
				$where2['userid_int']  = intval(session('userid'));
			}
			$_scene_list2=$_scene->where($where2)->select();     

			$jsonstr = '{
					"success": true,
					"code": 200,
					"msg": "success",
					"obj": {
						"id": '.$result.',
						"sceneId": '.$_scene_list[0]['sceneid_bigint'].',
						"num": '.($_scene_list[0]['pagecurrentnum_int']+1).',
						"name": null,
						"properties": null,
						"elements": null,
						"scene": {
							"id": '.$_scene_list2[0]['sceneid_bigint'].',
							"name": '.json_encode($_scene_list2[0]['scenename_varchar']).',
							"createUser": "'.$_scene_list2[0]['userid_int'].'",
							"createTime": 1425998747000,
							"type": '.$_scene_list2[0]['scenetype_int'].',
							"pageMode": '.$_scene_list2[0]['movietype_int'].',
							"image": {
								"imgSrc": "'.$_scene_list2[0]['thumbnail_varchar'].'",
								"isAdvancedUser": false
							},
							"isTpl": 0,
							"isPromotion": 0,
							"status": '.$_scene_list2[0]['showstatus_int'].',
							"openLimit": 0,
							"submitLimit": 0,
							"startDate": null,
							"endDate": null,
							"accessCode": null,
							"thirdCode": null,
							"updateTime": 1426039827000,
							"publishTime": 1426039827000,
							"applyTemplate": 0,
							"applyPromotion": 0,
							"sourceId": null,
							"code": "'.$_scene_list2[0]['scenecode_varchar'].'",
							"description": '.json_encode($_scene_list2[0]['desc_varchar']).',
							"sort": 0,
							"pageCount": 0,
							"dataCount": 0,
							"showCount": 0, 
							"userLoginName": null,
							"userName": null
						}
					},
					"map": null,
					"list": null,
					"iscopy":"'.$iscopy.'-----'.$getid.'"
				}';
			echo $jsonstr;


		}
	}

    public function delpage(){
		$this->unlogin();
		if((session('level_int')=='4'&& session('type')=='1')){	
			$map['pageid_bigint']= I('get.id',0);
			 
			M("scenepagesys")->where($map)->delete();
			 
		}else{
			$map['pageid_bigint']= I('get.id',0);
			if(intval(session('userid'))!=1)
			{
				$map['userid_int']  = intval(session('userid'));
			}
			M("scenepage")->where($map)->delete();
		}
       
		echo json_encode(array("success" => true,
								"code"=> 200,
								"msg" => "success",
								"obj"=> null,
								"map"=> null,
								"list"=> null
							   )
						);


    }
	
    public function getcount(){
		echo json_encode(array("success" => true,
								"code"=> 200,
								"msg" => "success",
								"obj"=> null,
								"map"=> null,
								"list"=> null
							   )
						);


    }


    public function delscene(){
		$this->unlogin();
		$map['sceneid_bigint']= I('get.id',0);
		if(intval(session('userid'))!=1)
		{
			$map['userid_int']  = intval(session('userid'));
		}
		$datainfo['delete_int'] = 1;
		M("scene")->data($datainfo)->where($map)->save();

		echo json_encode(array("success" => true,
								"code"=> 200,
								"msg" => "success",
								"obj"=> null,
								"map"=> null,
								"list"=> null
							   )
						);


    }
	//我的场景列表 
    public function my(){
		$this->unlogin();
		$_scene = M('scene');
		$scenetype = intval(I('get.type',0));
		if($scenetype > 0)
		{
			$where['scenetype_int']  = $scenetype;
		}
		$where['userid_int']  = intval(session('userid'));
		//$_scene_list=$_scene->order('sceneid_bigint desc')->page(I('get.pageNo',1),I('get.pageSize',12))->select();
		 $where['delete_int']  = 0;
		$pageshowsize = I('get.pageSize',12);
		if($pageshowsize>30){
			$pageshowsize = 30;
		}
		$_scene_list=$_scene->where($where)->order('sceneid_bigint desc')->page(I('get.pageNo',1),$pageshowsize)->select();
 		$_scene_count = $_scene->where($where) ->count();
		
		//print_r($_scene_list);exit;     
		// $this->display();
		$jsonstr = '{"success":true,"code":200,"msg":"success","obj":null,"map": {"count": '.$_scene_count.',"pageNo": '.I('get.pageNo',0).',"pageSize": '.$pageshowsize.'},"list": [';
		$jsonstrtemp = '';
		foreach($_scene_list as $vo){
			$publishTime=$vo['publishtime']>0 ? $vo['publishtime']:'null';
			$updateTime=$vo['updateTime']>0 ? $vo['updateTime']:'null';
			//$vo['showstatus_int']=0;
			$jsonstrtemp = $jsonstrtemp .'{
            "id": '.$vo["sceneid_bigint"].',
            "name": '.json_encode($vo["scenename_varchar"]).',
            "createUser": "'.$vo['userid_int'].'",
            "createTime": 1423645519000,
            "type": '.$vo["scenetype_int"].',
            "pageMode": '.$vo["movietype_int"].',
            "image": {
                "bgAudio": {
                    "url": "'.$vo["musicurl_varchar"].'",
                    "type": "'.$vo["musictype_int"].'"
                },
                "imgSrc": "'.$vo["thumbnail_varchar"].'",
                "hideEqAd": '.$vo["hideeqad"].',
                "isAdvancedUser": '.$vo["isadvanceduser"].'
            },
            "isTpl": 0,
            "isPromotion": 0,
            "status": '.$vo['showstatus_int'].',
            "openLimit": 0,
            "submitLimit": 0,
            "startDate": null,
            "endDate": null,
            "accessCode": null,
            "thirdCode": null,
            "updateTime": '.$updateTime.',
            "publishTime": '.$publishTime.',
            "applyTemplate": 0,
            "applyPromotion": 0,
            "sourceId": 1225273,
            "code": "'.$vo["scenecode_varchar"].'",
            "description": '.json_encode($vo["desc_varchar"]).',
            "sort": 0,
            "pageCount": 0,
            "dataCount": '.$vo["datacount_int"].',
            "showCount": '.$vo["hitcount_int"].',
            "userLoginName": null,
            "userName": null
        },';
		}
		$jsonstr = $jsonstr.rtrim($jsonstrtemp,',').']}';
		echo $jsonstr;
    }

	//  系统模板列表
    public function syslist(){
		$this->unlogin();
		$_scene = M('scene');
		$scenetype = intval(I('get.tagId',0));
		if($scenetype > 0)
		{
			$where['tagid_int']  = $scenetype;
		}
		$where['userid_int']  = 0;

		$where['delete_int']  = 0;
		$pageshowsize = I('get.pageSize',12);
		if($pageshowsize>30){
			$pageshowsize = 30;
		}
		$_scene_list=$_scene->where($where)->order('rank desc,  sceneid_bigint desc')->page(I('get.pageNo',1),$pageshowsize)->select();
		$_scene_count = $_scene->where($where) ->count();
		//var_dump($_scene_list);exit;     
		//$this->display();
		$jsonstr = '{"success":true,"code":200,"msg":"success","obj":null,"map": {"count": '.$_scene_count.',"pageNo": '.I('get.pageNo',0).',"pageSize": '.$pageshowsize.'},"list": [';
		$jsonstrtemp = '';
		foreach($_scene_list as $vo){
			
			$jsonstrtemp = $jsonstrtemp .'{
            "id": '.$vo["sceneid_bigint"].',
            "name": '.json_encode($vo["scenename_varchar"]).',
            "createUser": "'.$vo['userid_int'].'",
            "createTime": 1423645519000,
            "type": '.$vo["scenetype_int"].',
            "pageMode": '.$vo["movietype_int"].',
            "image": {
                "bgAudio": {
                    "url": "'.$vo["musicurl_varchar"].'",
                    "type": "'.$vo["musictype_int"].'"
                },
                "imgSrc": "'.$vo["thumbnail_varchar"].'",
                "hideEqAd": false,
                "isAdvancedUser": false
            },
            "isTpl": 0,
            "isPromotion": 0,
            "status": '.$vo['showstatus_int'].',
            "openLimit": 0,
            "submitLimit": 0,
            "startDate": null,
            "endDate": null,
            "accessCode": null,
            "thirdCode": null,
            "updateTime": 1423645519000,
            "publishTime": 1423645519000,
            "applyTemplate": 0,
            "applyPromotion": 0,
            "sourceId": 1225273,
            "code": "'.$vo["scenecode_varchar"].'",
            "description": '.json_encode($vo["desc_varchar"]).',
            "sort": 0,
            "pageCount": 0,
            "dataCount": 0,
            "showCount": '.$vo["hitcount_int"].',
            "userLoginName": null,
            "userName": null
        },';
		}
	
		$jsonstr = $jsonstr.rtrim($jsonstrtemp,',').']}';
		echo $jsonstr;
    }

	public function promotion(){
		$jsonstr='{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":[';
		$_scene = M('scene');
		$scenetype = intval(I('get.type',0));
		if($scenetype > 0)
		{
			$where['scenetype_int']  =  $scenetype;
		}
		$where['userid_int']  = array('gt',0);

		$where['delete_int']  = 0;
		$where['shenhe']  = 1;
		
		$where['showstatus_int']  = 1;
		$pageshowsize = I('get.pageSize',6);
		if($pageshowsize>30){
			$pageshowsize = 30;
		}
		$_scene_list=$_scene->where($where)->order('rank desc,sceneid_bigint desc')->page(I('get.pageNo',1),$pageshowsize)->select();
		 
		 
		$jsonstrtemp = '';
		foreach($_scene_list as $vo){
			$jsonstrtemp = $jsonstrtemp .'{
            "id": '.$vo["sceneid_bigint"].',
            "name": '.json_encode($vo["scenename_varchar"]).',
            "createUser": "'.$vo['userid_int'].'",
            "createTime": 1423645519000,
            "type": '.$vo["scenetype_int"].',
            "pageMode": '.$vo["movietype_int"].',
            "image": {
                "bgAudio": {
                    "url": "'.$vo["musicurl_varchar"].'",
                    "type": "'.$vo["musictype_int"].'"
                },
                "imgSrc": "'.$vo["thumbnail_varchar"].'",
                "hideEqAd": false,
                "isAdvancedUser": false
            },
            "isTpl": 0,
            "isPromotion": 0,
            "status": '.$vo['showstatus_int'].',
            "createTime": "'.$vo['createtime_time'].'",                  
            "code": "'.$vo["scenecode_varchar"].'",           
            "sort": 0,
            "pageCount": 0,
            "dataCount": 0,
            "showCount": '.$vo["hitcount_int"].',
            "userLoginName": null,
            "userName": null
        },';
		}
		
		$jsonstr = $jsonstr.rtrim($jsonstrtemp,',').']}';
		echo $jsonstr;
	}

	public function syspageinfo(){
		$this->unlogin();
		$_scene = M('scenepagesys');
		$scenetype = intval(I('get.id',0));
		$where['pageid_bigint']  = $scenetype;
		$_scene_list=$_scene->where($where)->select();
		$jsonstr = '{"success":true,"code":200,"msg":"success","obj":{"id":'.$_scene_list[0]['pageid_bigint'].',"sceneId":1,"num":1,"name":"sys","properties":{"thumbSrc":"'.$_scene_list[0]['thumbsrc_varchar'].'"},"elements":'.$_scene_list[0]['content_text'].',"scene":null},"map":null,"list":null}';
		echo $jsonstr;
    }

    public function syspagetpl(){
		$this->unlogin();
		$_scene = M('scenepagesys');
		$scenetype = intval(I('get.tagId',0));
		$where['tagid_int']  = $scenetype;

		//$_scene_list=$_scene->where($where)->order('pageid_bigint desc')->select();
		
		$_scene_list=$_scene->where("FIND_IN_SET($scenetype,tagids_int)>0 ")->order('pagecurrentnum_int desc,pageid_bigint desc')->select();
		//
		$jsonstr = '{"success":true,"code":200,"msg":"success","obj":null,"map": null,"list": [';
		$jsonstrtemp = '';
		foreach($_scene_list as $vo){
			$jsonstrtemp = $jsonstrtemp .'{"id":'.$vo["pageid_bigint"].',"sceneId":1,"num":1,"name":"name","properties":{"thumbSrc":"'.$vo["thumbsrc_varchar"].'"},"elements":null,"scene":null},';
		}
		$jsonstr = $jsonstr.rtrim($jsonstrtemp,',').']}';
		echo $jsonstr;
    }
	
	public function myTplSave(){
		
		$jsonStr='{"success":true,"code":200,"msg":"操作成功","obj":3138268,"map":null,"list":null}';
		echo $jsonstr;
	}
	
	public function link(){
		$url=$_GET['url'];
		if($url){
			echo ''.$url."\n";
			
			echo htmlentities($url);
			
			//$url=urldecode($url);exit;
			header('Location: ' . $url);	
		}
	}
	
	public function transfer(){
		$this->unlogin();
		$_user = M('users');
		$username = I('get.loginName','yy');
		$sceneid = I('get.id',0);
		$where['email_varchar'] = $username;
		$userinfo = $_user->where($where)->select();
		$_scene = M('scene');
		$where2['sceneid_bigint'] = $sceneid;
		$sceneinfo = $_scene->where($where2)->select();
		M('scene')->where($where2)->save(array('userid_int'=>$userinfo[0]['userid_int']));
		M('scenepage')->where($where2)->save(array('userid_int'=>$userinfo[0]['userid_int']));
		
		//print_r($sceneinfo) ;
		$jsonStr='{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":null}';
		echo $jsonStr;
	}
	
	public function getPageTpl(){
		$this->unlogin();
		$_PageTpl = M('upfilesys');
		$where['filetype_int']  = I('get.Type',1301);
		$_PageTpllsit=$_PageTpl->where($where)->order('fileid_bigint asc')->select();
		$jsonstr = '{"success":true,"code":200,"msg":"success","obj":null,"map":null,"list":[';
		$jsonstrtemp = '';
		foreach($_PageTpllsit as $vo)
		{
			$jsonstrtemp = $jsonstrtemp //.'{"id":'.$vo["tagid_int"].',"name":'.json_encode($vo["name_varchar"]).',"createUser":"0","createTime":1423122412000,"bizType":'.$vo["biztype_int"].'},';
				.'{"id":'.$vo["fileid_bigint"].',"sceneId":1301,"num":1,"name":null,"properties":{"thumbSrc":"'.$vo["filethumbsrc_varchar"].'"},"elements":null,"scene":null},';
		}
		$jsonstr = $jsonstr.rtrim($jsonstrtemp,',').'';
		$jsonstr = $jsonstr.']}';
		
		echo $jsonstr; 
	}
	public function getLastPageBg(){
		$_PageBg = M('upfilesys');
		$where['fileid_bigint']  = I('get.id',0);
		$_PageBgList=$_PageBg->where($where)->select();                              //width: 158px; height: 245px; margin-top: -43.5px; margin-left: 0px;
		
		//系统变量引入
		$sysinfo=M('sys')->order('id asc')->find();	
		
		$jsonStr = '{"success":true,"code":200,"msg":"操作成功","obj":{"id":'.$_PageBgList[0]["fileid_bigint"].',"sceneId":1301,"num":4,"name":null,"properties":{"thumbSrc":"'.$_PageBgList[0]["filesrc_varchar"].'"},"elements":[{"id":183335727,"pageId":26143278,"sceneId":1301,"type":"3","css":{"zIndex":"1"},"properties":{"imgSrc":"'.$_PageBgList[0]["filesrc_varchar"].'"}},{"id":183335728,"pageId":26143278,"sceneId":1301,"type":"4","css":{"height":"16","zIndex":"2","width":"280","left":"21px","top":"122px"},"properties":{"height":"100px","imgStyle":{"width":280,"height":73,"marginTop":"-24px","marginLeft":"0px"},"width":"100px","src":"line.png"}},{"id":183335732,"pageId":26143278,"sceneId":1301,"type":"4","css":{"zIndex":"3","height":"257","width":"257","left":"84px","top":"170px"},"properties":{"height":"100px","imgStyle":{"width":158,"height":158,"marginTop":"-43.5px","marginLeft":"0px"},"width":"100px","src":"shadow.jpg"}},{"id":183335731,"pageId":26143278,"sceneId":1301,"type":"4","css":{"borderRadius":"0px","borderStyle":"solid","zIndex":"4","borderColor":"rgba(0,0,0,1)","paddingTop":"0px","height":"158","backgroundColor":"","color":"","boxShadow":"0px 0px 0px rgba(200,200,200,0.6)","borderWidth":"0px","width":"158","left":"84px","paddingBottom":"0px","top":"170px"},"properties":{"height":"100px","imgStyle":{"width":158,"height":245,"marginTop":"-43.5px","marginLeft":"0px"},"width":"100px","src":"lastbg.jpg"}},{"content":"<div style=\"text-align: center;\"><br></div>","css":{"top":"425px","left":"72px","zIndex":"5","backgroundColor":"rgba(0,0,0,0.5)","opacity":1,"color":"#676767","borderWidth":0,"borderStyle":"solid","borderColor":"rgba(0,0,0,1)","paddingBottom":0,"paddingTop":0,"lineHeight":1,"borderRadius":"22px","transform":"rotateZ(0deg)","borderRadiusPerc":100,"boxShadow":"0px 0px 0px rgba(0,0,0,0.5)","boxShadowDirection":0,"boxShadowSize":0,"width":177,"height":25,"borderBottomRightRadius":"22px","borderBottomLeftRadius":"22px","borderTopRightRadius":"22px","borderTopLeftRadius":"22px"},"id":26,"num":1,"pageId":26143278,"properties":{"width":177,"height":25,"anim":{"type":0,"direction":0,"duration":1,"delay":0,"countNum":1}},"sceneId":1301,"type":2},{"id":183335729,"pageId":26143278,"sceneId":1301,"type":"2","content":"<div style=\"text-align: center;\"><span style=\"font-size: small; line-height: 1; background-color: initial;\"><a href=\"http://e.wesambo.com\" target=\"_blank\"><font color=\"#ffffff\">免费创建一个场景→</font><font color=\"#fdea02\">一秀</font></a></span></div>","css":{"borderRadius":"0px","borderStyle":"solid","height":"42","paddingTop":"0px","borderColor":"rgba(222,220,227,1)","zIndex":"6","boxShadow":"0px 0px 0px rgba(200,200,200,0.6)","color":"","backgroundColor":"rgba(255,255,255,0)","borderWidth":"0px","width":"320","left":"0px","paddingBottom":"20px","top":"413px"},"properties":{"anim":{"type":0,"direction":3,"duration":1,"delay":0.6,"countNum":1}}}],"scene":null},"map":null,"list":null}';
		echo $jsonStr; 		
	}
	
	public function tagPageList(){
		echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":[{"id":1,"name":"图文","bizType":1101,"type":1},{"id":18,"name":"现代","bizType":1103,"type":1},{"id":120,"name":"黄色","bizType":1103,"type":1}]}';
	}
	
	public function getPageTag(){
		echo '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":[{"id":1,"name":"图文","bizType":1101,"type":1},{"id":2,"name":"图集","bizType":1101,"type":1},{"id":4,"name":"文字","bizType":1101,"type":1},{"id":5,"name":"图表","bizType":1101,"type":1},{"id":6,"name":"报名表","bizType":1102,"type":1},{"id":8,"name":"留言","bizType":1102,"type":1},{"id":9,"name":"联系","bizType":1102,"type":1},{"id":11,"name":"清新","bizType":1103,"type":1},{"id":12,"name":"蓝色","bizType":1103,"type":1},{"id":13,"name":"中国风","bizType":1103,"type":1},{"id":14,"name":"简洁","bizType":1103,"type":1},{"id":15,"name":"黑白","bizType":1103,"type":1},{"id":16,"name":"红色","bizType":1103,"type":1},{"id":17,"name":"怀旧","bizType":1103,"type":1},{"id":18,"name":"现代","bizType":1103,"type":1},{"id":19,"name":"扁平化","bizType":1103,"type":1},{"id":120,"name":"黄色","bizType":1103,"type":1},{"id":121,"name":"绿色","bizType":1103,"type":1},{"id":122,"name":"紫色","bizType":1103,"type":1},{"id":123,"name":"黑色","bizType":1103,"type":1},{"id":124,"name":"白色","bizType":1103,"type":1},{"id":125,"name":"其他","bizType":1103,"type":1},{"id":260,"name":"English","bizType":1103,"type":1},{"id":262,"name":"Android","bizType":1103,"type":1}]}';
	}


}