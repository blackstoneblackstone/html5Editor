<?php
namespace Adminc\Controller;
use Adminc\Controller\BaseController;
class CateController extends BaseController {
    public function index(){
		if(!defined('VIRIFY')){
			aboutaa();
		}
 
		$m = M('cate');      
		$type=I('get.filetype','bgType');
		$where=array('type'=>$type); 
		$count = $m->where($where)->count();
		$p = getpage($count,16);
		$list = $m->field(true)->where($where)->order('create_time desc')->limit($p->firstRow, $p->listRows)->select();
	 
		$this->assign('select', $list); 
		$this->assign('page', $p->show());  
		 $this->assign('type', $type);  
		
		$this->display();
    }
	public function del(){
		if(session('adminRole')==2  ){
			$this->error ( '您没有相关权限', U (  'user/index' ) );
		}
		$m = M('cate');      
		$m->where('userid_int='.$_REQUEST['id'])->delete();
		$this->success ( '操作成功', '/adminc.php?c=user');  // U ('user/index')
		
	}
	public function add(){
		$m = M('cate'); 
		
		if(IS_POST){
			$update_arr=I('post.user');
		 
			 
			$update_arr['create_time'] =time();
			
			$update_arr['type']= I('post.filetype');
			
			$new_id= $m->add($update_arr);
			
			$m->where('id='.$new_id)->save(array('value'=>$new_id));
			 
			$this->success ( '操作成功', '/adminc.php?c=cate&filetype='.$update_arr['type'] );  //U (  'cate/index' )

		}else{
			
			$this->assign('filetype_int', I('get.type')); 
			 
			$this->assign('user', array()); 
		
			$this->display('e');	
		}
	}
	public function e(){
		$m = M('cate'); 
		
		if(IS_POST){
			$where['id']=I('post.id');
			$update_arr=I('post.user');
			  
		 	 
			
			$m->where($where)->save($update_arr);
			
			  
			 
			$this->success ( '操作成功', '/adminc.php?c=cate&a=e&id='.I('post.id') );  //U (  'cate/index' )

		}else{
			$where['fileid_bigint']=I('get.id');
			$userinfo=	$m->where($where)->find();
			
			
			$this->assign('filetypelist', upfilesClass($userinfo['filetype_int'])); 
		 
			$this->assign('user', $userinfo); 
			$this->assign('filetype_int', $userinfo['filetype_int']); 
			
		
		 $this->display();
		}
	}
}