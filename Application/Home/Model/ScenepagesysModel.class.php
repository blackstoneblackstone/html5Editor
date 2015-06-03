<?php
/**
 * Created by e.wesambo.com
 * User: wesambo
 * Date: 2015-4-25
 *  
 */

namespace Home\Model;
use Think\Model;
class ScenepagesysModel extends Model {

    public function addpagesys() {
		$_scenepage = M('scenepagesys');
		$_scene = M('scene');
		$where['pageid_bigint']  = I('get.id',0);
		$iscopy  = I('get.copy',"false");
		 
		$crur_pageInfo=$_scenepage->where($where)->find();
		 
		if(!$crur_pageInfo)
		{
			header('HTTP/1.1 403 Unauthorized');
			echo json_encode(array("success" => false,"code"=> 403,"msg" => "false","obj"=> null,"map"=> null,"list"=> null));
			exit;
		}
		$datainfo['scenecode_varchar'] = $crur_pageInfo['scenecode_varchar'];
		$datainfo['sceneid_bigint'] = $crur_pageInfo['sceneid_bigint'];
		$datainfo['pagecurrentnum_int'] = $crur_pageInfo['pagecurrentnum_int']+1;
		$datainfo['tagid_int'] = $crur_pageInfo['tagid_int'] ;
		$datainfo['tagids_int'] = $crur_pageInfo['tagids_int'] ;
		
		
		$datainfo['createtime_time'] = date('y-m-d H:i:s',time());
		$datainfo['biztype_int'] = $crur_pageInfo['biztype_int'];
		if($iscopy=="true")
		{
			$datainfo['content_text'] = $crur_pageInfo['content_text'];
			$datainfo['pagename_varchar'] = $crur_pageInfo['pagename_varchar'].'-副本';
		}
		else
		{ 
			$datainfo['pagename_varchar'] = '新增页面'.$datainfo['pagecurrentnum_int'];
			$datainfo['content_text'] = "[]";
		}
		$datainfo['properties_text'] = 'null';
		$datainfo['userid_int'] = session('userid');
		$result = $_scenepage->add($datainfo);
		//echo  'add'. D()->getlastsql() ."<br>";
		$where2['sceneid_bigint']  = $crur_pageInfo['sceneid_bigint'];
		if(intval(session('userid'))!=1)
		{
			$where2['userid_int']  = intval(session('userid'));
		}
		$_scene_list2=$_scene->where($where2)->select();     
	//	echo D()->getlastsql() ."<br>";
		$jsonstr = '{
					"success": true,
					"code": 200,
					"msg": "success",
					"obj": {
						"id": '.$result.',
						"sceneId": '.$crur_pageInfo['sceneid_bigint'].',
						"num": '.($crur_pageInfo['pagecurrentnum_int']+1).',
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
					"list": null
				}';
		echo $jsonstr;
    }
  
	public function savepagesys(){
		$m_scene=M('scene');
		$m_scenepage=M('scenepagesys');
		$datas = json_decode(file_get_contents("php://input"),true);

		$where['pageid_bigint'] = $datas['id'];
		$where['biztype_int'] = $datas['sceneId'];
		$datainfo['pagecurrentnum_int'] = intval($datas['num']);
		//$datainfo['properties_text'] = json_encode($datas['properties']);
		//$where['userid_int'] = session('userid');
		
		//$wheredata['userid_int'] = session('userid');
		$wheredata['pageid_bigint'] = $where['pageid_bigint'];
		$wheredata['sceneid_bigint'] = $where['biztype_int'];
		$m_scenedata=M('scenedata');
		$m_scenedata->where($wheredata)->delete();
		foreach ($datas['elements'] as $key => $val ) 
		{	
			
			if($val['type']==5 || $val['type']==501 || $val['type']==502 || $val['type']==503 ){  // 501姓名、502手机 、503邮箱、5 文本
				$dataList[] = array('sceneid_bigint'=>$where['biztype_int'],
					'pageid_bigint'=>$where['pageid_bigint'],
					'elementid_int'=>$val['id'],
					'elementtitle_varchar'=>$val['title'],
					'elementtype_int'=>$val['type'],
					'userid_int'=>0
					);
				$datas['elements'][$key]['content']=strpos($val['content'],'eqs/link?id=')!==false ? str_replace('eqs/link?id=','?c=scene&a=link&id=',$val['content']):	$val['content'];			
				 
			}

		}
		$datainfo['content_text'] = json_encode($datas['elements']);
		$datainfo['thumbsrc_varchar'] = $datas['properties']['thumbSrc'];
		//print_r($datainfo);die();
		
		$m_scenepage->data($datainfo)->where($where)->save();
		 
		if(count($dataList)>0){
			$aaaa = $m_scenedata->addAll($dataList);
		}

		if($datas['scene']['image']['bgAudio']['url']!="")
		{
			$bgdatainfo['musicurl_varchar'] = $datas['scene']['image']['bgAudio']['url'];
			//var_dump($bgdatainfo['musicurl_varchar']);exit;
			$bgdatainfo['musictype_int'] = $datas['scene']['image']['bgAudio']['type'];
		}else{
			$bgdatainfo['musicurl_varchar'] = '';
		}
		$bgwhere['sceneid_bigint'] = $datas['sceneId'];
		//$bgwhere['userid_int'] = session('userid');
		
		
		
		$m_scene->data($bgdatainfo)->where($where)->save();
		//var_dump($m_scene);exit;
		echo json_encode(array("success" => true,
			"code"=> 200,
			"msg" => "success",
			"obj"=> $result1,
			"map"=> null,
			"list"=> null
			)
				);
	}

    

}

?>
