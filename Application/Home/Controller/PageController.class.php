<?php
/**
 * Created by e.wesambo.com
 * User: wesambo
 * Date: 2015-4-2
 *  
 */
namespace Home\Controller;
use Think\Controller;
class PageController extends Controller{
 
	public function _initialize(){
		 
		 if(intval(session("userid"))==0)
		{
			header('Content-type: text/json');
			header('HTTP/1.1 401 error');
			echo json_encode(array("success" => false,"code"=> 1001,"msg" => "请先登录!","obj"=> null,"map"=> null,"list"=> null));
			exit;
		} 
	}
	public function index(){
		exit('index');
	}
	public function savePageName(){
		if(I('post.id',0)&& I('post.name')){
			$where['pageid_bigint'] = I('post.id',0);
			
			$datainfo['pagename_varchar']= I('post.name');
			if((session('level_int')=='4'&& session('type')=='1')){	
				M('scenepagesys')->data($datainfo)->where($where)->save(); 

			}else{
				$where['sceneid_bigint'] = I('post.sceneId',0);
				$where['userid_int'] =intval(session("userid"));
				
				 M('scenepage')->data($datainfo)->where($where)->save();;

			}      
			$jsonstr = '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":null}';
		}else{
			$jsonstr = '{"success":false,"code":100,"msg":"操作失败","obj":null,"map":null,"list":null}';
			}
		echo $jsonstr;
	}
	public function crop(){
		
		$src=WWW_ROOT.'Uploads/'. I('post.src');
		 
		$ImageCut = new \Think\ImageCut($src,I('post.x'),I('post.y'),I('post.x2'),I('post.y2')); 
		
		$returnImg=$ImageCut->generate_shot();
		
		$returnImg=str_replace(WWW_ROOT.'Uploads/','',$returnImg);
		$jsonstr = '{"success":true,"code":200,"msg":"操作成功","obj":"'.$returnImg.'","map":null,"list":null}';	
		
			echo $jsonstr;
	}
	
	 
	public function pageSort(){
		 
 		if(I('get.id',0)){
			$where['pageid_bigint'] = I('get.id',0);
			
  			$where['userid_int'] =intval(session("userid"));
			
			$order=$datainfo['pagecurrentnum_int']= I('get.pos');
			//$re_bool= M('scenepage')->data($datainfo)->where($where)->save();
			 
 			$work_id=M('scenepage')->where($where)->getField('sceneid_bigint');
			 
 			 
			 $photoList=	M('scenepage')->field('pagecurrentnum_int,pageid_bigint')->where("sceneid_bigint='$work_id' AND userid_int={$where['userid_int']} ")->order('pagecurrentnum_int asc')->select();
			 
			foreach($photoList as $k=> $row){
				$sort=$k+1;
				M('scenepage')->where("pageid_bigint={$row[pageid_bigint]}")->save(array('pagecurrentnum_int'=>$sort)); 
				
				$photoList[$k]['pagecurrentnum_int']=$sort;
			}	
			 
			
			//pageid_bigint<>{$where['pageid_bigint']} AND  AND pagecurrentnum_int>='$order'
			$count=count($photoList);
			
			$is_find=false;
			for($i=0;$i<$count;$i++){
				$order_i=$i+1;		
				
				if($photoList[$i]['pageid_bigint']==$where['pageid_bigint']){
					$order_y=$i+1;						
				}
				
				
			}	 
			
			for($i=0;$i<$count;$i++){
				$sta=$order_y;
				$end=$order;
				$is_asc=true;
				if($order_y >$order){  
					$sta=$order;
					$end=$order_y;
					$is_asc=false;
				} 
				$order_i=$i+1;		
				
				if($is_asc){  // 
					if($order_i>$sta && $order_i<=$end){				
						$sort=$photoList[$i]['pagecurrentnum_int']-1;
						M('scenepage')->where("pageid_bigint={$photoList[$i][pageid_bigint]}")->save(array('pagecurrentnum_int'=>$sort)); 
					}					
				}else{ 
					if($order_i>=$sta && $order_i<$end){				
						$sort=$photoList[$i]['pagecurrentnum_int']+1;
						M('scenepage')->where("pageid_bigint={$photoList[$i][pageid_bigint]}")->save(array('pagecurrentnum_int'=>$sort)); 
						
						 
					}					
				}
				 
			}
			M('scenepage')->data($datainfo)->where($where)->save();
			
		 
			 
		}
		$jsonstr = '{"success":true,"code":200,"msg":"操作成功","obj":null,"map":null,"list":null}';
		echo $jsonstr;

	}
	public function getPageTpls(){
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

}