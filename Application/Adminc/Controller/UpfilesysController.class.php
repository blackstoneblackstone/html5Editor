<?php
namespace Adminc\Controller;
use Adminc\Controller\BaseController;
class UpfilesysController extends BaseController {
	public function index(){
		
		$_scene = M('upfilesys');
		$scenetype = intval(I('get.filetype',0));
	 
	    $where['filetype_int']  = $scenetype;
		 
		$filename_varchar = trim(I('post.filename_varchar')); 
		if($filename_varchar){
			$where['filename_varchar']  = array('like','%'.$filename_varchar.'%');
		
		}
		$order='fileid_bigint';
		if(I('post.order')){
			$order=I('post.order');
		}
	    
	
		$count = $_scene->where($where)->count();
	
		$p = getpage($count,10);
		$list=$_scene->where($where)->order($order.' desc')->limit($p->firstRow, $p->listRows)->select();
		
		// echo D('')->getLastSql();exit;
		//print_r($list);
   
	 
		$this->assign('select', $list); 
		$this->assign('page', $p->show());  
		$this->assign('filetype_int',$scenetype);  
		$this->assign('filename_varchar',$filename_varchar);  
  

		$this->assign('order',$order);  
  
		// var_export($list);
		//echo C('TEST_ADMIN_ID');
		 
		
		$this->display($display);
    }
	public function add(){
		$m = M('upfilesys'); 
		
		if(IS_POST){
			$update_arr=I('post.user');
		 
			$update_arr=$this->file_uploadsys($update_arr);
		 
			$update_arr['create_time'] = date('y-m-d H:i:s',time());
			
			$update_arr['filetype_int']= I('get.filetype',0);
			
			$m->add($update_arr);
			 
			$this->success ( '操作成功', '/adminc.php?c=upfilesys&filetype='.I('get.filetype',0) );  //U (  'upfilesys/index' )

		}else{
			
			$this->assign('filetype_int', I('get.filetype',0)); 
			$this->assign('filetypelist', upfilesClass(I('get.filetype',0))); 
		 
			$this->assign('user', array()); 
		
			$this->display('e');	
		}
	}
	
	public function e(){ 
		$m = M('upfilesys'); 
		
		if(IS_POST){
			$where['fileid_bigint']=I('post.id');
			$update_arr=I('post.user');
			  
			$update_arr=$this->file_uploadsys($update_arr);
			 
			
			$m->where($where)->save($update_arr);
			
			  
			 
			$this->success ( '操作成功', '/adminc.php?c=upfilesys&a=e&id='.I('post.id') );  //U (  'upfilesys/index' )

		}else{
			$where['fileid_bigint']=I('get.id');
			$userinfo=	$m->where($where)->find();
			
			$filetypelist=upfilesClass($userinfo['filetype_int']);
		 
			$this->assign('filetypelist', $filetypelist); 
		 
			$this->assign('user', $userinfo); 
			$this->assign('filetype_int', $userinfo['filetype_int']); 
			
		
		 $this->display();
		}
	}
	 
	function del(){
		if(session('adminRole')==2  ){
			$this->error ( '您没有相关权限',  '/adminc.php?c=upfilesys' );
		}
		$m = M('upfilesys');      
		$m->where('fileid_bigint='.$_REQUEST['id'])->delete();
		$filetype=I('get.filetype');
		 
		$this->success ( '操作成功', '/adminc.php?c=upfilesys&filetype='.$filetype );
		 
    }
	
	function file_uploadsys($update_arr=array()){
		
		if($_FILES['file']['error']!=0){
			return  $update_arr;	
		}
	 
		$upload = new \Think\Upload();// 实例化上传类
			$upload->maxSize = 3145728 ;// 设置附件上传大小
			if(I('post.fileType',0)==2)
			{
				$upload->exts = array('mp3');// 设置附件上传类型
			$upload->savePath = 'syspic/mp3/'.session("userid").'/'; // 设置附件上传（子）目录
			}
			else
			{
				$upload->exts = array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
			   $upload->savePath = 'syspic/pic/'.session("userid").'/'; // 设置附件上传（子）目录
			}
		$upload->rootPath = './Uploads/'; // 设置附件上传根目录
			$upload->subName  = array('date','Ym');
			// 采用时间戳命名
			$upload->saveName = 'uniqid';
			// 采用GUID序列命名
			//$upload->saveName = 'guid'; 
			// 上传文件
			$info = $upload->upload();
			if(!$info) {// 上传错误提示错误信息
			 
				echo $this->error($upload->getError());
				exit;
				//$this->error($upload->getError());
			}else{// 上传成功 获取上传文件信息
			 
				foreach($info as $file){
					$thubimagenew = $file['savepath'].$file['savename'];
				if(I('post.fileType',0)!=2)
					{
						$image = new \Think\Image(); 
						$thubimage = $file['savepath'].$file['savename'];
						$image->open($upload->rootPath.$thubimage);
						$thubimagenew = str_replace(".".$file['ext'],"_thumb.".$file['ext'],$file['savename']);
						$thubimagenewftp =$thubimagenew;
						$thubimagenew =  $file['savepath'].$thubimagenew;
						//echo $thubimagenew; exit;
						// 按照原图的比例生成一个最大为150*150的缩略图并保存为thumb.jpg
						if(I('get.fileType',0)==0)
						{
							$image->thumb(80, 126)->save($upload->rootPath.$thubimagenew);
						}
						else
						{
							$image->thumb(80, 80)->save($upload->rootPath.$thubimagenew);
						}
					}
					$sizeint = intval($file['size']/1024);
					//$jsonstr = '{"success":true,"code":200,"msg":"success","obj":{"id":9386090,"name":"'.$file['savename'].'","extName":"'.strtoupper($file['ext']).'","fileType":0,"bizType":0,"path":"'.$file['savepath'].$file['savename'].'","tmbPath":"'.$thubimagenew.'","createTime":1426209412922,"createUser":"'.session("userid").'","sort":0,"size":'.$sizeint.',"status":1},"map":null,"list":null}';
					

					
				 
					// 取得成功上传的文件信息
					// 保存当前数据对象

					$update_arr['ext_varchar'] = strtoupper($file['ext']);
				//	$data['filename_varchar'] = $file['name'];
				//	$data['filetype_int'] = I('post.fileType',0);
				//	$update_arr['biztype_int'] = I('post.bizType',0);
					$update_arr['userid_int'] = 0;
					$update_arr['filesrc_varchar'] = $file['savepath'].$file['savename'];
					$update_arr['sizekb_int'] = $sizeint;
					if(I('post.fileType',0)!=2){
						$update_arr['filethumbsrc_varchar'] = $thubimagenew;
					}
					 
				}
			}
		return $update_arr;
			
	}
}