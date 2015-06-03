<?php
namespace Adminc\Controller;
use Adminc\Controller\BaseController;
class SceneController extends BaseController {
	public function index(){
		
		$_scene = M('scene');
		
		
		if(isset($_POST['delete_int'])){
			
			$where['delete_int']  = intval($_POST['delete_int']);
			$this->assign('delete_int',$where['delete_int']);  
		}
		 
		
		$filename_varchar = trim(I('post.scenename_varchar')); 
		if($filename_varchar){
			$where['scenename_varchar']  = array('like','%'.$filename_varchar.'%');
			
		}
		$user_id = intval(I('post.user_id')); 
		if($user_id){
			$where['userid_int']  = $user_id;
			
		}else{
			if(I('get.flag')=='useranli'){
				$where['userid_int']  = array('gt',0);
				 
			}else{
				//$where['is_tpl']  = 1;
				$where['userid_int']  = 0;  
			}
		}
		
		
		$order='sceneid_bigint';
		if(I('post.order')){
			$order=I('post.order');
		}
	    
	
		$count = $_scene->where($where)->count();
		$p = getpage($count,10);
		$list=$_scene->where($where)->order($order.' desc')->limit($p->firstRow, $p->listRows)->select();
	 
		$userlist=M('users')->where("status_int=1")->order('userid_int desc')->select();
		$this->assign('userlist',$userlist);  
		
		
		$this->assign('filename_varchar',$filename_varchar);  
		
		$this->assign('IS_OPEN_STATIC', C('IS_OPEN_STATIC')?1:0); 
		$this->assign('select', $list); 
		$this->assign('page', $p->show());  
		 $this->assign('flag',I('get.flag','sys'));  
				$this->assign('order',$order);  
				$this->assign('user_id',$user_id);  
		

		// var_export($list);
		//echo C('TEST_ADMIN_ID');
		 
		
		$this->display($display);
    }
	public function e(){
		$m = M('scene'); 
		
		if(IS_POST){
			$where['sceneid_bigint']=I('post.id');
			$update_arr=I('post.user');
			 
			 
			$m->where($where)->save($update_arr);
 			 
			 $return=I('post.userid_int') >0? '&flag=useranli':'';
			$this->success ( '操作成功', '/adminc.php?c=scene' );//U (  'scene/index' )

		}else{
			$list=M('cate')->where("type='scene_type'")->order('sort asc,id asc')->select();
			
			
			
			
			
			
			$where['sceneid_bigint']=I('get.id');
			$userinfo=	$m->where($where)->find();
			
			$biztypeId=$userinfo['scenetype_int']?intval($userinfo['scenetype_int']):$list[0]['value'];
			
			
			
			$slist=M('tag')->where("type_int=2 and biztype_int=".$biztypeId)->order('tagid_int asc')->select();
				 
			$this->assign('scene_type_list', $list); 
			$this->assign('scene_type_list2', $slist); 
			
		 
			$this->assign('user', $userinfo); 
			
		
		 $this->display();
		}
	}
	public function shenhe(){
		$m = M('scene'); 
		$where['sceneid_bigint']=I('get.id');
		$update_arr['shenhe']= I('get.no')? 0: 1;
		
		$m->where($where)->save($update_arr);
		 
		
		$this->success ( '操作成功', '/adminc.php?c=scene&flag=useranli' ); 
	}
	public function hideeqad(){
		$m = M('scene'); 
		$where['sceneid_bigint']=I('get.id');
		$update_arr['hideeqad']= I('get.no')? 1: 0;
		
		$m->where($where)->save($update_arr);
		
		
	 
		
		 $this->success ( '操作成功', '/adminc.php?c=scene&flag=useranli' ); 
	}
	public function getSceneTag(){
		$res=array('status'=>0,"info"=>'');
		$biztypeId=intval(I('get.biztypeId'));
		$slist=M('tag')->where("type_int=2 and biztype_int=".$biztypeId)->order('tagid_int asc')->select();
		$res['sql']=D()->getlastsql();
		$option='';
		foreach($slist as $v){
			$option.='<option value="'.$v['tagid_int'].'">'.$v['name_varchar'].'</option>';
		}	
		$res['status']=1;
		$res['info']=$option;
		
		echo json_encode($res);	
    }
	
	public function is_public(){
		$m = M('scene'); 
		$where['sceneid_bigint']=I('get.id');
		$update_arr['showstatus_int']= I('get.no')? 2: 1;
		
		$m->where($where)->save($update_arr);
		
		
		$this->success ( '操作成功', '/adminc.php?c=scene&flag=useranli' ); 
	}
	
	function copytos(){
		$m_scene=M('Scene');
		$m_scenepage=M('scenepage');
		$m_scenedata=M('scenedata');
		

		//$wheresysscene['userid_int']  = session('userid');
		$wheresysscene['sceneid_bigint']  = I('get.id',0);
		$_scene_sysinfo=$m_scene->where($wheresysscene)->select();


		$datainfo['scenecode_varchar'] = 'U'.(date('y',time())-9).date('m',time()).date('d',time()).randorderno(10,-1);
		$datainfo['scenename_varchar'] = '副本-'.$_scene_sysinfo[0]['scenename_varchar'];
		$datainfo['movietype_int'] = $_scene_sysinfo[0]['movietype_int'];
		$datainfo['scenetype_int'] = $_scene_sysinfo[0]['scenetype_int'];
		$datainfo['ip_varchar'] = get_client_ip();
		$datainfo['thumbnail_varchar'] = $_scene_sysinfo[0]['thumbnail_varchar'];
		$datainfo['musicurl_varchar'] = $_scene_sysinfo[0]['musicurl_varchar'];
		$datainfo['musictype_int'] = $_scene_sysinfo[0]['musictype_int'];
		$datainfo['fromsceneid_bigint'] = $wheresysscene['sceneid_bigint'];
		$datainfo['userid_int'] = 0;
		$datainfo['createtime_time'] = date('y-m-d H:i:s',time());
		
		$result1 = $m_scene->add($datainfo);
		if($result1){
			$m_scene->where($wheresysscene)->setInc('usecount_int');
			
			 
			$wheresyspage['sceneid_bigint']  = I('get.id',0);
			$_scene_syspageinfo=$m_scenepage->where($wheresyspage)->select();
			foreach($_scene_syspageinfo as $vo){
				$datainfo2['scenecode_varchar'] = $datainfo['scenecode_varchar'];
				$datainfo2['sceneid_bigint'] = $result1;
				$datainfo2['content_text'] = $vo['content_text'];
				$datainfo2['properties_text'] = 'null';
				$datainfo2['pagecurrentnum_int'] = $vo['pagecurrentnum_int'];
				$datainfo2['userid_int'] =0;
				$datainfo2['createtime_time'] = date('y-m-d H:i:s',time());
				$result2 = $m_scenepage->add($datainfo2);


				//$wheredata['userid_int'] = session('userid');
				$wheredata['sceneid_bigint'] = $vo['sceneid_bigint'];
				$wheredata['pageid_bigint'] = $vo['pageid_bigint'];
				$_scenedatasys_list = $m_scenedata->where($wheredata)->select();

				foreach($_scenedatasys_list as $vo2){
					$dataList[] = array('sceneid_bigint'=>$result1,
						'pageid_bigint'=>$result2,
						'elementid_int'=>$vo2['elementid_int'],
						'elementtitle_varchar'=>$vo2['elementtitle_varchar'],
						'elementtype_int'=>$vo2['elementtype_int'],
						'userid_int'=>0
						);
				}

			}
			if(count($dataList)>0){
				$m_scenedata->addAll($dataList);
			}
			$this->success ( '操作成功',  '/adminc.php?c=scene' );
		}else{
			$this->error('出错啦','?c=scene');
		}
	}
	function del(){
		if(session('adminRole')==2  ){
			$this->error ( '您没有相关权限',  '/adminc.php?c=scene' );
		}
		$m = M('scene');      
		$m->where('sceneid_bigint='.$_REQUEST['id'])->delete();
		 if(I('get.flag')=='useranli'){
			 $this->success ( '操作成功', '/adminc.php?c=scene&flag=useranli' );
		 }else{
		  $this->success ( '操作成功',  '/adminc.php?c=scene' );
		 }
    }
}