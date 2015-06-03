<?php
namespace Home\Model;
use Think\Model;
class SceneModel extends Model {

    public function addscene() {
		$m_scene=M('Scene');
		$m_scenepage=M('scenepage');
		$datas = $_POST;

		$datainfo['scenecode_varchar'] = (date('y',time())-9).date('m',time()).date('d',time()).randorderno(10,-1);
		$datainfo['scenename_varchar'] = $datas['name'];
		$datainfo['movietype_int'] = $datas['pageMode'];
		$datainfo['scenetype_int'] = intval($datas['type']);
		$datainfo['ip_varchar'] = get_client_ip();
		$datainfo['thumbnail_varchar'] = "default_thum.jpg";
		$datainfo['userid_int'] = session('userid');
		$datainfo['createtime_time'] = date('y-m-d H:i:s',time());
		
		$result1 = $m_scene->add($datainfo);
		//var_dump($result1);exit;
		if($result1){
			$datainfo2['scenecode_varchar'] = $datainfo['scenecode_varchar'];
			$datainfo2['sceneid_bigint'] = $result1;
			$datainfo2['content_text'] = "[]";
			$datainfo2['userid_int'] = session('userid');
			$result2 = $m_scenepage->add($datainfo2);
			echo json_encode(array("success" => true,
									"code"=> 200,
									"msg" => "success",
									"obj"=> $result1,
									"map"=> null,
									"list"=> null
								   )
							);
		}else{
			exit;
		}
    }


    public function addscenebysys() {
		$m_scene=M('Scene');
		$m_scenepage=M('scenepage');
		$datas = $_POST;
		

		$wheresysscene['userid_int']  = 0;
		$wheresysscene['sceneid_bigint']  = I('post.id',0);
		$_scene_sysinfo=$m_scene->where($wheresysscene)->select();


		$datainfo['scenecode_varchar'] = (date('y',time())-9).date('m',time()).date('d',time()).randorderno(10,-1);
		$datainfo['scenename_varchar'] = $datas['name'];
		$datainfo['movietype_int'] = $_scene_sysinfo[0]['movietype_int'];
		$datainfo['scenetype_int'] = intval($datas['type']);
		$datainfo['ip_varchar'] = get_client_ip();
		$datainfo['thumbnail_varchar'] = $_scene_sysinfo[0]['thumbnail_varchar'];
		$datainfo['musicurl_varchar'] = $_scene_sysinfo[0]['musicurl_varchar'];
		$datainfo['musictype_int'] = $_scene_sysinfo[0]['musictype_int'];
		$datainfo['fromsceneid_bigint'] = $wheresysscene['sceneid_bigint'];
		$datainfo['userid_int'] = session('userid');
		$datainfo['createtime_time'] = date('y-m-d H:i:s',time());
		
		$result1 = $m_scene->add($datainfo);

		if($result1){
			$m_scene->where($wheresysscene)->setInc('usecount_int');
			
			$wheresyspage['userid_int']  = 0;
			$wheresyspage['sceneid_bigint']  = I('post.id',0);
			$_scene_syspageinfo=$m_scenepage->where($wheresyspage)->select();
			foreach($_scene_syspageinfo as $vo){
				$datainfo2['scenecode_varchar'] = $datainfo['scenecode_varchar'];
				$datainfo2['sceneid_bigint'] = $result1;
				$datainfo2['content_text'] = $vo['content_text'];
				$datainfo2['pagecurrentnum_int'] = $vo['pagecurrentnum_int'];
				$datainfo2['userid_int'] = session('userid');
				$datainfo2['createtime_time'] = date('y-m-d H:i:s',time());
				$result2 = $m_scenepage->add($datainfo2);
			}
			echo json_encode(array("success" => true,
									"code"=> 200,
									"msg" => "success",
									"obj"=> $result1,
									"map"=> null,
									"list"=> null
								   )
							);
		}else{
			exit;
		}
    }

    public function savepage() {
		$m_scene=M('Scene');
		$m_scenepage=M('scenepage');
		$datas = json_decode(file_get_contents("php://input"),true);

		$where['pageid_bigint'] = $datas['id'];
		$where['sceneid_bigint'] = $datas['sceneId'];
		$datainfo['pagecurrentnum_int'] = intval($datas['num']);
		$datainfo['content_text'] = json_encode($datas['elements']);
		$where['userid_int'] = session('userid');
		$m_scenepage->data($datainfo)->where($where)->save();
		if($datas['scene']['image']['bgAudio']['url']!="")
		{
			$bgdatainfo['musicurl_varchar'] = $datas['scene']['image']['bgAudio']['url'];
			//var_dump($bgdatainfo['musicurl_varchar']);exit;
			$bgdatainfo['musictype_int'] = $datas['scene']['image']['bgAudio']['type'];
		}else{
			$bgdatainfo['musicurl_varchar'] = '';
		}
		$bgwhere['sceneid_bigint'] = $datas['sceneId'];
		$bgwhere['userid_int'] = session('userid');
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

    public function openscene($status) {
		$m_scene=M('Scene');
		$datas = json_decode(file_get_contents("php://input"),true);

		$where['sceneid_bigint'] = I('get.id',0);
		$datainfo['showstatus_int'] = $status;
		$where['userid_int'] = session('userid');
		$m_scene->data($datainfo)->where($where)->save();
		
		echo json_encode(array("success" => true,
								"code"=> 200,
								"msg" => "success",
								"obj"=> $result1,
								"map"=> null,
								"list"=> null
							   )
						);
    }


    public function usepage() {
		$m_scene=M('scenepagesys');
		$where['pageid_bigint'] = I('get.id',0);
		$m_scene->where($where)->setInc('usecount_int');
		
    }

    public function addpv() {
		$m_scene=M('Scene');
		$where['sceneid_bigint'] = I('get.id',0);
		$m_scene->where($where)->setInc('hitcount_int');
		
    }

    public function savesetting() {
		$m_scene=M('Scene');
		$datas = json_decode(file_get_contents("php://input"),true);

		$where['sceneid_bigint'] = $datas['id'];
		$datainfo['scenename_varchar'] = $datas['name'];
		$datainfo['scenetype_int'] = intval($datas['type']);
		$datainfo['movietype_int'] = intval($datas['pageMode']);
		$datainfo['thumbnail_varchar'] = $datas['image']['imgSrc'];
		$datainfo['desc_varchar'] = $datas['description'];
		$where['userid_int'] = session('userid');
		$m_scene->data($datainfo)->where($where)->save();
		
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


}

?>
